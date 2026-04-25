import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

    return NextResponse.json({ success: true, status, reference })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
