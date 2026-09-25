/**
 * Gmail ignores dots in the local part and everything after a "+", so one
 * mailbox has unlimited textual spellings. Canonicalising collapses the
 * variants back to one identity for rate limiting and duplicate checks.
 */

const DOT_COLLAPSING_DOMAINS = new Set(['gmail.com', 'googlemail.com'])

const PLUS_ALIAS_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
  'fastmail.com', 'protonmail.com', 'proton.me', 'icloud.com', 'me.com',
])

/** Collapse an address to the mailbox it actually reaches. Use this for rate
 *  limiting and duplicate detection — never for sending, which must use the
 *  address the user typed. */
export function canonicalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase()
  const at = trimmed.lastIndexOf('@')
  if (at <= 0) return trimmed

  let local = trimmed.slice(0, at)
  let domain = trimmed.slice(at + 1)

  if (domain === 'googlemail.com') domain = 'gmail.com'

  if (PLUS_ALIAS_DOMAINS.has(domain)) {
    const plus = local.indexOf('+')
    if (plus > 0) local = local.slice(0, plus)
  }

  if (DOT_COLLAPSING_DOMAINS.has(domain)) {
    local = local.replace(/\./g, '')
  }

  return `${local}@${domain}`
}

function meaninglessDotCount(email: string): number {
  const at = email.lastIndexOf('@')
  if (at <= 0) return 0
  const domain = email.slice(at + 1).toLowerCase()
  if (!DOT_COLLAPSING_DOMAINS.has(domain)) return 0
  return (email.slice(0, at).match(/\./g) ?? []).length
}

/** Real Gmail users rarely exceed two dots ("first.middle.last"); three is
 *  uncommon but plausible. Heavy dotting is a bot spelling one mailbox many
 *  ways to defeat per-address limits, so four is the cutoff. */
const MAX_GMAIL_DOTS = 4

/** Returns an error string for an address that looks machine-generated. */
export function checkAddressShape(email: string): string | null {
  const normalized = email.trim().toLowerCase()

  if (meaninglessDotCount(normalized) >= MAX_GMAIL_DOTS) {
    return 'Please enter your email address without extra dots.'
  }

  const at = normalized.lastIndexOf('@')
  const local = at > 0 ? normalized.slice(0, at) : normalized

  // Dots making up a third of the local part is not a name, it's evasion.
  const dots = (local.match(/\./g) ?? []).length
  if (local.length >= 6 && dots / local.length > 0.33) {
    return 'Please enter your email address without extra dots.'
  }

  return null
}

const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
  'temp-mail.org', 'throwaway.email', 'temp.email', 'yopmail.com', 'maildrop.cc',
  'trashmail.com', 'sharklasers.com', 'spam4.me', 'fakeinbox.com', 'junk1.com',
  'dispostable.com', 'getnada.com', 'mailnesia.com', 'emailondeck.com',
  'tempr.email', 'moakt.com', 'tmpmail.org', 'mytemp.email', 'inboxkitten.com',
])

export function isDisposableEmail(email: string): boolean {
  return DISPOSABLE_DOMAINS.has(email.split('@')[1]?.toLowerCase() ?? '')
}
