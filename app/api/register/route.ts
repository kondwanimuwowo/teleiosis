import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  sendEventRegistrationConfirmation,
  sendGeneralRegistrationConfirmation,
  sendAdminRegistrationNotification,
  type EventDetails,
} from '@/lib/email'
import { validateName, validatePhone, validateEmail } from '@/lib/validation'
import { HP_FIELD, TS_FIELD, looksAutomated, getClientIp } from '@/lib/anti-spam'
import { rateLimitIpAndEmail, consumeQuota, isDuplicate } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { checkAddressShape, isDisposableEmail } from '@/lib/email-normalize'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const REGISTRATION_TYPES = new Set(['event', 'general'])

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const { name, email, phone, eventId, type, notes, turnstileToken } = raw

    // Neither registration form had a honeypot/timing guard before this —
    // silently accept bots, matching the convention on contact/newsletter.
    if (looksAutomated({ [HP_FIELD]: raw[HP_FIELD], [TS_FIELD]: raw[TS_FIELD] })) {
      return NextResponse.json({ success: true })
    }

    const ip = getClientIp(req)
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 400 })
    }

    if (!name?.trim() || !email?.trim() || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!REGISTRATION_TYPES.has(type)) {
      return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 })
    }

    const nameErr  = validateName(name)
    const phoneErr = validatePhone(phone ?? '')
    const emailErr = validateEmail(email)
    if (nameErr)  return NextResponse.json({ error: nameErr }, { status: 400 })
    if (phoneErr) return NextResponse.json({ error: phoneErr }, { status: 400 })
    if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 })

    const normalizedEmail = email.trim().toLowerCase()
    const trimmedNotes = typeof notes === 'string' ? notes.trim().slice(0, 500) : null

    const shapeErr = checkAddressShape(normalizedEmail)
    if (shapeErr) return NextResponse.json({ error: shapeErr }, { status: 400 })

    const limited = await rateLimitIpAndEmail('register', ip, normalizedEmail, {
      ipLimit: 5, emailLimit: 3, windowSeconds: 60 * 60,
    })
    if (!limited.ok) return NextResponse.json({ error: limited.error }, { status: 429 })

    if (isDisposableEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please use a permanent email address so we can confirm your spot.' }, { status: 400 })
    }

    // Same person registering for the same thing twice within the window is
    // a duplicate submit (double-click, retry), not a new registration.
    const fingerprint = `${normalizedEmail}|${type}|${eventId || 'general'}`
    if (await isDuplicate('register', fingerprint, 10 * 60)) {
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase.from('registrations').insert({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || null,
      event_id: eventId || null,
      type,
      notes: trimmedNotes,
    })

    if (error) {
      console.error('Registration insert error:', error)
      return NextResponse.json({ error: 'Failed to save registration' }, { status: 500 })
    }

    if (!(await consumeQuota('register', Number(process.env.REGISTER_DAILY_EMAIL_CAP ?? 100)))) {
      // Registration is saved either way — only the confirmation emails are capped.
      console.warn('[register] daily email cap reached — confirmation suppressed for', normalizedEmail)
      return NextResponse.json({ success: true })
    }

    // Fetch event details for confirmation email
    let eventData: EventDetails | null = null
    if (eventId) {
      const { data } = await supabase
        .from('events')
        .select('id, title, date, time_start, time_end, location, speaker, type')
        .eq('id', eventId)
        .single()
      eventData = data
    }

    // Send emails non-blocking
    const emailPromises: Promise<any>[] = []
    if (type === 'event' && eventData) {
      emailPromises.push(
        sendEventRegistrationConfirmation({ to: normalizedEmail, name, amount: 0, reference: '', event: eventData })
          .catch((e) => console.error('Event reg email error:', e))
      )
    } else {
      emailPromises.push(
        sendGeneralRegistrationConfirmation({ to: normalizedEmail, name })
          .catch((e) => console.error('General reg email error:', e))
      )
    }

    emailPromises.push(
      sendAdminRegistrationNotification({
        name, email: normalizedEmail, phone: phone?.trim() || undefined,
        type, eventTitle: eventData?.title,
      }).catch((e) => console.error('Admin reg email error:', e))
    )

    Promise.all(emailPromises)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
