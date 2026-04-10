import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabaseAdmin.from('events').select('*').order('date', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data })
}

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File | null
    let imageUrl = null

    if (image) {
      const timestamp = Date.now()
      const safeName = image.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
      const key = `events/${timestamp}-${safeName}`

      const buffer = await image.arrayBuffer()
      await s3.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
        Key: key,
        Body: new Uint8Array(buffer),
        ContentType: image.type || 'image/jpeg',
      }))

      imageUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`
    }

    const { error } = await supabaseAdmin.from('events').insert({
      title:           formData.get('title'),
      date:            formData.get('date'),
      time_start:      formData.get('time_start'),
      time_end:        formData.get('time_end'),
      location:        formData.get('location'),
      speaker:         formData.get('speaker'),
      type:            formData.get('type') || 'In Person',
      description:     formData.get('description'),
      is_recurring:    formData.get('is_recurring') === 'true',
      recurring_label: formData.get('recurring_label'),
      image_url:       imageUrl,
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Event creation error:', err)
    return NextResponse.json({ error: err.message || 'Creation failed' }, { status: 500 })
  }
}
