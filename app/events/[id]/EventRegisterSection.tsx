'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, UserCheck } from 'lucide-react'

export function EventRegisterSection({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
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
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-100 p-6 sm:p-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-2">You&apos;re Registered!</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
          We have your spot for <strong className="text-[#2c0e68]">{eventTitle}</strong>. Check your inbox for a confirmation email.
        </p>
      </div>
    )
  }

  const inputCls = 'w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300'

  return (
    <div className="bg-slate-50 border border-slate-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-[#2c0e68]/10 flex items-center justify-center">
          <UserCheck size={16} className="text-[#2c0e68]" />
        </div>
        <div>
          <p className="font-serif font-bold text-[#2c0e68] text-base">Register for this Event</p>
          <p className="text-xs text-slate-400">Free · Secure your spot</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          className={`w-full py-3.5 text-sm font-bold transition-all ${
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
    </div>
  )
}
