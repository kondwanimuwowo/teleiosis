'use client'

import { useRef, useState } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  value?: string
  onUpload: (publicUrl: string) => void
  folder?: string
  label?: string
}

export function ImageUploader({ value, onUpload, folder = 'products', label = 'Product Image' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP, etc.)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10 MB')
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)

    try {
      // Get presigned URL
      const res = await fetch('/api/admin/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, folder }),
      })
      if (!res.ok) throw new Error('Failed to get upload URL')
      const { signedUrl, publicUrl } = await res.json()

      // Upload via XHR for progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve()
          else reject(new Error(`Upload failed: ${xhr.status}`))
        }
        xhr.onerror = () => reject(new Error('Upload failed'))
        xhr.open('PUT', signedUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

      onUpload(publicUrl)
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          {/* Thumbnail */}
          <div className="relative w-full aspect-video max-w-sm border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Product image" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-white text-sm font-bold text-[#2c0e68] rounded-lg shadow"
              >
                Replace
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpload('')}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <X size={12} /> Remove image
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-[#2c0e68]/40 transition-colors cursor-pointer"
          onClick={() => !uploading && inputRef.current?.click()}
        >
          {uploading ? (
            <div className="space-y-3">
              <Loader2 size={28} className="animate-spin text-[#2c0e68] mx-auto" />
              <p className="text-sm text-slate-500">Uploading… {progress}%</p>
              <div className="w-full max-w-xs mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2c0e68] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                <ImageIcon size={22} className="text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">Drop an image here or click to browse</p>
              <p className="text-xs text-slate-400">JPG, PNG, WebP · Max 10 MB</p>
            </div>
          )}
        </div>
      )}

      {uploading && value && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Uploading…</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2c0e68] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 flex items-center gap-1.5"><Upload size={11} />{error}</p>}
    </div>
  )
}
