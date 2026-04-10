'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, Users } from 'lucide-react'

type Member = { id: string; name: string; initials: string; title: string; location: string; bio: string; image_url: string | null }

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [form, setForm] = useState({ name: '', initials: '', title: '', location: '', bio: '' })

  function set(field: string, value: string) { setForm(f => ({ ...f, [field]: value })) }

  async function load() {
    const r = await fetch('/api/admin/team')
    const d = await r.json()
    setMembers(d.members ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // Auto-compute initials
  function handleNameChange(v: string) {
    setForm(f => ({
      ...f,
      name: v,
      initials: v.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    }))
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    if (image) formData.append('image', image)
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
    
    await fetch('/api/admin/team', {
      method: 'POST',
      body: formData,
    })
    setForm({ name: '', initials: '', title: '', location: '', bio: '' })
    setImage(null)
    setShowForm(false)
    setSaving(false)
    load()
  }

  async function deleteMember(id: string) {
    if (!confirm('Remove this co-labourer?')) return
    await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    load()
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all bg-white placeholder-slate-400"

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Co-Labourers</h1>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={addMember} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-serif font-semibold text-base text-[#2c0e68]">New Co-Labourer</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input type="text" required value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. Kondwani Muwowo" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Initials</label>
              <input type="text" value={form.initials} onChange={e => set('initials', e.target.value)} maxLength={2} placeholder="KM" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title / Role</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Armour Bearer" className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
              <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Lusaka, Zambia" className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Profile Photo (Optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4a2c9c]/10 file:text-[#4a2c9c] hover:file:bg-[#4a2c9c]/20"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bio</label>
              <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3} placeholder="Brief bio…" className={`${inputCls} resize-none`} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors disabled:opacity-60">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? 'Saving…' : 'Add Member'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
        ) : !members.length ? (
          <div className="p-12 text-center">
            <Users size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No co-labourers yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {members.map((m) => (
              <li key={m.id} className="flex items-start gap-4 px-6 py-5 hover:bg-slate-50/60 transition-colors group">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4a2c9c]/10 border border-teleiosis-gold/20 rounded-xl flex items-center justify-center overflow-hidden">
                  {m.image_url ? (
                    <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-serif font-bold text-sm text-[#4a2c9c]">{m.initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="font-medium text-[#2c0e68] text-sm">{m.name}</p>
                  <p className="text-teleiosis-gold text-xs font-semibold">{m.title}</p>
                  <p className="text-slate-400 text-xs">{m.location}</p>
                </div>
                <button
                  onClick={() => deleteMember(m.id)}
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
