'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTeachings, useTeachingCategories } from '@/lib/hooks'
import { Spinner } from './Spinner'

export function TeachingsList() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [activeTeachingId, setActiveTeachingId] = useState<string | null>(null)
  const { teachings, loading, error } = useTeachings(selectedCategory)
  const { categories } = useTeachingCategories()

  return (
    <>
      {/* ── FILTER TABS ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`flex-shrink-0 px-4 py-2 min-h-[40px] rounded-full text-sm font-semibold transition-colors ${
                !selectedCategory
                  ? 'bg-[#4a0e68] text-white'
                  : 'text-slate-500 hover:text-[#4a0e68] hover:bg-[#4a0e68]/8'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 min-h-[40px] rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#4a0e68] text-white'
                    : 'text-slate-500 hover:text-[#4a0e68] hover:bg-[#4a0e68]/8'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ── TEACHINGS LIST ───────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="py-24 flex items-center justify-center">
              <Spinner size="md" />
            </div>
          )}
          {error && (
            <div className="py-16 text-center">
              <p className="text-red-500 text-sm">Error loading teachings. Please try again.</p>
            </div>
          )}
          {!loading && teachings.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-400 text-sm">No teachings found in this category.</p>
            </div>
          )}
          {!loading && teachings.length > 0 && (
            <div>
              <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                {teachings.length} Teaching{teachings.length !== 1 ? 's' : ''}
              </p>
              <ul className="divide-y divide-slate-100">
                {teachings.map((teaching, idx) => (
                  <li key={teaching.id} className="py-5">
                    <div className="flex items-start gap-4">
                      {/* Index */}
                      <span className="flex-shrink-0 w-8 text-slate-300 text-sm font-mono pt-0.5 text-right">{idx + 1}</span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#2c0e68] mb-0.5 leading-snug">{teaching.title}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">
                          {teaching.speaker} · {teaching.duration_minutes} min · {new Date(teaching.published_date).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Play button */}
                      <button
                        type="button"
                        onClick={() => setActiveTeachingId(activeTeachingId === teaching.id ? null : teaching.id)}
                        className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border-2 border-[#4a0e68] text-[#4a0e68] hover:bg-[#4a0e68] hover:text-white transition-colors"
                        aria-label={activeTeachingId === teaching.id ? 'Close player' : `Play ${teaching.title}`}
                      >
                        {activeTeachingId === teaching.id ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                        )}
                      </button>
                    </div>

                    {/* Audio player */}
                    {activeTeachingId === teaching.id && (
                      <div className="mt-4 ml-12 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <audio controls src={teaching.audio_url} className="w-full">
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── COMMUNITY BANNER ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Go Deeper</p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2c0e68] mb-5">Join Our Community</h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Connect with a community of believers pursuing the fullness of Christ. Attend Saturday classes, access teachings, and grow together in Kingdom authority.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 min-h-[44px] bg-[#4a0e68] text-white text-sm font-bold hover:bg-[#2c0e68] transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
