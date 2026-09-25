'use client'

import { useRef, useState } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { CheckCircle, Loader2, UserCheck, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { HoneypotField } from '@/app/components/HoneypotField'
import { TurnstileWidget } from '@/app/components/TurnstileWidget'
import { useFormTiming } from '@/lib/useFormTiming'
import { TS_FIELD } from '@/lib/anti-spam'

export function EventRegisterSection({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const hpRef = useRef<HTMLInputElement>(null)
  const turnstileRef = useRef<TurnstileInstance>()
  const loadedAt = useFormTiming()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (hpRef.current?.value) {
      setSuccess(true)
      setOpen(true)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone: phone || undefined, eventId, type: 'event',
          [TS_FIELD]: loadedAt.current, turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setSuccess(true)
      setOpen(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors'

  return (
    <div className="bg-slate-50 rounded-xl overflow-hidden shadow-sm">
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-5 sm:p-6 text-left group"
      >
        <UserCheck size={20} className="text-[#2c0e68] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-[#2c0e68] text-base leading-snug">Register for this event</p>
          <p className="text-xs text-slate-400 mt-0.5">Free &middot; secure your spot</p>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {open && (
        <motion.div
          key="register-body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
        <div className="px-5 sm:px-6 pb-6 bg-white">
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-1">You&apos;re registered!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                We have your spot for <strong className="text-[#2c0e68]">{eventTitle}</strong>. Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-5">
              <HoneypotField inputRef={hpRef} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name *</label>
                  <input
                    type="text" required placeholder="Your name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email *</label>
                  <input
                    type="email" required placeholder="your@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Phone <span className="font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="tel" placeholder="+260 97 ..."
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>
              <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-sm font-bold rounded-full transition-all ${
                  loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#2c0e68] text-white hover:bg-[#3a1878] cursor-pointer'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin" /> Registering…
                  </span>
                ) : "Register now, it's free"}
              </button>
            </form>
          )}
        </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
