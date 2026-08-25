'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Plus, Loader2, Trash2, UploadCloud } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = ['Devotional', 'Teaching', 'News', 'Testimony']

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    category: 'Devotional',
    excerpt: '',
    scripture: '',
    scripture_text: '',
    read_time: '3 min read',
    slug: '',
  })
  const [paragraphs, setParagraphs] = useState<string[]>([])

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/admin/blog/${id}`)
        if (!res.ok) throw new Error('Failed to load post')
        const data = await res.json()
        
        setForm({
          title: data.title || '',
          category: data.category || 'Devotional',
          excerpt: data.excerpt || '',
          scripture: data.scripture || '',
          scripture_text: data.scripture_text || '',
          read_time: data.read_time || '3 min read',
          slug: data.slug || '',
        })
        setImageUrl(data.image_url)
        setParagraphs(Array.isArray(data.body) ? data.body : [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }
  function setPara(i: number, v: string) {
    setParagraphs(p => { const n = [...p]; n[i] = v; return n })
  }
  function addParagraph() { setParagraphs(p => [...p, '']) }
  function removeParagraph(i: number) { setParagraphs(p => p.filter((_, idx) => idx !== i)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const formData = new FormData()
    if (image) formData.append('image', image)
    if (imageUrl) formData.append('image_url', imageUrl)
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
    
    formData.append('body', JSON.stringify(paragraphs.filter(p => p.trim())))

    const res = await fetch(`/api/admin/blog/${id}`, {
      method: 'PATCH',
      body: formData,
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Something went wrong')
      setSaving(false)
    } else {
      router.push('/admin/blog')
      router.refresh()
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all bg-white placeholder-slate-400"
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p className="text-sm font-medium">Loading post details...</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-0.5">Blog</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Edit post</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
          <h2 className="font-serif font-semibold text-base text-[#2c0e68] pb-2">Post details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Title *</label>
              <input type="text" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. That Which Is Perfect Is Come" className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Slug *</label>
              <input type="text" required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="that-which-is-perfect-is-come" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Read time</label>
              <input type="text" value={form.read_time} onChange={e => set('read_time', e.target.value)} placeholder="3 min read" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Excerpt *</label>
            <textarea required value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} placeholder="A 1-2 sentence summary of the post..." className={`${inputCls} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Scripture reference</label>
              <input type="text" value={form.scripture} onChange={e => set('scripture', e.target.value)} placeholder="e.g. 1 Cor 13:10" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cover image (optional)</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group flex items-center h-[46px] overflow-hidden">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="px-4 flex items-center gap-2 w-full">
                  <UploadCloud className="text-[#4a2c9c]" size={16} />
                  <span className="text-sm font-medium text-slate-500 truncate">
                    {image ? image.name : imageUrl ? "Change Cover Art" : "Upload Cover Art"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Full scripture text</label>
            <input type="text" value={form.scripture_text} onChange={e => set('scripture_text', e.target.value)} placeholder='"But when that which is perfect is come..." - 1 Cor 13:10' className={inputCls} />
          </div>
        </div>

        {/* Body paragraphs */}
        <div className="bg-white rounded-2xl shadow-sm p-7 space-y-4">
          <h2 className="font-serif font-semibold text-base text-[#2c0e68] pb-2">Body content</h2>
          <p className="text-xs text-slate-400">Write each paragraph separately.</p>

          {paragraphs.map((para, i) => (
            <div key={i} className="relative">
              <label className={labelCls}>Paragraph {i + 1}</label>
              <div className="relative">
                <textarea
                  value={para}
                  onChange={e => setPara(i, e.target.value)}
                  rows={4}
                  placeholder={`Paragraph ${i + 1}...`}
                  className={`${inputCls} resize-none pr-10`}
                />
                {paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(i)}
                    className="absolute top-2 right-2 p-1 rounded-lg text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addParagraph}
            className="flex items-center gap-2 text-sm text-[#4a2c9c] hover:text-[#2c0e68] transition-colors font-medium"
          >
            <Plus size={14} /> Add paragraph
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3">
          <Link href="/admin/blog" className="flex-1 flex items-center justify-center px-5 py-2.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Saving...' : 'Update post'}
          </button>
        </div>
      </form>
    </div>
  )
}
