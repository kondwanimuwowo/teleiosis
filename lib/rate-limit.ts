import { Redis } from '@upstash/redis'
import { canonicalizeEmail } from '@/lib/email-normalize'

// Same fixed-window pattern used across the Teleiosis sibling projects.
// Without UPSTASH_REDIS_REST_URL/TOKEN configured this fails open (local dev);
// with it configured but erroring, it fails closed so an outage can't be used
// to bypass the limit in production.
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null

export type RateLimitResult = { ok: true } | { ok: false; error: string; retryAfter: number }

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  label = 'requests'
): Promise<RateLimitResult> {
  if (!redis) return { ok: true }

  try {
    const attempts = await redis.incr(key)
    if (attempts === 1) await redis.expire(key, windowSeconds)

    if (attempts > limit) {
      const ttl = await redis.ttl(key)
      const retryAfter = ttl > 0 ? ttl : windowSeconds
      return {
        ok: false,
        retryAfter,
        error: `Too many ${label}. Please try again in ${Math.ceil(retryAfter / 60)} minute(s).`,
      }
    }
    return { ok: true }
  } catch (e) {
    console.error('[rate-limit] Redis error:', e)
    return { ok: false, retryAfter: windowSeconds, error: 'Service temporarily unavailable. Please try again shortly.' }
  }
}

/** Limit by IP and by canonical email in one call. */
export async function rateLimitIpAndEmail(
  scope: string,
  ip: string,
  email: string,
  opts: { ipLimit: number; emailLimit: number; windowSeconds: number }
): Promise<RateLimitResult> {
  const byIp = await rateLimit(`rl:${scope}:ip:${ip}`, opts.ipLimit, opts.windowSeconds, 'submissions')
  if (!byIp.ok) return byIp
  return rateLimit(`rl:${scope}:email:${canonicalizeEmail(email)}`, opts.emailLimit, opts.windowSeconds, 'submissions')
}

/** Global daily cap — the kill switch. Call immediately before any Resend send
 *  an anonymous visitor can trigger. */
export async function consumeQuota(bucket: string, dailyCap: number): Promise<boolean> {
  if (!redis) return true
  try {
    const day = new Date().toISOString().slice(0, 10)
    const key = `quota:${bucket}:${day}`
    const used = await redis.incr(key)
    if (used === 1) await redis.expire(key, 60 * 60 * 26)
    if (used > dailyCap) {
      console.error(`[quota] DAILY CAP HIT for "${bucket}" (${used}/${dailyCap}) — suppressed`)
      return false
    }
    return true
  } catch (e) {
    console.error('[quota] Redis error:', e)
    return true // never block legitimate transactional mail on a Redis blip
  }
}

/** True if this exact payload was already seen within the window. */
export async function isDuplicate(scope: string, fingerprint: string, windowSeconds: number): Promise<boolean> {
  if (!redis) return false
  try {
    const set = await redis.set(`dedupe:${scope}:${fingerprint}`, 1, { nx: true, ex: windowSeconds })
    return set === null
  } catch {
    return false
  }
}
