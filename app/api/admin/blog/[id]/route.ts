import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
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
    let imageUrl = formData.get('image_url') as string | null

    if (image && image.size > 0) {
      const timestamp = Date.now()
      const safeName = image.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
      const key = `blog/${timestamp}-${safeName}`

      const buffer = await image.arrayBuffer()
      await s3.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
        Key: key,
        Body: new Uint8Array(buffer),
        ContentType: image.type || 'image/jpeg',
      }))

      imageUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`
    }

    const updateData: any = {
      title:          formData.get('title'),
      slug:           formData.get('slug'),
      category:       formData.get('category'),
      read_time:      formData.get('read_time'),
      excerpt:        formData.get('excerpt'),
      scripture:      formData.get('scripture'),
      scripture_text: formData.get('scripture_text'),
      body:           JSON.parse(formData.get('body') as string || '[]'),
      image_url:      imageUrl,
    }

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', params.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .delete()
    .eq('id', params.id)
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
