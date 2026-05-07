'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Check, X, Pencil } from 'lucide-react'

type Stat = { id: string; key: string; value: string; label: string; sort_order: number }

export function SiteStatsEditor({ initialStats }: { initialStats: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(initialStats)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [editLabel, setEditLabel] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newValue, setNewValue] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function saveEdit(id: string) {
    setSaving(true)
    const res = await fetch(`/api/admin/settings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: editValue, label: editLabel }),
    })
    if (res.ok) {
      setStats((s) => s.map((stat) => stat.id === id ? { ...stat, value: editValue, label: editLabel } : stat))
      setEditingId(null)
    }
    setSaving(false)
    router.refresh()
  }

  async function deleteStat(id: string) {
    await fetch(`/api/admin/settings/${id}`, { method: 'DELETE' })
    setStats((s) => s.filter((stat) => stat.id !== id))
    router.refresh()
  }

  async function addStat() {
    if (!newValue || !newLabel) return
    setSaving(true)
    const key = newLabel.toLowerCase().replace(/\s+/g, '_')
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: newValue, label: newLabel, sort_order: stats.length }),
    })
    if (res.ok) {
      const data = await res.json()
      setStats((s) => [...s, data])
      setAddingNew(false)
      setNewValue('')
      setNewLabel('')
    }
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-3">
      {stats.map((stat) => (
        <div key={stat.id} className="border border-slate-100 bg-white p-4 flex items-center gap-4">
          {editingId === stat.id ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Value (e.g. 500+)"
                className="w-24 border border-slate-200 px-3 py-1.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]"
              />
              <input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder="Label (e.g. Lives Transformed)"
                className="flex-1 border border-slate-200 px-3 py-1.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]"
              />
              <button onClick={() => saveEdit(stat.id)} disabled={saving} className="text-green-600 hover:text-green-700 p-1 transition-colors">
                <Check size={16} />
              </button>
              <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600 p-1 transition-colors">
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <span className="font-serif font-bold text-xl text-teleiosis-gold w-16 flex-shrink-0">{stat.value}</span>
              <span className="flex-1 text-sm text-[#2c0e68] font-semibold">{stat.label}</span>
              <button
                onClick={() => { setEditingId(stat.id); setEditValue(stat.value); setEditLabel(stat.label) }}
                className="text-slate-400 hover:text-[#2c0e68] transition-colors p-1"
              >
                <Pencil size={14} />
              </button>
              <button onClick={() => deleteStat(stat.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      ))}

      {/* Add new */}
      {addingNew ? (
        <div className="border border-dashed border-teleiosis-gold/40 bg-teleiosis-gold/5 p-4 flex items-center gap-4">
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value (e.g. 50+)"
            className="w-24 border border-slate-200 bg-white px-3 py-1.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]"
          />
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label (e.g. Nations Reached)"
            className="flex-1 border border-slate-200 bg-white px-3 py-1.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68]"
          />
          <button onClick={addStat} disabled={saving || !newValue || !newLabel} className="text-green-600 hover:text-green-700 p-1 transition-colors disabled:opacity-40">
            <Check size={16} />
          </button>
          <button onClick={() => setAddingNew(false)} className="text-slate-400 hover:text-slate-600 p-1 transition-colors">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingNew(true)}
          className="w-full border border-dashed border-slate-200 py-3 text-sm text-slate-400 hover:text-[#2c0e68] hover:border-[#2c0e68] transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={15} /> Add Stat
        </button>
      )}
    </div>
  )
}
