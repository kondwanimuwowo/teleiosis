import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabaseAdmin.from('blog_posts').select('*').order('published_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
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

    const { error } = await supabaseAdmin.from('blog_posts').insert({
      title:          formData.get('title'),
      slug:           formData.get('slug'),
      category:       formData.get('category'),
      read_time:      formData.get('read_time'),
      excerpt:        formData.get('excerpt'),
      scripture:      formData.get('scripture'),
      scripture_text: formData.get('scripture_text'),
      body:           JSON.parse(formData.get('body') as string || '[]'),
      image_url:      imageUrl,
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Blog creation error:', err)
    return NextResponse.json({ error: err.message || 'Creation failed' }, { status: 500 })
  }
}
