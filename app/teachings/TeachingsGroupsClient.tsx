'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronDown, ChevronUp, Search, Library, Layers } from 'lucide-react'

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

const GROUP_ACCENTS = [
  { bg: 'from-[#2c0e68] to-[#4a0e68]', border: 'border-[#4a0e68]/30', badge: 'bg-[#4a0e68]/20 text-white/80' },
  { bg: 'from-[#1a0840] to-[#2c0e68]', border: 'border-[#2c0e68]/30', badge: 'bg-[#2c0e68]/20 text-white/80' },
  { bg: 'from-[#0d0424] to-[#1a0840]', border: 'border-[#1a0840]/30', badge: 'bg-[#1a0840]/20 text-white/80' },
]

export function TeachingsGroupsClient({
  groups,
  onViewAll,
  search,
  onSearchChange,
}: {
  groups: ProgramGroup[]
  onViewAll: () => void
  search: string
  onSearchChange: (v: string) => void
}) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const [expandedStandalone, setExpandedStandalone] = useState<string | null>(null)

  const toggleGroup = (id: string) => {
    setExpandedGroup((prev) => (prev === id ? null : id))
    setExpandedStandalone(null)
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search teachings, series, speakers..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
            />
          </div>
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#2c0e68] text-[#2c0e68] text-sm font-bold hover:bg-[#2c0e68] hover:text-white transition-all whitespace-nowrap"
          >
            <Library size={15} />
            View All Teachings
          </button>
        </div>

        {/* Program group cards */}
        <div className="space-y-4">
          {groups.map((group, idx) => {
            const accent = GROUP_ACCENTS[idx % GROUP_ACCENTS.length]
            const isExpanded = expandedGroup === group.id
            const totalTeachings = group.series.reduce((s, r) => s + r.teaching_count, 0) + group.standalone_count
            const isEmpty = totalTeachings === 0

            return (
              <div key={group.id} className={`border ${accent.border} overflow-hidden`}>
                {/* Group header card */}
                <button
                  onClick={() => !isEmpty && toggleGroup(group.id)}
                  disabled={isEmpty}
                  className={`w-full text-left bg-gradient-to-r ${accent.bg} p-6 sm:p-8 flex items-center justify-between gap-4 transition-opacity ${isEmpty ? 'cursor-default' : 'hover:opacity-95'}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-teleiosis-gold text-xs font-bold tracking-[0.2em] uppercase">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {isEmpty && (
                        <span className="px-2.5 py-0.5 bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                          Coming Soon
                        </span>
                      )}
                      {!isEmpty && (
                        <span className={`px-2.5 py-0.5 ${accent.badge} text-[10px] font-bold uppercase tracking-widest`}>
                          {totalTeachings} Teaching{totalTeachings !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2">{group.name}</h3>
                    {group.description && (
                      <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{group.description}</p>
                    )}
                  </div>
                  {!isEmpty && (
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white/60">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-100 p-6 sm:p-8">
                    {/* Series grid */}
                    {group.series.length > 0 && (
                      <div className="mb-8">
                        <p className="text-[#2c0e68] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                          <Layers size={12} /> Series
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.series.map((s) => (
                            <Link
                              key={s.id}
                              href={`/teachings/series/${s.slug}`}
                              className="bg-white border border-slate-100 overflow-hidden group hover:border-[#4a0e68]/20 hover:shadow-md transition-all duration-300 flex flex-col"
                            >
                              <div className="aspect-[16/9] overflow-hidden bg-[#2c0e68] relative">
                                {s.thumbnail_url ? (
                                  <img src={s.thumbnail_url} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[#2c0e68] to-[#4a0e68] flex items-center justify-center">
                                    <BookOpen size={32} className="text-white/15" />
                                  </div>
                                )}
                                {s.teaching_count > 0 && (
                                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-teleiosis-gold text-[#2c0e68] text-[10px] font-bold uppercase tracking-widest">
                                    {s.teaching_count} Part{s.teaching_count !== 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                              <div className="p-4 flex-1 flex flex-col">
                                <h4 className="font-serif font-bold text-sm text-[#2c0e68] group-hover:text-[#4a0e68] transition-colors leading-snug mb-2 flex-1">{s.title}</h4>
                                <span className="text-xs font-bold text-teleiosis-gold uppercase tracking-widest">Listen →</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Standalone folder */}
                    {group.standalone_count > 0 && (
                      <div>
                        {group.series.length > 0 && (
                          <p className="text-[#2c0e68] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <BookOpen size={12} /> Standalone Teachings
                          </p>
                        )}
                        <button
                          onClick={() => setExpandedStandalone((prev) => (prev === group.id ? null : group.id))}
                          className="w-full text-left border-2 border-dashed border-slate-200 bg-white hover:border-[#4a0e68]/30 transition-colors p-5 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                              <BookOpen size={18} className="text-slate-300" />
                            </div>
                            <div>
                              <p className="font-serif font-bold text-sm text-[#2c0e68]">Standalone Teachings</p>
                              <p className="text-xs text-slate-400">{group.standalone_count} teaching{group.standalone_count !== 1 ? 's' : ''} not in a series</p>
                            </div>
                          </div>
                          {expandedStandalone === group.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                        </button>
                        {expandedStandalone === group.id && (
                          <div className="border border-dashed border-slate-200 border-t-0 bg-white px-5 pb-5 pt-3">
                            <p className="text-slate-400 text-xs text-center py-4">
                              Browse all standalone teachings in the full library.{' '}
                              <button onClick={onViewAll} className="text-teleiosis-gold font-bold hover:underline">View All Teachings →</button>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
