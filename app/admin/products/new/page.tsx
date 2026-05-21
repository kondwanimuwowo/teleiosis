'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ImageUploader } from '../../components/ImageUploader'

const CATEGORIES = ['book', 'merch', 'resource']

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'book', image_url: '', in_stock: true, sort_order: 0,
  })

  function set(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error); return }
      router.push('/admin/products')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#2c0e68] transition-colors mb-6">
        <ArrowLeft size={15} /> Back to Products
      </Link>
      <h1 className="font-serif font-bold text-2xl text-[#2c0e68] mb-8">New Product</h1>

      {error && <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 px-4 py-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)}
            className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Price (ZMW) *</label>
            <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)}
              className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] bg-white capitalize">
              {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
            className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] resize-none" />
        </div>

        <ImageUploader
          value={form.image_url}
          onUpload={(url) => set('image_url', url)}
          folder="products"
          label="Product Image"
        />

        <div className="flex items-center gap-3">
          <input type="checkbox" id="in_stock" checked={form.in_stock} onChange={(e) => set('in_stock', e.target.checked)}
            className="w-4 h-4 accent-[#2c0e68]" />
          <label htmlFor="in_stock" className="text-sm font-semibold text-[#2c0e68]">In Stock</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="px-6 py-3 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors disabled:opacity-50">
            {loading ? 'Creating…' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="px-6 py-3 border border-slate-200 text-sm text-slate-500 hover:text-[#2c0e68] transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
