'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface NewsletterSectionProps {
  title?: string
  description?: string
  className?: string
}

export function NewsletterSection({
  title = 'Never miss an event',
  description = 'Subscribe to stay updated on upcoming gatherings, conferences, and latest teachings.',
  className = 'bg-white py-16 sm:py-20 lg:py-28',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm transition-all duration-500 hover:shadow-md group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4a0e68] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teleiosis-gold opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 transition-all duration-700 group-hover:scale-110" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#2c0e68] tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              {description}
            </p>
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                <CheckCircle size={18} />
                You&apos;re subscribed! Check your inbox for a welcome email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4a0e68]/40 bg-white transition-all shadow-sm text-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-[#4a0e68] text-white text-sm font-bold rounded-full hover:bg-[#4a0e68]/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" />Subscribing…</span>
                  ) : 'Subscribe now'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-500">{errorMsg}</p>
            )}
            <p className="text-xs text-slate-400 font-medium">No spam, ever. Only Kingdom updates.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
