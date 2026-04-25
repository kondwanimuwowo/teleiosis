'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-xs">
        <button onClick={handleDelete} className="text-red-600 font-bold hover:underline">Delete</button>
        <button onClick={() => setConfirming(false)} className="text-slate-400 hover:underline">Cancel</button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Delete ${name}`}
      className="text-slate-400 hover:text-red-500 transition-colors"
    >
      <Trash2 size={15} />
    </button>
  )
}
