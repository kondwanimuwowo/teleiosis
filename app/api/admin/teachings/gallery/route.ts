import { NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

const FOLDERS = ['teachings', 'series']

async function listFolder(folder: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
    Prefix: `${folder}/`,
  })
  const response = await s3.send(command)
  console.log(`Gallery: Found ${response.Contents?.length || 0} objects in '${folder}/'`)

  return (response.Contents || [])
    .filter(obj => obj.Key && !obj.Key.endsWith('/')) // Exclude "folder" placeholder keys
    .map(obj => ({
      key: obj.Key!,
      name: obj.Key!.replace(`${folder}/`, ''),
      folder,
      size: obj.Size ?? 0,
      lastModified: obj.LastModified ?? new Date(0),
      url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${obj.Key}`,
    }))
}

export async function GET() {
  try {
    console.log('Gallery: Fetching from bucket:', process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET)

    // Fetch all folders in parallel
    const results = await Promise.all(FOLDERS.map(listFolder))
    const files = results
      .flat()
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())

    console.log('Gallery: Total files across all folders:', files.length)
    return NextResponse.json({ files })
  } catch (err: any) {
    console.error('Gallery fetch error:', {
      message: err.message,
      code: err.code,
      name: err.name,
    })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
