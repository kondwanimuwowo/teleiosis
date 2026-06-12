'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

type Subscriber = { id: string; email: string; subscribed_at: string }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function SubscribersClient({ initial }: { initial: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initial)
  const [confirming, setConfirming] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const now = new Date()
  const thisMonthCount = subscribers.filter((s) => {
    const d = new Date(s.subscribed_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  async function handleDelete(id: string) {
    const removed = subscribers.find((s) => s.id === id)
    setDeleting(id)
    setSubscribers((prev) => prev.filter((s) => s.id !== id))
    setConfirming(null)

    const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' })
    setDeleting(null)

    if (!res.ok && removed) {
      setSubscribers((prev) => [removed, ...prev])
    }
  }

  return (
    <>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-slate-100 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Subscribers</p>
          <p className="font-serif font-bold text-2xl text-[#2c0e68]">{subscribers.length}</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Joined This Month</p>
          <p className="font-serif font-bold text-2xl text-[#2c0e68]">{thisMonthCount}</p>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 text-slate-400 text-sm">
          No subscribers yet. Once someone signs up for the newsletter, they will appear here.
        </div>
      ) : (
        <div className="border border-slate-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Date Joined</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscribers.map((s, i) => (
                <tr key={s.id} className={`hover:bg-slate-50 transition-colors ${deleting === s.id ? 'opacity-40' : ''}`}>
                  <td className="px-4 py-3 text-slate-400 text-xs w-12">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#2c0e68]">{s.email}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.subscribed_at)}</td>
                  <td className="px-4 py-3 text-right">
                    {confirming === s.id ? (
                      <span className="flex items-center justify-end gap-2">
                        <button onClick={() => handleDelete(s.id)} className="text-xs font-semibold text-red-600 hover:text-red-700">
                          Confirm
                        </button>
                        <button onClick={() => setConfirming(null)} className="text-xs text-slate-400 hover:text-slate-600">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirming(s.id)}
                        aria-label="Remove subscriber"
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
    </>
  )
}
