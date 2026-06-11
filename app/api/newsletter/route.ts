import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterWelcome, sendAdminNewsletterNotification } from '@/lib/email'
import { createSupabaseAdminClient } from '@/lib/supabase-server'

const MIN_FILL_MS = 3000

export async function POST(req: NextRequest) {
  try {
    const { email, _hp, _t } = await req.json()

    // Silently accept bots — honeypot filled or form submitted too quickly
    if (_hp || !_t || Date.now() - _t < MIN_FILL_MS) {
      return NextResponse.json({ success: true })
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    const supabase = createSupabaseAdminClient()
    await Promise.all([
      sendNewsletterWelcome({ email }),
      sendAdminNewsletterNotification({ email }),
      supabase.from('newsletter_subscribers').upsert({ email }, { onConflict: 'email' }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
