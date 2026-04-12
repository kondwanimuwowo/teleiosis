'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Clock } from 'lucide-react'
import type { Teaching } from '@/lib/supabase'

interface Props {
  teachings: Teaching[]
}

export function SeriesTeachingPlayer({ teachings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const totalMinutes = teachings.reduce((acc, t) => acc + (t.duration_minutes || 0), 0)
  const totalHours   = Math.floor(totalMinutes / 60)
  const remMinutes   = totalMinutes % 60

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-6 border-b border-slate-100">
          <div>
            <p className="text-teleiosis-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Teachings</p>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68]">
              {teachings.length} Part{teachings.length !== 1 ? 's' : ''} in this Series
            </h2>
          </div>
          {totalMinutes > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Clock size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">
                {totalHours > 0 ? `${totalHours}h ` : ''}{remMinutes > 0 ? `${remMinutes}m` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Track list */}
        <div className="divide-y divide-slate-100">
          {teachings.map((teaching, idx) => {
            const isActive = activeId === teaching.id
            const partNum  = teaching.order_in_series ?? idx + 1

            return (
              <motion.div
                key={teaching.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                {/* Row */}
                <div className={`flex items-center gap-5 sm:gap-8 py-7 group transition-colors duration-200 ${isActive ? 'bg-[#4a0e68]/3' : ''}`}>

                  {/* Part number */}
                  <span className={`font-serif font-bold text-3xl sm:text-4xl w-10 flex-shrink-0 tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-teleiosis-gold' : 'text-slate-100 group-hover:text-slate-200'
                  }`}>
                    {String(partNum).padStart(2, '0')}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-serif font-bold text-base sm:text-lg leading-snug transition-colors duration-200 ${
                      isActive ? 'text-[#4a0e68]' : 'text-[#2c0e68] group-hover:text-[#4a0e68]'
                    }`}>
                      {teaching.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      {teaching.duration_minutes && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {teaching.duration_minutes} min
                        </span>
                      )}
                      {teaching.description && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] text-slate-400 line-clamp-1 hidden sm:block max-w-sm">
                            {teaching.description}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Play button */}
                  <button
                    type="button"
                    onClick={() => setActiveId(isActive ? null : teaching.id)}
                    aria-label={isActive ? 'Pause' : 'Play'}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#4a0e68] text-white scale-110 shadow-lg shadow-[#4a0e68]/30'
                        : 'bg-white border border-slate-200 text-[#4a0e68] hover:border-[#4a0e68] hover:shadow-md'
                    }`}
                  >
                    {isActive
                      ? <Pause size={18} fill="currentColor" />
                      : <Play  size={18} fill="currentColor" className="ml-0.5" />
                    }
                  </button>
                </div>

                {/* Inline player */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-[4.5rem]">
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-teleiosis-gold/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                          <audio
                            controls
                            autoPlay
                            src={teaching.audio_url}
                            className="w-full custom-audio-player h-10"
                          >
                            Your browser does not support the audio element.
                          </audio>
                          <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Now Playing — {teaching.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
