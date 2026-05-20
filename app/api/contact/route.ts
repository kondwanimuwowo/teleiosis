import { NextRequest, NextResponse } from 'next/server'
import { sendContactConfirmation, sendAdminContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const subjectLabel = subject || 'General Inquiry'

    await Promise.all([
      sendContactConfirmation({ to: email, name, subject: subjectLabel, message }),
      sendAdminContactNotification({ name, email, subject: subjectLabel, message }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
