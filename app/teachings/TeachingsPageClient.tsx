'use client'

import { useState } from 'react'
import { TeachingsGroupsClient } from './TeachingsGroupsClient'
import { TeachingsList } from '../components/TeachingsList'

type Series = {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  teaching_count: number
}

type ProgramGroup = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  series: Series[]
  standalone_count: number
}

export function TeachingsPageClient({ groups }: { groups: ProgramGroup[] }) {
  const [viewAll, setViewAll] = useState(false)
  const [search, setSearch] = useState('')

  const showFlat = viewAll || search.length > 0

  return showFlat ? (
    <div>
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <button
            onClick={() => { setViewAll(false); setSearch('') }}
            className="text-xs font-bold text-slate-400 hover:text-[#2c0e68] transition-colors flex items-center gap-1"
          >
            ← Back to Programs
          </button>
          <span className="text-slate-200">|</span>
          <input
            type="text"
            placeholder="Search teachings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-sm border border-slate-200 px-3 py-1.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
          />
        </div>
      </div>
      <TeachingsList search={search} />
    </div>
  ) : (
    <TeachingsGroupsClient
      groups={groups}
      onViewAll={() => setViewAll(true)}
      search={search}
      onSearchChange={(v) => setSearch(v)}
    />
  )
}
