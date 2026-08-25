import { HardDrive } from 'lucide-react'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

async function getStorageStats() {
  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
    },
  })

  let totalBytes = 0
  let objectCount = 0
  let continuationToken: string | undefined

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

  const gb = totalBytes / (1024 ** 3)
  const mb = totalBytes / (1024 ** 2)
  const usedPercent = Math.min(100, (gb / 10) * 100)

  return { gb, mb, objectCount, usedPercent }
}

export async function StorageWidget() {
  try {
    const { gb, mb, objectCount, usedPercent } = await getStorageStats()
    const displaySize = gb >= 0.1 ? `${gb.toFixed(2)} GB` : `${mb.toFixed(1)} MB`
    const barColor = usedPercent > 80 ? 'bg-red-400' : usedPercent > 50 ? 'bg-amber-400' : 'bg-emerald-400'

    return (
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
              <HardDrive size={16} className="text-teleiosis-purple" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2c0e68]">R2 Storage</p>
              <p className="text-[10px] text-slate-400">{objectCount} files</p>
            </div>
          </div>
          <p className="font-serif font-bold text-xl text-[#2c0e68]">{displaySize}</p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} rounded-full transition-all duration-500`}
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5">
          {usedPercent.toFixed(1)}% of 10 GB free tier used
        </p>
      </div>
    )
  } catch {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
          <HardDrive size={16} className="text-teleiosis-purple" />
        </div>
        <p className="text-xs text-slate-400">Storage data unavailable</p>
      </div>
    )
  }
}
