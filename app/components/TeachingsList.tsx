'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Pause, Music, Calendar, User } from 'lucide-react'
import { useTeachings, useTeachingCategories } from '@/lib/hooks'
import { useAudio } from '../context/AudioContext'
import { Spinner } from './Spinner'

export function TeachingsList({ search }: { search?: string } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const { teachings, loading, error } = useTeachings(selectedCategory, search)
  const { categories } = useTeachingCategories()
  const { currentTeaching, isPlaying, playTeaching, togglePlay } = useAudio()

  return (
    <>
      {/* ── FILTER TABS ──────────────────────────────────────────── */}
      <section className="bg-white shadow-sm sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-[#4a0e68] text-white shadow-lg shadow-[#4a0e68]/20'
                  : 'text-slate-400 hover:text-[#4a0e68] hover:bg-slate-50'
              }`}
            >
              All Teachings
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-[#4a0e68] text-white shadow-lg shadow-[#4a0e68]/20'
                    : 'text-slate-400 hover:text-[#4a0e68] hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ── TEACHINGS LIST ───────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="py-32 flex items-center justify-center">
              <Spinner size="md" />
            </div>
          )}
          
          {error && (
            <div className="py-20 text-center bg-red-50 rounded-3xl shadow-sm">
              <p className="text-red-600 text-sm font-semibold">Error loading teachings. Please refresh and try again.</p>
            </div>
          )}

          {!loading && teachings.length === 0 && (
            <div className="py-20 text-center bg-slate-50 rounded-3xl shadow-sm">
              <p className="text-slate-400 text-sm font-medium">No teachings found in this category.</p>
            </div>
          )}

          {!loading && teachings.length > 0 && (
            <div className="space-y-12">
              <div className="flex items-baseline justify-between pb-6">
                <p className="text-teleiosis-gold text-[10px] font-bold tracking-[0.4em] uppercase">
                  {teachings.length} Available teaching{teachings.length !== 1 ? 's' : ''}
                </p>
                <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'General Library'}</span>
              </div>

              <div className="space-y-3">
                {teachings.map((teaching, idx) => {
                  const isActive = currentTeaching?.id === teaching.id;
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={teaching.id} 
                      className="group"
                    >
                      <div className={`py-5 sm:py-7 flex flex-row items-center gap-4 sm:gap-6 transition-colors rounded-2xl px-4 -mx-4 ${isActive ? 'bg-[#4a0e68]/3' : 'group-hover:bg-slate-50/50'}`}>
                        {/* Index / Icon */}
                        <div className="flex-shrink-0 flex items-center gap-4">
                          <span className={`hidden sm:inline font-serif text-lg w-6 transition-colors duration-300 ${isActive ? 'text-teleiosis-gold font-bold' : 'text-slate-200'}`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${isActive ? 'bg-[#4a0e68] text-teleiosis-gold' : 'bg-slate-50 text-[#4a0e68] group-hover:bg-white group-hover:scale-110'}`}>
                            {isActive && isPlaying ? (
                              <div className="flex gap-0.5 items-end h-4 justify-center">
                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-teleiosis-gold rounded-full" />
                                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 bg-teleiosis-gold rounded-full" />
                                <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 bg-teleiosis-gold rounded-full" />
                              </div>
                            ) : (
                              <Music size={18} />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <User size={12} className="text-teleiosis-purple" />
                              {teaching.speaker}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-200 hidden sm:block" />
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <Calendar size={12} className="text-teleiosis-purple" />
                              {new Date(teaching.published_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <h3 className={`font-serif font-bold text-lg sm:text-xl leading-snug transition-colors ${isActive ? 'text-[#4a0e68]' : 'text-[#2c0e68] group-hover:text-[#4a0e68]'}`}>
                            {teaching.title}
                          </h3>
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-4">
                          <span className="hidden md:block text-[11px] font-bold text-slate-400 tabular-nums">
                            {teaching.duration_minutes}m
                          </span>
                          <button
                            type="button"
                            onClick={() => isActive ? togglePlay() : playTeaching(teaching)}
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? 'bg-[#4a0e68] text-white scale-110 shadow-lg shadow-[#4a0e68]/30'
                                : 'bg-white shadow-sm text-[#4a0e68] hover:shadow-md'
                            }`}
                          >
                            {isActive && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── COMMUNITY BANNER ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teleiosis-gold/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#2c0e68] mb-6">Join our community</h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Connect with a community of believers pursuing the fullness of Christ. Join our Saturday classes and walk in Kingdom authority.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#4a0e68] text-white text-sm font-bold hover:bg-[#2c0e68] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
