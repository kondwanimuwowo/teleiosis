'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

const SUBJECTS = [
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Programs & Training', label: 'Programs & Training' },
  { value: 'Events & Conferences', label: 'Events & Conferences' },
  { value: 'Audio Library', label: 'Audio Library' },
  { value: 'Partnerships & Giving', label: 'Partnerships & Giving' },
]

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <CheckCircle size={40} className="text-green-500" />
        <h3 className="font-serif font-bold text-2xl text-[#2c0e68]">Message Sent!</h3>
        <p className="text-slate-500 text-base leading-relaxed max-w-md">
          Thank you, {form.name.split(' ')[0]}. We have received your message and will get back to you shortly. Check your inbox for a confirmation email.
        </p>
        <button
          onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: 'General Inquiry', message: '' }) }}
          className="mt-2 text-sm font-semibold text-[#4a0e68] hover:text-teleiosis-gold transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputCls = 'w-full bg-white border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors'
  const labelCls = 'block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      <div>
        <label htmlFor="name" className={labelCls}>Full Name</label>
        <input
          id="name" type="text" name="name" required
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>Email Address</label>
        <input
          id="email" type="email" name="email" required
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="subject" className={labelCls}>Subject</label>
        <select
          id="subject" name="subject"
          value={form.subject}
          onChange={(e) => set('subject', e.target.value)}
          className={inputCls + ' appearance-none'}
        >
          {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelCls}>How can we help you?</label>
        <textarea
          id="message" name="message" rows={4} required
          placeholder="Your message here..."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className={inputCls + ' resize-none'}
        />
      </div>

      {status === 'error' && (
        <div className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full bg-[#4a0e68] text-white text-sm font-bold hover:bg-[#2c0e68] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <><Loader2 size={15} className="animate-spin" /> Sending…</>
          ) : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
