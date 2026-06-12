import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  sendEventRegistrationConfirmation,
  sendGeneralRegistrationConfirmation,
  sendAdminRegistrationNotification,
  type EventDetails,
} from '@/lib/email'
import { validateName, validatePhone } from '@/lib/validation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, eventId, type, notes } = await req.json()

    if (!name?.trim() || !email?.trim() || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const nameErr  = validateName(name)
    const phoneErr = validatePhone(phone ?? '')
    if (nameErr)  return NextResponse.json({ error: nameErr }, { status: 400 })
    if (phoneErr) return NextResponse.json({ error: phoneErr }, { status: 400 })

    const { error } = await supabase.from('registrations').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      event_id: eventId || null,
      type,
      notes: notes?.trim() || null,
    })

    if (error) {
      console.error('Registration insert error:', error)
      return NextResponse.json({ error: 'Failed to save registration' }, { status: 500 })
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
        sendEventRegistrationConfirmation({ to: email, name, amount: 0, reference: '', event: eventData })
          .catch((e) => console.error('Event reg email error:', e))
      )
    } else {
      emailPromises.push(
        sendGeneralRegistrationConfirmation({ to: email, name })
          .catch((e) => console.error('General reg email error:', e))
      )
    }

    emailPromises.push(
      sendAdminRegistrationNotification({
        name, email, phone: phone?.trim() || undefined,
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
