'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe.')
      setStatus('error')
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
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-teleiosis-gold/60 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-6 rounded-full bg-teleiosis-gold text-[#2c0e68] text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-60 disabled:scale-100 flex items-center gap-2"
        >
          {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 'Join Us'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </form>
  )
}
