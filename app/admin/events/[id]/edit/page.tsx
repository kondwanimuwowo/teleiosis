'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Zap, Loader2, ArrowLeft, UploadCloud } from 'lucide-react'
import Link from 'next/link'

const SATURDAY_TEMPLATE = {
  time_start: '2:00 PM',
  time_end: '5:00 PM',
  location: 'Emperors Crown Olympia, Along Chainama Road, Lusaka',
  speaker: 'Rhema Nyambe',
  type: 'In Person',
  is_recurring: true,
  recurring_label: 'Manifested Sons of God Saturday Class',
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
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
  })

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(`/api/admin/events/${id}`)
        if (!res.ok) throw new Error('Failed to load event')
        const data = await res.json()
        
        // Format date for input type="date" (YYYY-MM-DD)
        const date = data.date ? new Date(data.date).toISOString().split('T')[0] : ''
        
        setForm({
          title: data.title || '',
          date: date,
          time_start: data.time_start || '',
          time_end: data.time_end || '',
          location: data.location || '',
          speaker: data.speaker || 'Rhema Nyambe',
          type: data.type || 'In Person',
          description: data.description || '',
          is_recurring: !!data.is_recurring,
          recurring_label: data.recurring_label || '',
        })
        setBannerUrl(data.banner_url)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [id])

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function applySaturdayTemplate() {
    setForm(f => ({ ...f, ...SATURDAY_TEMPLATE }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const formData = new FormData()
    if (image) formData.append('image', image)
    if (bannerUrl) formData.append('banner_url', bannerUrl)
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))

    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PATCH',
      body: formData,
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Something went wrong')
      setSaving(false)
    } else {
      router.push('/admin/events')
      router.refresh()
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all bg-white placeholder-slate-400"
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p className="text-sm font-medium">Loading event details...</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-0.5">Events</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Edit event</h1>
        </div>
      </div>

      <button
        type="button"
        onClick={applySaturdayTemplate}
        className="w-full mb-6 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4a2c9c]/8 text-[#4a2c9c] text-sm font-semibold hover:bg-[#4a2c9c]/15 transition-all duration-200"
      >
        <Zap size={15} />
        Saturday class quick-fill (Manifested Sons)
      </button>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
        <div>
          <label className={labelCls}>Event title *</label>
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
            <label className={labelCls}>Start time</label>
            <input type="text" value={form.time_start} onChange={e => set('time_start', e.target.value)} placeholder="2:00 PM" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End time</label>
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
          <label className={labelCls}>Banner image (optional)</label>
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
                {image ? image.name : bannerUrl ? "Change Event Banner" : "Select Event Banner"}
              </p>
              <p className="text-xs text-slate-400">
                {image ? `${(image.size / 1024 / 1024).toFixed(2)} MB` : bannerUrl ? "Currently has a banner" : "Recommended: 16:9 ratio, High Quality"}
              </p>
            </div>
          </div>
          {bannerUrl && !image && (
            <div className="mt-2 text-center">
               <img src={bannerUrl} alt="Current banner" className="h-20 mx-auto rounded-lg object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className={labelCls}>Description (optional)</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief event description..." className={`${inputCls} resize-none`} />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="is_recurring"
            checked={form.is_recurring}
            onChange={e => set('is_recurring', e.target.checked)}
            className="w-4 h-4 accent-[#4a2c9c]"
          />
          <label htmlFor="is_recurring" className="text-sm text-slate-600">This is a recurring class</label>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link href="/admin/events" className="flex-1 flex items-center justify-center px-5 py-2.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Saving...' : 'Update event'}
          </button>
        </div>
      </form>
    </div>
  )
}
