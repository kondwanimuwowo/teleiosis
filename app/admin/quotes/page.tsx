'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, Quote } from 'lucide-react'

export const dynamic = 'force-dynamic'

type QuoteRow = { id: string; text: string; scripture: string; is_active: boolean }

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText]         = useState('')
  const [scripture, setScripture] = useState('')
  const [adding, setAdding]     = useState(false)

  async function load() {
    const r = await fetch('/api/admin/quotes')
    const d = await r.json()
    setQuotes(d.quotes ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function addQuote(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setAdding(true)
    await fetch('/api/admin/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, scripture }),
    })
    setText('')
    setScripture('')
    setAdding(false)
    load()
  }

  async function deleteQuote(id: string) {
    if (!confirm('Remove this quote?')) return
    await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Quotes</h1>
        <p className="text-slate-500 text-sm mt-1">These rotate in the Quote Band on the homepage.</p>
      </div>

      {/* Add new */}
      <form onSubmit={addQuote} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-4">
        <h2 className="font-serif font-semibold text-base text-[#2c0e68]">Add New Quote</h2>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          required
          placeholder="Quote text…"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all resize-none"
        />
        <div className="flex gap-3">
          <input
            type="text"
            value={scripture}
            onChange={e => setScripture(e.target.value)}
            placeholder="Scripture ref (e.g. Phil 4:13)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 transition-all"
          />
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-60"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
        ) : !quotes.length ? (
          <div className="p-12 text-center">
            <Quote size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No quotes yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {quotes.map((q) => (
              <li key={q.id} className="flex items-start gap-4 px-6 py-5 hover:bg-slate-50/60 transition-colors group">
                <Quote size={14} className="flex-shrink-0 mt-1 text-teleiosis-gold" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm leading-relaxed">{q.text}</p>
                  {q.scripture && <p className="text-xs text-teleiosis-gold font-semibold mt-1 tracking-wider">{q.scripture}</p>}
                </div>
                <button
                  onClick={() => deleteQuote(q.id)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
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
