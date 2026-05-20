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

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[11px] font-bold tracking-widest uppercase text-slate-400">
          Full Name
        </label>
        <input
          id="name" type="text" name="name" required
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className="w-full bg-white px-0 py-3 border-b border-slate-200 text-slate-900 text-base placeholder-slate-300 focus:outline-none focus:border-teleiosis-gold transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[11px] font-bold tracking-widest uppercase text-slate-400">
          Email Address
        </label>
        <input
          id="email" type="email" name="email" required
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          className="w-full bg-white px-0 py-3 border-b border-slate-200 text-slate-900 text-base placeholder-slate-300 focus:outline-none focus:border-teleiosis-gold transition-colors"
        />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <label htmlFor="subject" className="block text-[11px] font-bold tracking-widest uppercase text-slate-400">
          Subject
        </label>
        <select
          id="subject" name="subject"
          value={form.subject}
          onChange={(e) => set('subject', e.target.value)}
          className="w-full bg-white px-0 py-3 border-b border-slate-200 text-slate-900 text-base focus:outline-none focus:border-teleiosis-gold transition-colors appearance-none"
        >
          {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2 space-y-2">
        <label htmlFor="message" className="block text-[11px] font-bold tracking-widest uppercase text-slate-400">
          How can we help you?
        </label>
        <textarea
          id="message" name="message" rows={4} required
          placeholder="Your message here..."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className="w-full bg-white px-0 py-3 border-b border-slate-200 text-slate-900 text-base placeholder-slate-300 focus:outline-none focus:border-teleiosis-gold transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3">
          {errorMsg}
        </div>
      )}

      <div className="sm:col-span-2 pt-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2.5 h-14 px-10 rounded-full bg-[#4a0e68] text-white font-bold hover:bg-[#2c0e68] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {status === 'loading' ? (
            <><Loader2 size={16} className="animate-spin" /> Sending…</>
          ) : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
