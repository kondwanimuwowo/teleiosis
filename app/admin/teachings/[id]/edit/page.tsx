'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Loader2, CheckCircle2, Library, X, Upload, Music } from 'lucide-react'
import Link from 'next/link'
import { AudioGalleryModal } from '../../AudioGalleryModal'

type Category = { id: string; name: string }
type Series = { id: string; title: string }

export default function EditTeachingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const audioRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<Category[]>([])
  const [seriesList, setSeriesList] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  
  const [audioFile, setAudioFile]   = useState<File | null>(null)
  const [galleryUrl, setGalleryUrl] = useState<string | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [progress, setProgress]     = useState(0)

  const [form, setForm] = useState({
    title: '', speaker: 'Rhema Nyambe', description: '',
    category_id: '', duration_minutes: '', price: '',
    series_id: '', order_in_series: '',
    included_in_membership: true,
  })

  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, seriesRes, teachingRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/series'),
          fetch(`/api/admin/teachings/${id}`)
        ])

        const catsData = await catsRes.json()
        const seriesData = await seriesRes.json()
        const teachingData = await teachingRes.json()

        setCategories(catsData.categories ?? [])
        setSeriesList(Array.isArray(seriesData) ? seriesData : [])
        
        setForm({
          title: teachingData.title || '',
          speaker: teachingData.speaker || 'Rhema Nyambe',
          description: teachingData.description || '',
          category_id: teachingData.category_id || '',
          duration_minutes: teachingData.duration_minutes?.toString() || '',
          price: teachingData.price?.toString() || '',
          series_id: teachingData.series_id || '',
          order_in_series: teachingData.order_in_series?.toString() || '',
          included_in_membership: !!teachingData.included_in_membership,
        })
        setCurrentAudioUrl(teachingData.audio_url)
      } catch (err: any) {
        setError('Failed to load teaching data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleGallerySelect(file: { name: string; url: string }) {
    setGalleryUrl(file.url)
    setSelectedFileName(file.name)
    setAudioFile(null)
    setIsGalleryOpen(false)
    setError(null)
  }

  function clearAudioSelection() {
    setAudioFile(null)
    setGalleryUrl(null)
    setSelectedFileName(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setProgress(0)

    try {
      let finalAudioUrl = galleryUrl || currentAudioUrl

      if (audioFile && !galleryUrl) {
        // 1. Get Presigned URL
        const presignRes = await fetch('/api/admin/teachings/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: audioFile.name,
            contentType: audioFile.type || 'audio/mpeg'
          })
        })
        
        const { signedUrl, publicUrl, error: presignError } = await presignRes.json()
        if (presignError) throw new Error(presignError)

        // 2. Upload directly to R2 via PUT
        const uploadPromise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100))
          }
          xhr.onload = () => {
            if (xhr.status === 200) resolve(true)
            else reject(new Error('Failed to upload file to storage'))
          }
          xhr.onerror = () => reject(new Error('Network error during file upload'))
          xhr.open('PUT', signedUrl)
          xhr.setRequestHeader('Content-Type', audioFile.type || 'audio/mpeg')
          xhr.send(audioFile)
        })

        await uploadPromise
        finalAudioUrl = publicUrl
      }

      const data = new FormData()
      data.append('audio_url', finalAudioUrl!)
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)))

      const res = await fetch(`/api/admin/teachings/${id}`, {
        method: 'PATCH',
        body: data
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => { router.push('/admin/teachings'); router.refresh() }, 1200)
      } else {
        const d = await res.json()
        setError(d.error || 'Update failed')
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all bg-white placeholder-slate-400"
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p className="text-sm font-medium">Loading teaching details...</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/teachings" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-0.5">Teachings</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Edit Teaching</h1>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
          <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
          <p className="font-semibold text-emerald-700">Teaching updated successfully!</p>
          <p className="text-emerald-600 text-sm mt-1">Redirecting…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-5">
          {/* Audio selection area */}
          <div>
            <label className={labelCls}>Audio Source</label>
            <div
              className={`relative flex flex-col items-center justify-center gap-2 p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                audioFile || galleryUrl || currentAudioUrl
                  ? 'border-[#4a2c9c]/40 bg-[#4a2c9c]/4'
                  : 'border-slate-200 hover:border-[#4a2c9c]/40 hover:bg-slate-50'
              }`}
            >
              {(audioFile || galleryUrl) && (
                <button 
                  type="button"
                  onClick={clearAudioSelection}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                >
                  <X size={14} />
                </button>
              )}

              {audioFile ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-1 text-[#4a2c9c]">
                    <Music size={24} />
                  </div>
                  <p className="text-sm font-bold text-[#2c0e68] text-center px-4 truncate w-full">
                    {audioFile.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    New Local File • {(audioFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </>
              ) : galleryUrl ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-1 text-teleiosis-gold">
                    <Library size={24} />
                  </div>
                  <p className="text-sm font-bold text-[#2c0e68] text-center px-4 truncate w-full">
                    {selectedFileName}
                  </p>
                  <p className="text-[10px] font-bold text-teleiosis-gold uppercase tracking-widest">
                    Selected from Gallery
                  </p>
                </>
              ) : currentAudioUrl ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-1 text-[#4a2c9c]">
                    <Music size={24} />
                  </div>
                  <p className="text-xs text-slate-500 text-center px-4 truncate w-full">
                    {currentAudioUrl.split('/').pop()}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Current Audio File
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      type="button" 
                      onClick={() => audioRef.current?.click()}
                      className="text-[10px] font-bold text-[#4a2c9c] hover:underline"
                    >
                      Replace File
                    </button>
                    <span className="text-slate-300">|</span>
                    <button 
                      type="button" 
                      onClick={() => setIsGalleryOpen(true)}
                      className="text-[10px] font-bold text-[#4a2c9c] hover:underline"
                    >
                      Gallery
                    </button>
                  </div>
                </>
              ) : (
                <div 
                  className="flex flex-col items-center cursor-pointer w-full"
                  onClick={() => audioRef.current?.click()}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-semibold text-[#2c0e68]">Click to select audio file</p>
                </div>
              )}
            </div>
            
            <input
              ref={audioRef}
              type="file"
              accept=".mp3,.m4a,audio/*"
              className="hidden"
              onChange={e => {
                setAudioFile(e.target.files?.[0] ?? null)
                setGalleryUrl(null)
                setSelectedFileName(null)
              }}
            />

            {(audioFile || galleryUrl) && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-px bg-slate-100 flex-1" />
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4a2c9c] hover:text-[#2c0e68] transition-colors uppercase tracking-widest px-4 py-2 rounded-full bg-[#4a2c9c]/5 hover:bg-[#4a2c9c]/10"
                >
                  <Library size={12} />
                  Change from Gallery
                </button>
                <div className="h-px bg-slate-100 flex-1" />
              </div>
            )}
          </div>

          {/* Upload progress */}
          {saving && audioFile && !galleryUrl && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <span>Uploading New File…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4a2c9c] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Title *</label>
            <input type="text" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. The Sonship Revelation" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Speaker</label>
            <input type="text" value={form.speaker} onChange={e => set('speaker', e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Category *</label>
            <select required value={form.category_id} onChange={e => set('category_id', e.target.value)} className={inputCls}>
              <option value="">Select a category…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <label className={labelCls}>Assign to Series (Optional)</label>
              <select value={form.series_id} onChange={e => set('series_id', e.target.value)} className={inputCls}>
                <option value="">No Series selected…</option>
                {seriesList.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Part Number</label>
              <input 
                type="number" 
                value={form.order_in_series} 
                onChange={e => set('order_in_series', e.target.value)} 
                placeholder="e.g. 1" 
                className={inputCls}
                disabled={!form.series_id} 
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Description *</label>
            <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief description of this teaching…" className={`${inputCls} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Duration (minutes)</label>
              <input type="number" value={form.duration_minutes} onChange={e => set('duration_minutes', e.target.value)} placeholder="45" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Price (USD, leave blank if free)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" className={inputCls} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="membership"
              checked={form.included_in_membership}
              onChange={e => set('included_in_membership', e.target.checked)}
              className="w-4 h-4 accent-[#4a2c9c] rounded border-slate-300"
            />
            <label htmlFor="membership" className="text-sm font-medium text-slate-600">Included in membership</label>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Link href="/admin/teachings" className="flex-1 flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#4a2c9c] transition-all shadow-md disabled:opacity-60"
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> {audioFile ? 'Uploading…' : 'Saving…'}</> : 'Update Teaching'}
            </button>
          </div>
        </form>
      )}

      <AudioGalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelect={handleGallerySelect}
      />
    </div>
  )
}
