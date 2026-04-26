'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Library } from 'lucide-react'
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
  // Raw search state (updates on every keystroke — drives the input value)
  const [search, setSearch] = useState('')
  // Debounced search (updates 350ms after typing stops — drives the Supabase query)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Persistent input ref so we can maintain focus across renders
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce: update debouncedSearch 350ms after last keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  // Only switch to flat view once debounced value has ≥ 2 chars
  const showFlat = viewAll || debouncedSearch.length >= 2

  function handleViewAll() {
    setViewAll(true)
    // Defer focus so the flat-view input is mounted
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleBack() {
    setViewAll(false)
    setSearch('')
    setDebouncedSearch('')
  }

  return (
    <div>
      {/* ── Persistent top bar (always rendered — never unmounts) ─── */}
      <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          {showFlat && (
            <button
              onClick={handleBack}
              className="text-xs font-bold text-slate-400 hover:text-[#2c0e68] transition-colors flex items-center gap-1 flex-shrink-0"
            >
              ← Programs
            </button>
          )}
          {showFlat && <span className="text-slate-200 flex-shrink-0">|</span>}

          {/* Search input lives here always — never unmounts on view switch */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search teachings, series, speakers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 pl-9 pr-4 py-2 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 rounded-xl"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setDebouncedSearch('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {!showFlat && (
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[#2c0e68] text-[#2c0e68] text-xs font-bold hover:bg-[#2c0e68] hover:text-white transition-all whitespace-nowrap rounded-xl"
            >
              <Library size={13} />
              View All
            </button>
          )}
        </div>
      </div>

      {/* ── Content panel ─────────────────────────────────────────── */}
      {showFlat ? (
        <TeachingsList search={debouncedSearch} />
      ) : (
        <TeachingsGroupsClient
          groups={groups}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  )
}
