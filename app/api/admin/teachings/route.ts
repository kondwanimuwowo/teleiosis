import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audioUrl = formData.get('audio_url')
    
    if (!audioUrl) return NextResponse.json({ error: 'No audio URL provided' }, { status: 400 })

    const { error } = await supabaseAdmin.from('teachings').insert({
      title:                  formData.get('title'),
      speaker:                formData.get('speaker') || 'Rhema Nyambe',
      description:            formData.get('description'),
      category_id:            formData.get('category_id'),
      duration_minutes:       formData.get('duration_minutes') ? parseInt(formData.get('duration_minutes') as string) : null,
      price:                  formData.get('price') ? parseFloat(formData.get('price') as string) : null,
      series_id:              formData.get('series_id') || null,
      order_in_series:        formData.get('order_in_series') ? parseInt(formData.get('order_in_series') as string) : null,
      included_in_membership: formData.get('included_in_membership') === 'true',
      audio_url:              audioUrl as string,
      published_date:         new Date().toISOString(),
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true, url: audioUrl })
  } catch (err: any) {
    console.error('Teaching upload error:', err)
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
