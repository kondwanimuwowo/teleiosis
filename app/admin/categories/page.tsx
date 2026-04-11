'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, Tag } from 'lucide-react'

type Category = { id: string; name: string; slug: string }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState(true)
  const [name, setName]             = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState<string | null>(null)

  async function load() {
    const r = await fetch('/api/admin/categories')
    const d = await r.json()
    setCategories(d.categories ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    setError(null)
    const r = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const d = await r.json()
    if (!r.ok) {
      setError(d.error || 'Failed to add category')
    } else {
      setName('')
      load()
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Remove "${catName}"? Teachings assigned to this category will lose their category.`)) return
    await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  const inputCls = "flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all"

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Teaching Categories</h1>
        <p className="text-slate-500 text-sm mt-1">Categories appear in the teaching upload form and the public teachings page.</p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-serif font-semibold text-base text-[#2c0e68] mb-4">Add Category</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError(null) }}
            placeholder="e.g. The God Frequency"
            className={inputCls}
          />
          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-50"
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </div>
        {error && (
          <p className="mt-3 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">{error}</p>
        )}
        <p className="mt-2 text-[11px] text-slate-400">The slug is auto-generated from the name.</p>
      </form>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
        ) : !categories.length ? (
          <div className="p-12 text-center">
            <Tag size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No categories yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[#4a2c9c]/8 flex items-center justify-center flex-shrink-0">
                  <Tag size={14} className="text-[#4a2c9c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2c0e68]">{c.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{c.slug}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
