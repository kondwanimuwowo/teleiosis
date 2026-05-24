'use client'


import { motion } from 'framer-motion'
import { Play, Pause, Clock } from 'lucide-react'
import type { Teaching } from '@/lib/supabase'
import { useAudio } from '../context/AudioContext'

interface Props {
  teachings: Teaching[]
}

export function SeriesTeachingPlayer({ teachings }: Props) {
  const { currentTeaching, isPlaying, playTeaching, togglePlay } = useAudio()

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
            const isActive = currentTeaching?.id === teaching.id
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
                          <span className="text-[10px] text-slate-400 line-clamp-1 max-w-xs sm:max-w-sm">
                            {teaching.description}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Play button */}
                  <button
                    type="button"
                    onClick={() => isActive ? togglePlay() : playTeaching(teaching)}
                    aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#4a0e68] text-white scale-110 shadow-lg shadow-[#4a0e68]/30'
                        : 'bg-white border border-slate-200 text-[#4a0e68] hover:border-[#4a0e68] hover:shadow-md'
                    }`}
                  >
                    {isActive && isPlaying
                      ? <Pause size={18} fill="currentColor" />
                      : <Play  size={18} fill="currentColor" className="ml-0.5" />
                    }
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
