import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  sendPaymentConfirmation,
  sendAdminPaymentNotification,
  sendEventRegistrationConfirmation,
  sendStorePurchaseConfirmation,
  sendPaymentPendingEmail,
} from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const LENCO_API = process.env.NEXT_PUBLIC_LENCO_SANDBOX === 'true'
  ? 'https://sandbox.lenco.co/access/v2'
  : 'https://api.lenco.co/access/v2'

export async function POST(req: NextRequest) {
  try {
    const { reference, type, eventId, productId, name, email, amount, message } = await req.json()

    if (!reference || !type || !email || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify with Lenco
    const lencoRes = await fetch(`${LENCO_API}/collections/status/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.LENCO_SECRET_KEY}` },
    })

    if (!lencoRes.ok) {
      return NextResponse.json({ error: 'Failed to verify payment' }, { status: 502 })
    }

    const lencoData = await lencoRes.json()
    const status = lencoData?.data?.status === 'successful' ? 'verified' : 'pending'

    // Upsert payment record
    const { error } = await supabase.from('payments').upsert({
      reference,
      email,
      name: name || null,
      amount,
      currency: 'ZMW',
      type,
      event_id: eventId || null,
      product_id: productId || null,
      message: message || null,
      status,
      lenco_data: lencoData?.data ?? null,
    }, { onConflict: 'reference' })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 })
    }

    // Fetch full event or product details for richer emails
    let eventData: any = null
    let productData: any = null
    if (eventId) {
      const { data } = await supabase
        .from('events')
        .select('id, title, date, time_start, time_end, location, speaker, type')
        .eq('id', eventId)
        .single()
      eventData = data
    }
    if (productId) {
      const { data } = await supabase.from('products').select('name').eq('id', productId).single()
      productData = data
    }

    // Send emails non-blocking — don't let email failure block the payment response
    if (status === 'pending' && email) {
      sendPaymentPendingEmail({ to: email, name: name || email, amount, reference, type })
        .catch((err) => console.error('Pending email error:', err))
    }

    if (status === 'verified' && email) {
      const userEmail = name || email
      const adminPromise = sendAdminPaymentNotification({
        name: name || 'Unknown', email, amount, reference, type,
        eventTitle: eventData?.title, productTitle: productData?.name, message,
      })

      let userPromise: Promise<any>
      if (type === 'event' && eventData) {
        userPromise = sendEventRegistrationConfirmation({ to: email, name: userEmail, amount, reference, event: eventData })
      } else if (type === 'store' && productData) {
        userPromise = sendStorePurchaseConfirmation({ to: email, name: userEmail, amount, reference, productName: productData.name })
      } else {
        userPromise = sendPaymentConfirmation({ to: email, name: userEmail, amount, reference, type, message })
      }

      Promise.all([userPromise, adminPromise]).catch((err) => console.error('Email send error:', err))
    }

    return NextResponse.json({ success: true, status, reference })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
