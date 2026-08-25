'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, MailOpen, Check } from 'lucide-react'

type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

type Tab = 'all' | 'unread' | 'read'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function MessagesClient({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initial)
  const [tab, setTab] = useState<Tab>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [marking, setMarking] = useState<string | null>(null)

  const unreadCount = messages.filter((m) => !m.read).length

  const visible = messages.filter((m) => {
    if (tab === 'unread') return !m.read
    if (tab === 'read') return m.read
    return true
  })

  async function markRead(id: string) {
    setMarking(id)
    await fetch(`/api/admin/messages/${id}`, { method: 'PATCH' })
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
    setMarking(null)
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' },
  ]

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-slate-100">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === id
                ? 'border-[#2c0e68] text-[#2c0e68]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {label}
            {id === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 inline-block bg-[#d4af37] text-[#2c0e68] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-slate-50 text-slate-400 text-sm">
          {tab === 'unread' ? 'No unread messages.' : tab === 'read' ? 'No read messages yet.' : 'No messages yet.'}
        </div>
      ) : (
        <div className="shadow-sm divide-y divide-slate-100">
          {visible.map((m) => (
            <div key={m.id} className={`${!m.read ? 'bg-white' : 'bg-slate-50/50'}`}>
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                className="w-full text-left px-4 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="flex-shrink-0 text-slate-300">
                  {m.read ? <MailOpen size={15} /> : <Mail size={15} className="text-[#d4af37]" />}
                </span>
                <span className={`flex-1 min-w-0 font-medium text-sm ${m.read ? 'text-slate-500' : 'text-[#2c0e68]'}`}>
                  {m.name}
                </span>
                <span className="text-slate-400 text-xs truncate max-w-[160px] hidden sm:block">{m.email}</span>
                <span className="text-slate-500 text-xs truncate max-w-[200px] hidden md:block">
                  {m.subject ?? 'General inquiry'}
                </span>
                <span className="text-slate-400 text-xs whitespace-nowrap ml-auto">{formatDate(m.created_at)}</span>
                <span className="text-slate-300 ml-2 flex-shrink-0">
                  {expanded === m.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {/* Expanded message */}
              {expanded === m.id && (
                <div className="px-6 pb-5 pt-1 border-t border-slate-100 bg-white">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400 mb-3">
                    <span><span className="font-semibold text-slate-500">From:</span> {m.name} &lt;{m.email}&gt;</span>
                    <span><span className="font-semibold text-slate-500">Subject:</span> {m.subject ?? 'General inquiry'}</span>
                    <span><span className="font-semibold text-slate-500">Sent:</span> {formatDate(m.created_at)}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap border-l-2 border-slate-200 pl-4">
                    {m.message}
                  </p>
                  {!m.read && (
                    <button
                      onClick={() => markRead(m.id)}
                      disabled={marking === m.id}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2c0e68] hover:text-[#4a2c9c] transition-colors disabled:opacity-50"
                    >
                      {marking === m.id ? 'Marking...' : <><Check size={13} /> Mark as read</>}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
