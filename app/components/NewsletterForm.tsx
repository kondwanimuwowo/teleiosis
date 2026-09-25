'use client'

import { useState, useRef } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { Loader2, CheckCircle } from 'lucide-react'
import { HoneypotField } from '@/app/components/HoneypotField'
import { TurnstileWidget } from '@/app/components/TurnstileWidget'
import { useFormTiming } from '@/lib/useFormTiming'
import { TS_FIELD } from '@/lib/anti-spam'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const hpRef = useRef<HTMLInputElement>(null)
  const turnstileRef = useRef<TurnstileInstance>()
  const loadedAt = useFormTiming()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    if (hpRef.current?.value) {
      setStatus('success')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, [TS_FIELD]: loadedAt.current, turnstileToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe.')
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 max-w-sm">
        <CheckCircle size={18} className="text-teleiosis-gold flex-shrink-0" />
        <p className="text-white/70 text-sm">You&apos;re subscribed! Check your inbox.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <HoneypotField inputRef={hpRef} />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 text-white text-sm placeholder-white/25 shadow-sm focus:outline-none focus:ring-2 focus:ring-teleiosis-gold/50 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-6 rounded-full bg-teleiosis-gold text-[#2c0e68] text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-60 disabled:scale-100 flex items-center gap-2"
        >
          {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 'Subscribe'}
        </button>
      </div>
      <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />
      {status === 'error' && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </form>
  )
}
