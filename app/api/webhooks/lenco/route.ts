import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const event = body?.event
    const data = body?.data

    if (event !== 'collection.successful' || !data?.reference) {
      return NextResponse.json({ received: true })
    }

    await supabase
      .from('payments')
      .update({ status: 'verified', lenco_data: data })
      .eq('reference', data.reference)

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Lenco webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
