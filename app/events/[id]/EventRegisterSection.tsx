'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, UserCheck, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function EventRegisterSection({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: phone || undefined, eventId, type: 'event' }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      setOpen(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors'

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-5 sm:p-6 text-left group"
      >
        <div className="w-9 h-9 bg-[#2c0e68]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <UserCheck size={16} className="text-[#2c0e68]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-[#2c0e68] text-base leading-snug">Register for this Event</p>
          <p className="text-xs text-slate-400 mt-0.5">Free &middot; Secure your spot</p>
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
        <div className="px-5 sm:px-6 pb-6 border-t border-slate-100">
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-1">You&apos;re Registered!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                We have your spot for <strong className="text-[#2c0e68]">{eventTitle}</strong>. Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-5">
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
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-sm font-bold rounded-lg transition-all ${
                  loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#2c0e68] text-white hover:bg-[#3a1878] cursor-pointer'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin" /> Registering…
                  </span>
                ) : 'Register Now — Free'}
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
