'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, FolderOpen, Image as ImageIcon } from 'lucide-react'

type TeachingSeries = {
  id: string
  title: string
  description: string
  thumbnail_url: string | null
  created_at: string
}

export default function SeriesAdminPage() {
  const [seriesList, setSeriesList] = useState<TeachingSeries[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/series')
      .then(r => r.json())
      .then(data => {
        setSeriesList(data)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this series? Teachings within it will just be unlinked.')) return
    
    await fetch(`/api/admin/series/${id}`, { method: 'DELETE' })
    setSeriesList(s => s.filter(x => x.id !== id))
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-bold text-3xl text-[#2c0e68] mb-1">Teaching Series</h1>
          <p className="text-slate-500 text-sm">Group your teachings into series with custom cover art</p>
        </div>
        <Link 
          href="/admin/series/new" 
          className="flex items-center gap-2 bg-teleiosis-gold text-[#2c0e68] px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Series
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl" />)}
        </div>
      ) : seriesList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500 flex flex-col items-center">
          <FolderOpen size={48} className="mb-4 text-slate-300" />
          <p className="font-medium text-slate-700">No series created yet</p>
          <p className="text-sm mt-1">Create a series to start grouping your teachings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seriesList.map((series) => (
            <div key={series.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group">
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                {series.thumbnail_url ? (
                  <img src={series.thumbnail_url} alt={series.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImageIcon size={32} className="text-slate-300" />
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-2">{series.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{series.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-400">
                    {new Date(series.created_at).toLocaleDateString()}
                  </span>
                  <button onClick={() => handleDelete(series.id)} className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
