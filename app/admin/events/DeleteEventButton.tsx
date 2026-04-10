'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

export function DeleteEventButton({ id }: { id: string }) {
  const router  = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this event?')) return
    setBusy(true)
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    router.refresh()
    setBusy(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      {busy ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  )
}
