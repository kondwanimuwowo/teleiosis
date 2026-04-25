'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const CATEGORIES = ['book', 'merch', 'resource']

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'book', image_url: '', in_stock: true, sort_order: 0,
  })

  useEffect(() => {
    fetch(`/api/admin/products`)
      .then((r) => r.json())
      .then((products) => {
        const p = products.find((x: { id: string }) => x.id === id)
        if (p) setForm({ name: p.name, description: p.description ?? '', price: String(p.price), category: p.category, image_url: p.image_url ?? '', in_stock: p.in_stock, sort_order: p.sort_order })
      })
      .finally(() => setFetching(false))
  }, [id])

  function set(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
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

  if (fetching) return <div className="p-8 text-slate-400 text-sm">Loading…</div>

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#2c0e68] transition-colors mb-6">
        <ArrowLeft size={15} /> Back to Products
      </Link>
      <h1 className="font-serif font-bold text-2xl text-[#2c0e68] mb-8">Edit Product</h1>

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

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Image URL</label>
          <input type="url" value={form.image_url} onChange={(e) => set('image_url', e.target.value)}
            placeholder="https://..."
            className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="in_stock" checked={form.in_stock} onChange={(e) => set('in_stock', e.target.checked)}
            className="w-4 h-4 accent-[#2c0e68]" />
          <label htmlFor="in_stock" className="text-sm font-semibold text-[#2c0e68]">In Stock</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="px-6 py-3 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors disabled:opacity-50">
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/products" className="px-6 py-3 border border-slate-200 text-sm text-slate-500 hover:text-[#2c0e68] transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
