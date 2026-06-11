import { NextRequest, NextResponse } from 'next/server'
import { sendContactConfirmation, sendAdminContactNotification } from '@/lib/email'
import { createSupabaseAdminClient } from '@/lib/supabase-server'

const MIN_FILL_MS = 3000

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, _hp, _t } = await req.json()

    // Silently accept bots — honeypot filled or form submitted too quickly
    if (_hp || !_t || Date.now() - _t < MIN_FILL_MS) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const subjectLabel = subject || 'General Inquiry'
    const supabase = createSupabaseAdminClient()

    await Promise.all([
      sendContactConfirmation({ to: email, name, subject: subjectLabel, message }),
      sendAdminContactNotification({ name, email, subject: subjectLabel, message }),
      supabase.from('contact_messages').insert({ name, email, subject: subjectLabel, message }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
