import { HP_FIELD } from '@/lib/anti-spam'

/** Off-screen decoy input — bots fill every input they find, real users never
 *  see it. Matches the markup already used in ContactForm/NewsletterForm. */
export function HoneypotField({ inputRef }: { inputRef: React.RefObject<HTMLInputElement> }) {
  return (
    <input
      ref={inputRef}
      name={HP_FIELD}
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, left: '-9999px' }}
    />
  )
}
