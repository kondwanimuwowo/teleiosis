'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function DeleteRegistrationButton({ id }: { id: string }) {
  const [state, setState] = useState<'idle' | 'confirm' | 'deleting'>('idle')

  async function handleDelete() {
    setState('deleting')
    await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' })
    window.location.reload()
  }

  if (state === 'confirm') {
    return (
      <span className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          className="text-xs font-semibold text-red-600 hover:text-red-700"
        >
          Confirm
        </button>
        <button
          onClick={() => setState('idle')}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          Cancel
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setState('confirm')}
      disabled={state === 'deleting'}
      aria-label="Delete registration"
      className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-40"
    >
      <Trash2 size={14} />
    </button>
  )
}
