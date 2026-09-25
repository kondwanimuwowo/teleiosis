'use client'

import { useRef, useState } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { validateName, validatePhone } from '@/lib/validation'
import { HoneypotField } from '@/app/components/HoneypotField'
import { TurnstileWidget } from '@/app/components/TurnstileWidget'
import { useFormTiming } from '@/lib/useFormTiming'
import { TS_FIELD } from '@/lib/anti-spam'

const HEAR_OPTIONS = [
  'A friend or family member',
  'Social media (Facebook, Instagram)',
  'YouTube',
  'Church / another ministry',
  'Event or conference',
  'Other',
]

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [heardFrom, setHeardFrom] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({})
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const hpRef = useRef<HTMLInputElement>(null)
  const turnstileRef = useRef<TurnstileInstance>()
  const loadedAt = useFormTiming()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (hpRef.current?.value) {
      setSuccess(true)
      return
    }

    const nameErr  = validateName(name)
    const phoneErr = validatePhone(phone)
    if (nameErr || phoneErr) {
      setFieldErrors({ name: nameErr ?? undefined, phone: phoneErr ?? undefined })
      return
    }
    setFieldErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone: phone || undefined, type: 'general',
          notes: heardFrom ? `Heard via: ${heardFrom}` : undefined,
          [TS_FIELD]: loadedAt.current, turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-[#2c0e68] mb-3">Welcome</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-8">
          You are now part of the Teleiosis community. Check your inbox for a welcome email with helpful links to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/events"
            className="px-6 py-3 rounded-full bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#3a1878] transition-colors"
          >
            View events
          </Link>
          <Link
            href="/teachings"
            className="px-6 py-3 rounded-full bg-[#2c0e68]/10 text-[#2c0e68] text-sm font-bold hover:bg-[#2c0e68]/15 transition-colors"
          >
            Explore teachings
          </Link>
        </div>
      </div>
    )
  }

  const inputCls = 'w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 bg-white transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <HoneypotField inputRef={hpRef} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => { setName(e.target.value); setFieldErrors((f) => ({ ...f, name: undefined })) }}
            className={`${inputCls} ${fieldErrors.name ? 'border-red-400 focus:border-red-400' : ''}`}
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address *</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Phone <span className="font-normal normal-case">(optional)</span>
        </label>
        <input
          type="tel"
          placeholder="+260 97 ..."
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setFieldErrors((f) => ({ ...f, phone: undefined })) }}
          className={`${inputCls} ${fieldErrors.phone ? 'border-red-400 focus:border-red-400' : ''}`}
        />
        {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          How did you hear about us? <span className="font-normal normal-case">(optional)</span>
        </label>
        <select
          value={heardFrom}
          onChange={(e) => setHeardFrom(e.target.value)}
          className={`${inputCls} cursor-pointer`}
        >
          <option value="">Select one</option>
          {HEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 text-sm font-bold rounded-full transition-all ${
          loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#2c0e68] text-white hover:bg-[#3a1878] cursor-pointer'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Registering…
          </span>
        ) : 'Join the Community'}
      </button>

      <p className="text-[10px] text-slate-400 text-center">
        No spam, ever. Only Kingdom updates.
      </p>
    </form>
  )
}
