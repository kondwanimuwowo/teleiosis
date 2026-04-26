'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Loader2, ArrowLeft, UploadCloud } from 'lucide-react'
import Link from 'next/link'

const SATURDAY_TEMPLATE = {
  time_start: '2:00 PM',
  time_end: '5:00 PM',
  location: 'Emperors Crown Olympia, Along Chainama Road, Lusaka',
  speaker: 'Rhema Nyambe',
  type: 'In Person',
  is_recurring: true,
  recurring_label: 'Manifested Sons of God Class — Fortnightly Saturday',
  recurrence_frequency: 'fortnightly',
  recurrence_interval_days: '',
  recurrence_day_of_week: 'saturday',
}

const FREQUENCIES = [
  { value: 'daily',       label: 'Daily' },
  { value: 'weekly',      label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly (every 2 weeks)' },
  { value: 'monthly',     label: 'Monthly' },
  { value: 'custom',      label: 'Custom (specify days)' },
]

const DAYS_OF_WEEK = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [form, setForm] = useState({
    title: '',
    date: '',
    time_start: '',
    time_end: '',
    location: '',
    speaker: 'Rhema Nyambe',
    type: 'In Person',
    description: '',
    is_recurring: false,
    recurring_label: '',
    recurrence_frequency: '',
    recurrence_interval_days: '',
    recurrence_day_of_week: '',
  })

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function applySaturdayTemplate() {
    setForm(f => ({ ...f, ...SATURDAY_TEMPLATE }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData()
    if (image) formData.append('image', image)
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))

    const res = await fetch('/api/admin/events', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Something went wrong')
      setLoading(false)
    } else {
      router.push('/admin/events')
      router.refresh()
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all bg-white placeholder-slate-400"
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-0.5">Events</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">New Event</h1>
        </div>
      </div>

      {/* Saturday Quick-Fill */}
      <button
        type="button"
        onClick={applySaturdayTemplate}
        className="w-full mb-6 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-[#4a2c9c]/25 text-[#4a2c9c] text-sm font-semibold hover:border-[#4a2c9c]/50 hover:bg-[#4a2c9c]/4 transition-all duration-200"
      >
        <Zap size={15} />
        Saturday Class Quick-Fill (Manifested Sons)
      </button>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-5">
        <div>
          <label className={labelCls}>Event Title *</label>
          <input type="text" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Manifested Sons of God Class" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Date *</label>
            <input type="date" required value={form.date} onChange={e => set('date', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} className={inputCls}>
              <option>In Person</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Start Time</label>
            <input type="text" value={form.time_start} onChange={e => set('time_start', e.target.value)} placeholder="2:00 PM" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End Time</label>
            <input type="text" value={form.time_end} onChange={e => set('time_end', e.target.value)} placeholder="5:00 PM" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Location</label>
          <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Venue, Address" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Speaker</label>
          <input type="text" value={form.speaker} onChange={e => set('speaker', e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Banner Image (Optional)</label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="p-8 sm:p-10 text-center pointer-events-none">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="text-[#4a2c9c]" size={20} />
              </div>
              <p className="text-sm font-semibold text-[#2c0e68] mb-1">
                {image ? image.name : "Select Event Banner"}
              </p>
              <p className="text-xs text-slate-400">
                {image ? `${(image.size / 1024 / 1024).toFixed(2)} MB` : "Recommended: 16:9 ratio, High Quality"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>Description (optional)</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief event description…" className={`${inputCls} resize-none`} />
        </div>

        {/* Recurring */}
        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="is_recurring"
            checked={form.is_recurring}
            onChange={e => set('is_recurring', e.target.checked)}
            className="w-4 h-4 accent-[#4a2c9c]"
          />
          <label htmlFor="is_recurring" className="text-sm text-slate-600">This is a recurring event</label>
        </div>

        {form.is_recurring && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <div>
              <label className={labelCls}>Frequency</label>
              <select value={form.recurrence_frequency} onChange={e => set('recurrence_frequency', e.target.value)} className={inputCls}>
                <option value="">— Select frequency —</option>
                {FREQUENCIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>

            {form.recurrence_frequency === 'custom' && (
              <div>
                <label className={labelCls}>Every how many days?</label>
                <input type="number" min="1" value={form.recurrence_interval_days} onChange={e => set('recurrence_interval_days', e.target.value)} placeholder="e.g. 14" className={inputCls} />
              </div>
            )}

            <div>
              <label className={labelCls}>Day of week (optional)</label>
              <select value={form.recurrence_day_of_week} onChange={e => set('recurrence_day_of_week', e.target.value)} className={inputCls}>
                <option value="">— Any day —</option>
                {DAYS_OF_WEEK.map(d => <option key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>Recurring label (optional)</label>
              <input type="text" value={form.recurring_label} onChange={e => set('recurring_label', e.target.value)} placeholder="e.g. Manifested Sons of God Class" className={inputCls} />
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link href="/admin/events" className="flex-1 flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Creating…' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
