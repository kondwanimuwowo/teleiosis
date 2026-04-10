'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, UploadCloud } from 'lucide-react'

export default function NewSeriesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [image, setImage] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    if (image) formData.append('image', image)

    try {
      const res = await fetch('/api/admin/series', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/admin/series')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/series" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-[#2c0e68] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Series
        </Link>
        <h1 className="font-serif font-bold text-3xl text-[#2c0e68]">Create Series</h1>
        <p className="text-slate-500 text-sm mt-1">Group related teachings into a dedicated collection</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Series Title</label>
            <input 
              required
              name="title"
              type="text" 
              placeholder="e.g. The Manifested Sons"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teleiosis-gold focus:bg-white transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Description</label>
            <textarea 
              name="description"
              rows={3}
              placeholder="What is this series about?"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-teleiosis-gold focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Cover Art Upload */}
          <div>
            <label className="block text-xs font-semibold text-[#2c0e68] uppercase tracking-wider mb-2">Cover Art (Optional but recommended)</label>
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
                  {image ? image.name : "Select Series Cover Art"}
                </p>
                <p className="text-xs text-slate-400">
                  {image ? `${(image.size / 1024 / 1024).toFixed(2)} MB` : "Recommended: Square ratio, 1080x1080px"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#2c0e68] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#4a0e68] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Publish Series'}
          </button>
        </div>
      </form>
    </div>
  )
}
