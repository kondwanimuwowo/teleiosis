'use client'

import { useState } from 'react'
import { ClipboardList, Trash2 } from 'lucide-react'

type FilterType = 'all' | 'general' | 'event'

type Registration = {
  id: string
  name: string
  email: string
  phone: string | null
  type: string
  notes: string | null
  created_at: string
  events: { title: string }[] | null
}

export default function RegistrationsClient({ initial }: { initial: Registration[] }) {
  const [registrations, setRegistrations] = useState<Registration[]>(initial)
  const [tab, setTab] = useState<FilterType>('all')
  const [confirming, setConfirming] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const allCount     = registrations.length
  const generalCount = registrations.filter((r) => r.type === 'general').length
  const eventCount   = registrations.filter((r) => r.type === 'event').length

  const visible = tab === 'all'
    ? registrations
    : registrations.filter((r) => r.type === tab)

  const tabs: { key: FilterType; label: string; count: number }[] = [
    { key: 'all',     label: 'All',     count: allCount },
    { key: 'general', label: 'General', count: generalCount },
    { key: 'event',   label: 'Event',   count: eventCount },
  ]

  async function handleDelete(id: string) {
    const removed = registrations.find((r) => r.id === id)
    setDeleting(id)
    setRegistrations((prev) => prev.filter((r) => r.id !== id))
    setConfirming(null)

    const res = await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' })
    setDeleting(null)

    if (!res.ok && removed) {
      // Restore the row if the API failed
      setRegistrations((prev) => [removed, ...prev])
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2c0e68]/10 rounded-xl flex items-center justify-center">
          <ClipboardList size={20} className="text-[#2c0e68]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrations</h1>
          <p className="text-sm text-slate-500">{allCount} total registrations</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === key
                ? 'bg-white text-[#2c0e68] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              tab === key ? 'bg-[#2c0e68]/10 text-[#2c0e68]' : 'bg-slate-200 text-slate-500'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClipboardList size={40} className="text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No registrations yet</p>
            <p className="text-slate-400 text-sm mt-1">
              {tab !== 'all' ? `No ${tab} registrations found` : 'Registrations will appear here once people sign up'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Phone</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Event</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3.5 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((reg) => (
                  <tr key={reg.id} className={`hover:bg-slate-50 transition-colors ${deleting === reg.id ? 'opacity-40' : ''}`}>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">{reg.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      <a href={`mailto:${reg.email}`} className="hover:text-[#2c0e68] transition-colors">{reg.email}</a>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{reg.phone ?? '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                        reg.type === 'event' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {reg.type === 'event' ? 'Event' : 'General'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell max-w-[200px] truncate">
                      {reg.events?.[0]?.title ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap hidden sm:table-cell">
                      {new Date(reg.created_at).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {confirming === reg.id ? (
                        <span className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(reg.id)}
                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirming(null)}
                            className="text-xs text-slate-400 hover:text-slate-600"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirming(reg.id)}
                          aria-label="Delete registration"
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
