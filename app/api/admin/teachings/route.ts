import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

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
    const audio = formData.get('audio') as File | null
    if (!audio) return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })

    const timestamp = Date.now()
    const safeName = audio.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
    const key = `teachings/${timestamp}-${safeName}`

    const buffer = await audio.arrayBuffer()
    await s3.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: audio.type || 'audio/mpeg',
    }))

    const audioUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`

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
      audio_url:              audioUrl,
      published_date:         new Date().toISOString(),
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true, url: audioUrl })
  } catch (err: any) {
    console.error('Teaching upload error:', err)
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
