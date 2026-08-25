'use client'

import { useState } from 'react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageIcon, CheckCircle } from 'lucide-react'

interface Props {
  groupId: string
  initialImageUrl: string | null
}

export function ProgramGroupImageEditor({ groupId, initialImageUrl }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(url: string) {
    setImageUrl(url || null)
    setSaved(false)
    setError('')
    setSaving(true)
    try {
      const res = await fetch('/api/admin/program-groups', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: groupId, image_url: url || null }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-4 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={13} className="text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Group image</span>
        {saving && <span className="text-[10px] text-slate-400 ml-auto">Saving...</span>}
        {saved && (
          <span className="text-[10px] text-green-600 font-bold ml-auto flex items-center gap-1">
            <CheckCircle size={11} /> Saved
          </span>
        )}
      </div>
      <ImageUploader
        value={imageUrl ?? undefined}
        onUpload={handleUpload}
        folder="program-groups"
        label=""
      />
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  )
}
