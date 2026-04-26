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
  const { data, error } = await supabaseAdmin
    .from('teaching_series')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File | null
    let thumbnailUrl = formData.get('thumbnail_url') as string | null

    if (image && image.size > 0) {
      const timestamp = Date.now()
      const safeName = image.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
      const key = `series/${timestamp}-${safeName}`

      const buffer = await image.arrayBuffer()
      await s3.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
        Key: key,
        Body: new Uint8Array(buffer),
        ContentType: image.type || 'image/jpeg',
      }))

      thumbnailUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`
    }

    const programGroupId = formData.get('program_group_id') as string | null

    const { error } = await supabaseAdmin
      .from('teaching_series')
      .update({
        title: formData.get('title'),
        description: formData.get('description'),
        thumbnail_url: thumbnailUrl,
        program_group_id: programGroupId || null,
      })
      .eq('id', params.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabaseAdmin.from('teaching_series').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
