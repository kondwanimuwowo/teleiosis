// Shared validation for name and phone fields across forms and API routes.

// Valid name: letters (including accented/Unicode), spaces, hyphens, apostrophes, periods.
// Must contain at least one space (first + last name). No digits allowed.
const NAME_CHARS = /^[\p{L}\s'\-\.]+$/u
const HAS_SPACE  = /\s/

export function validateName(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Full name is required.'
  if (!HAS_SPACE.test(v)) return 'Please enter your first and last name.'
  if (!NAME_CHARS.test(v)) return 'Name must contain only letters, spaces, hyphens, or apostrophes.'
  if (v.length < 3)  return 'Name is too short.'
  if (v.length > 80) return 'Name is too long.'
  return null
}

// Valid phone: digits, +, -, spaces, parentheses only. No letters.
const PHONE_CHARS   = /^[+\d\s()\-]+$/
const MIN_DIGITS    = /\d{6}/

export function validatePhone(value: string): string | null {
  const v = value.trim()
  if (!v) return null // phone is optional
  if (!PHONE_CHARS.test(v)) return 'Phone number must contain only digits, +, -, spaces, or parentheses.'
  if (!MIN_DIGITS.test(v))  return 'Please enter a valid phone number.'
  return null
}

// Basic shape check — form-level enforcement (dotted-Gmail evasion, disposable
// domains) lives in lib/email-normalize.ts and is applied at the API layer.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Email address is required.'
  if (v.length > 254) return 'Email address is too long.'
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.'
  return null
}
