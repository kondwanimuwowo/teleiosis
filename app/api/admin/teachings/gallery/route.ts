import { NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
      Prefix: 'teachings/',
    })

    const response = await s3.send(command)
    
    // Map objects to a cleaner format with public URLs
    const files = (response.Contents || [])
      .filter(obj => obj.Key && !obj.Key.endsWith('/')) // Exclude "folders"
      .map(obj => ({
        key: obj.Key,
        name: obj.Key?.replace('teachings/', ''),
        size: obj.Size,
        lastModified: obj.LastModified,
        url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${obj.Key}`
      }))
      .sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0))

    return NextResponse.json({ files })
  } catch (err: any) {
    console.error('Gallery fetch error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
