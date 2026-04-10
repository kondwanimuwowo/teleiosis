'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, UploadCloud } from 'lucide-react'

export default function EditSeriesPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    async function loadSeries() {
      try {
        const res = await fetch(`/api/admin/series/${id}`)
        if (!res.ok) throw new Error('Failed to load series')
        const data = await res.json()
        setForm({
          title: data.title || '',
          description: data.description || '',
        })
        setThumbnailUrl(data.thumbnail_url)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadSeries()
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    if (image) formData.append('image', image)
    if (thumbnailUrl) formData.append('thumbnail_url', thumbnailUrl)

    try {
      const res = await fetch(`/api/admin/series/${id}`, {
        method: 'PATCH',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/admin/series')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p className="text-sm font-medium">Loading series details...</p>
    </div>
  )

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/series" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-[#2c0e68] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Series
        </Link>
        <h1 className="font-serif font-bold text-3xl text-[#2c0e68]">Edit Series</h1>
        <p className="text-slate-500 text-sm mt-1">Update your teaching collection</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Series Title</label>
            <input 
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teleiosis-gold focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Description</label>
            <textarea 
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teleiosis-gold focus:bg-white transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Cover Art</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="p-8 sm:p-12 text-center pointer-events-none">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-[#4a0e68]" size={24} />
                </div>
                <p className="text-sm font-semibold text-[#2c0e68] mb-1">
                  {image ? image.name : thumbnailUrl ? "Change Series Cover Art" : "Select Series Cover Art"}
                </p>
                <p className="text-xs text-slate-400">
                   {image ? `${(image.size / 1024 / 1024).toFixed(2)} MB` : thumbnailUrl ? "Current cover art exists" : "Recommended: Square ratio, 1080x1080px"}
                </p>
              </div>
            </div>
            {thumbnailUrl && !image && (
              <div className="mt-4 text-center">
                <img src={thumbnailUrl} alt="Current thumbnail" className="h-32 mx-auto rounded-xl object-cover shadow-sm" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#2c0e68] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#4a2c9c] transition-all disabled:opacity-60 shadow-md hover:shadow-lg"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Update Series'}
          </button>
        </div>
      </form>
    </div>
  )
}
