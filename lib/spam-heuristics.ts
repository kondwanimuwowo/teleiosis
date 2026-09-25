const URL_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|net|org|ru|cn|xyz|top|icu|info|biz|online|site|shop|club)\b)/gi
const BBCODE_RE = /\[(url|link|img)[=\]]/i
const SPAM_PHRASES = /\b(seo services?|backlinks?|crypto|bitcoin|forex|casino|viagra|cialis|loan offer|guest post|rank your (site|website)|web design services|increase your (traffic|sales))\b/i
const CYRILLIC_RE = /[Ѐ-ӿ]/

/** Higher score = more spammy. >= SPAM_THRESHOLD is rejected. A genuine
 *  enquiry or registration note rarely contains links; a name field never
 *  does. */
export function spamScore(input: { message?: string; name?: string }): number {
  let score = 0
  const msg = input.message ?? ''
  const name = input.name ?? ''

  const urls = msg.match(URL_RE)?.length ?? 0
  if (urls >= 1) score += 2
  if (urls >= 3) score += 2
  if (BBCODE_RE.test(msg)) score += 3
  if (SPAM_PHRASES.test(msg)) score += 3
  if (URL_RE.test(name)) score += 4
  if (CYRILLIC_RE.test(msg) || CYRILLIC_RE.test(name)) score += 2
  if (msg.length > 1500) score += 1
  if (msg.length > 40 && msg === msg.toUpperCase()) score += 1

  return score
}

export const SPAM_THRESHOLD = 3
