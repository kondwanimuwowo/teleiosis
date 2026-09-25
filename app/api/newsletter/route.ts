import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterWelcome, sendAdminNewsletterNotification } from '@/lib/email'
import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { validateEmail } from '@/lib/validation'
import { HP_FIELD, TS_FIELD, looksAutomated, getClientIp } from '@/lib/anti-spam'
import { rateLimitIpAndEmail, consumeQuota } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { checkAddressShape, isDisposableEmail } from '@/lib/email-normalize'

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const { email, turnstileToken } = raw

    // Silently accept bots — honeypot filled or form submitted too quickly.
    if (looksAutomated({ [HP_FIELD]: raw[HP_FIELD], [TS_FIELD]: raw[TS_FIELD] })) {
      return NextResponse.json({ success: true })
    }

    const ip = getClientIp(req)
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 400 })
    }

    const emailErr = validateEmail(email ?? '')
    if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 })

    const normalizedEmail = email.trim().toLowerCase()

    const shapeErr = checkAddressShape(normalizedEmail)
    if (shapeErr) return NextResponse.json({ error: shapeErr }, { status: 400 })

    if (isDisposableEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please use a permanent email address.' }, { status: 400 })
    }

    const limited = await rateLimitIpAndEmail('newsletter', ip, normalizedEmail, {
      ipLimit: 3, emailLimit: 1, windowSeconds: 24 * 60 * 60,
    })
    if (!limited.ok) return NextResponse.json({ error: limited.error }, { status: 429 })

    const supabase = createSupabaseAdminClient()

    // Re-posting an address that is already subscribed is a common bot
    // pattern (and a harmless real-user retry) — neither should re-email a
    // welcome message or re-notify the admin every time.
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ success: true })
    }

    if (!(await consumeQuota('newsletter', Number(process.env.NEWSLETTER_DAILY_EMAIL_CAP ?? 30)))) {
      // Cap reached: still record the subscriber, just skip the emails.
      await supabase.from('newsletter_subscribers').upsert({ email: normalizedEmail }, { onConflict: 'email' })
      return NextResponse.json({ success: true })
    }

    await Promise.all([
      sendNewsletterWelcome({ email: normalizedEmail }),
      sendAdminNewsletterNotification({ email: normalizedEmail }),
      supabase.from('newsletter_subscribers').upsert({ email: normalizedEmail }, { onConflict: 'email' }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
