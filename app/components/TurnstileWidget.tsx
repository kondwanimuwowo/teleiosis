'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { forwardRef } from 'react'

type Props = {
  onToken: (token: string | null) => void
  className?: string
}

/** Renders nothing visible unless Cloudflare decides a challenge is
 *  warranted. With no site key configured the widget is skipped and the
 *  server-side verifier also no-ops, so local dev works without credentials. */
export const TurnstileWidget = forwardRef<TurnstileInstance | undefined, Props>(
  function TurnstileWidget({ onToken, className }, ref) {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return null

    return (
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onToken}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
        options={{ theme: 'light', size: 'flexible', appearance: 'interaction-only' }}
        className={className}
      />
    )
  }
)
