import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { pingRedis } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Verify the request is from the scheduler (cron-job.org)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [db, redis] = await Promise.allSettled([
    supabaseAdmin.from('teachings').select('id').limit(1),
    pingRedis(),
  ])

  const dbError =
    db.status === 'rejected' ? String(db.reason) : db.value.error?.message ?? null
  const redisError = redis.status === 'rejected' ? String(redis.reason) : null

  if (dbError) console.error('[cron/ping] DB ping failed:', dbError)
  if (redisError) console.error('[cron/ping] Redis ping failed:', redisError)

  const ok = !dbError && !redisError
  return NextResponse.json(
    {
      ok,
      db: dbError ?? 'ok',
      redis: redisError ?? (redis.status === 'fulfilled' ? redis.value : 'unknown'),
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 500 }
  )
}
