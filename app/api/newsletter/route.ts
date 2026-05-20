import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterWelcome, sendAdminNewsletterNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    await Promise.all([
      sendNewsletterWelcome({ email }),
      sendAdminNewsletterNotification({ email }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
