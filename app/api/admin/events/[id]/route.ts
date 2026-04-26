import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin.from('events').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File | null
    let bannerUrl = formData.get('banner_url') as string | null

    if (image && image.size > 0) {
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

      bannerUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`
    }

    const intervalDays = formData.get('recurrence_interval_days')

    const updateData: any = {
      title:                    formData.get('title'),
      date:                     formData.get('date'),
      time_start:               formData.get('time_start'),
      time_end:                 formData.get('time_end'),
      location:                 formData.get('location'),
      speaker:                  formData.get('speaker'),
      type:                     formData.get('type'),
      description:              formData.get('description'),
      is_recurring:             formData.get('is_recurring') === 'true',
      recurring_label:          formData.get('recurring_label'),
      recurrence_frequency:     formData.get('recurrence_frequency') || null,
      recurrence_interval_days: intervalDays ? parseInt(intervalDays as string) : null,
      recurrence_day_of_week:   formData.get('recurrence_day_of_week') || null,
      banner_url:               bannerUrl,
    }

    const { error } = await supabaseAdmin
      .from('events')
      .update(updateData)
      .eq('id', params.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabaseAdmin.from('events').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
