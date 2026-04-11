import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function POST(request: Request) {
  try {
    const { fileName, contentType } = await request.json()
    console.log('Presign: Request for', fileName, contentType)
    
    const timestamp = Date.now()
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '-')
    const key = `teachings/${timestamp}-${safeName}`

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
      Key: key,
      ContentType: contentType,
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })
    const publicUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`

    console.log('Presign: Success for', key)
    return NextResponse.json({ signedUrl, publicUrl, key })
  } catch (err: any) {
    console.error('Presign error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
