import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'
import { sendAdminPaymentNotification } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function verifyLencoSignature(rawBody: string, req: NextRequest, secret: string): boolean {
  // Lenco V2 sends the webhook secret as a plain token in x-lenco-signature
  // (not HMAC — the secret itself is the value)
  const tokenHeader =
    req.headers.get('x-lenco-signature') ??
    req.headers.get('x-signature') ??
    req.headers.get('x-webhook-secret') ??
    req.headers.get('lenco-signature') ??
    ''

  // Plain token comparison (Lenco V2 default)
  if (tokenHeader === secret) return true

  // Fallback: HMAC-SHA256 in case Lenco switches to signed payloads
  const hmacHex = createHmac('sha256', secret).update(rawBody).digest('hex')
  if (tokenHeader === hmacHex) return true

  // Some providers prefix with algorithm, e.g. "sha256=<hex>"
  if (tokenHeader === `sha256=${hmacHex}`) return true

  // Debug: log what was actually received so the mismatch is visible in Vercel logs
  console.error('Lenco signature mismatch. Received header:', tokenHeader || '(none)')
  console.error('Expected plain token or HMAC. Check LENCO_WEBHOOK_SECRET in Vercel env vars.')

  return false
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    const webhookSecret = process.env.LENCO_WEBHOOK_SECRET
    if (webhookSecret) {
      if (!verifyLencoSignature(rawBody, req, webhookSecret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const event = body?.event
    const data = body?.data

    if (event !== 'collection.successful' || !data?.reference) {
      return NextResponse.json({ received: true })
    }

    const { data: existing } = await supabase
      .from('payments')
      .select('*')
      .eq('reference', data.reference)
      .single()

    await supabase
      .from('payments')
      .update({ status: 'verified', lenco_data: data })
      .eq('reference', data.reference)

    // Only fire admin email if the verify route hasn't already sent it
    if (existing && existing.status !== 'verified') {
      sendAdminPaymentNotification({
        name: existing.name || 'Unknown',
        email: existing.email,
        amount: existing.amount,
        reference: data.reference,
        type: existing.type,
        message: existing.message,
      }).catch((err) => console.error('Webhook email error:', err))
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Lenco webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
