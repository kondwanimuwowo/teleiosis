import { NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export const dynamic = 'force-dynamic'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

export async function GET() {
  try {
    let totalBytes = 0
    let objectCount = 0
    let continuationToken: string | undefined

    // Paginate through all objects in the bucket
    do {
      const res = await s3.send(new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET!,
        ContinuationToken: continuationToken,
      }))

      for (const obj of res.Contents ?? []) {
        totalBytes += obj.Size ?? 0
        objectCount++
      }

      continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
    } while (continuationToken)

    const totalMB = totalBytes / (1024 * 1024)
    const totalGB = totalBytes / (1024 * 1024 * 1024)

    return NextResponse.json({
      bytes: totalBytes,
      mb: Math.round(totalMB * 100) / 100,
      gb: Math.round(totalGB * 1000) / 1000,
      objects: objectCount,
      // R2 free tier: 10 GB/month
      freeTierGB: 10,
      usedPercent: Math.min(100, Math.round((totalGB / 10) * 100 * 10) / 10),
    })
  } catch (err: any) {
    console.error('R2 storage check error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
