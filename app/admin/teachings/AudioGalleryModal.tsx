'use client'

import { useState, useEffect } from 'react'
import { X, Search, Music, Loader2, Calendar } from 'lucide-react'

type R2File = {
  key: string
  name: string
  size: number
  lastModified: string
  url: string
}

interface AudioGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (file: { name: string; url: string }) => void
}

export function AudioGalleryModal({ isOpen, onClose, onSelect }: AudioGalleryModalProps) {
  const [files, setFiles] = useState<R2File[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetchFiles()
    }
  }, [isOpen])

  async function fetchFiles() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/teachings/gallery')
      const data = await res.json()
      setFiles(data.files || [])
    } catch (err) {
      console.error('Failed to fetch gallery files')
    } finally {
      setLoading(false)
    }
  }

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a0840]/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2c0e68]">Audio Gallery</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select a previously uploaded file from R2 bucket</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-all shadow-sm border border-transparent hover:border-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4a2c9c]/50 focus:ring-2 focus:ring-[#4a2c9c]/10 transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p className="text-sm">Fetching files...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <Music className="mb-2 opacity-20" size={48} />
              <p className="text-sm">{search ? 'No files match your search' : 'Gallery is empty'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredFiles.map((file) => (
                <button
                  key={file.key}
                  onClick={() => onSelect({ name: file.name, url: file.url })}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#4a2c9c]/5 border border-transparent hover:border-[#4a2c9c]/10 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#4a2c9c]/10 group-hover:text-[#4a2c9c] transition-colors">
                    <Music size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2c0e68] truncate mb-0.5 group-hover:text-[#4a2c9c] transition-colors">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      <span className="flex items-center gap-1">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(file.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Cloudflare R2 Storage Integration
          </p>
        </div>
      </div>
    </div>
  )
}
