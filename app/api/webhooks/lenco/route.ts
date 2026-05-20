import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'
import { sendAdminPaymentNotification } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.LENCO_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = req.headers.get('x-lenco-signature') ?? req.headers.get('x-signature') ?? ''
      const expected = createHmac('sha256', webhookSecret).update(rawBody).digest('hex')
      if (signature !== expected) {
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
