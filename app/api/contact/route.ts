import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { sendContactConfirmation, sendAdminContactNotification } from '@/lib/email'
import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { validateName, validateEmail } from '@/lib/validation'
import { HP_FIELD, TS_FIELD, looksAutomated, getClientIp } from '@/lib/anti-spam'
import { rateLimitIpAndEmail, consumeQuota, isDuplicate } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { checkAddressShape, isDisposableEmail } from '@/lib/email-normalize'
import { spamScore, SPAM_THRESHOLD } from '@/lib/spam-heuristics'

// Mirrors the SUBJECTS list in ContactForm.tsx. An enum keeps attacker
// controlled text out of the outbound admin email's subject line.
const SUBJECTS = new Set([
  'General Inquiry',
  'Programs & Training',
  'Events & Conferences',
  'Audio Library',
  'Partnerships & Giving',
])

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const { name, email, subject, message, turnstileToken } = raw

    // Silently accept bots — honeypot filled or form submitted too quickly.
    if (looksAutomated({ [HP_FIELD]: raw[HP_FIELD], [TS_FIELD]: raw[TS_FIELD] })) {
      return NextResponse.json({ success: true })
    }

    const ip = getClientIp(req)
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 400 })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const nameErr = validateName(name)
    if (nameErr) return NextResponse.json({ error: nameErr }, { status: 400 })

    const emailErr = validateEmail(email)
    if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 })

    const trimmedMessage = String(message).trim()
    if (trimmedMessage.length < 5) {
      return NextResponse.json({ error: 'Please write a longer message.' }, { status: 400 })
    }
    if (trimmedMessage.length > 2000) {
      return NextResponse.json({ error: 'Message is too long (2000 characters max).' }, { status: 400 })
    }

    const subjectLabel = subject && SUBJECTS.has(subject) ? subject : 'General Inquiry'
    const normalizedEmail = email.trim().toLowerCase()

    const shapeErr = checkAddressShape(normalizedEmail)
    if (shapeErr) return NextResponse.json({ error: shapeErr }, { status: 400 })

    const limited = await rateLimitIpAndEmail('contact', ip, normalizedEmail, {
      ipLimit: 3, emailLimit: 2, windowSeconds: 60 * 60,
    })
    if (!limited.ok) return NextResponse.json({ error: limited.error }, { status: 429 })

    if (isDisposableEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please use a permanent email address so we can reply.' }, { status: 400 })
    }

    // Report success on a spam hit so bots can't tune against the response.
    if (spamScore({ message: trimmedMessage, name }) >= SPAM_THRESHOLD) {
      console.warn('[contact] spam blocked:', normalizedEmail, ip)
      return NextResponse.json({ success: true })
    }

    const fingerprint = createHash('sha256').update(`${normalizedEmail}|${trimmedMessage}`).digest('hex').slice(0, 32)
    if (await isDuplicate('contact', fingerprint, 15 * 60)) {
      return NextResponse.json({ success: true })
    }

    if (!(await consumeQuota('contact', Number(process.env.CONTACT_DAILY_EMAIL_CAP ?? 50)))) {
      return NextResponse.json(
        { error: "We're experiencing high volume. Please email us directly instead." },
        { status: 503 }
      )
    }

    const supabase = createSupabaseAdminClient()

    await Promise.all([
      sendContactConfirmation({ to: normalizedEmail, name, subject: subjectLabel, message: trimmedMessage }),
      sendAdminContactNotification({ name, email: normalizedEmail, subject: subjectLabel, message: trimmedMessage }),
      supabase.from('contact_messages').insert({ name, email: normalizedEmail, subject: subjectLabel, message: trimmedMessage }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
