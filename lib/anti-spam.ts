import { NextRequest } from 'next/server'

// Field names match the honeypot/timing convention already shipped in
// ContactForm.tsx and NewsletterForm.tsx.
export const HP_FIELD = '_hp'
export const TS_FIELD = '_t'

const MIN_FILL_MS = 3000
const MAX_FORM_AGE_MS = 60 * 60 * 1000

/** Returns true if the submission looks automated (bot fills every field, or
 *  submits faster than a human could read the form). Callers that already
 *  short-circuit on this should respond as if the submission succeeded, so a
 *  bot cannot distinguish "rejected" from "sent". */
export function looksAutomated(data: { [HP_FIELD]?: unknown; [TS_FIELD]?: unknown }): boolean {
  const trap = data[HP_FIELD]
  if (typeof trap === 'string' && trap.trim() !== '') return true

  const loadedAt = Number(data[TS_FIELD])
  if (!Number.isFinite(loadedAt) || loadedAt <= 0) return true

  const elapsed = Date.now() - loadedAt
  if (elapsed < MIN_FILL_MS) return true
  if (elapsed > MAX_FORM_AGE_MS) return true

  return false
}

/** First client IP behind Vercel's proxy. */
export function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || 'unknown'
}
