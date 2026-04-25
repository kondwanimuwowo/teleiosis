'use client'

import { Music, Calendar, User, Play, Pause } from 'lucide-react'
import { useTeachings } from '@/lib/hooks'
import { useAudio } from '../context/AudioContext'
import { Spinner } from '../components/Spinner'

export function StandaloneTeachingsList({ programGroupId }: { programGroupId: string }) {
  const { teachings, loading, error } = useTeachings(undefined, undefined, { programGroupId, standaloneOnly: true })
  const { currentTeaching, isPlaying, playTeaching, togglePlay } = useAudio()

  if (loading) return <div className="py-8 flex justify-center"><Spinner size="sm" /></div>
  if (error) return <div className="py-8 text-center text-red-500 text-sm">Error loading teachings</div>
  if (teachings.length === 0) return <div className="py-8 text-center text-slate-400 text-sm">No standalone teachings found.</div>

  return (
    <div className="space-y-4 py-4">
      {teachings.map(teaching => {
        const isActive = currentTeaching?.id === teaching.id

        return (
          <div key={teaching.id} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row gap-4 group hover:shadow-md transition-all hover:-translate-y-0.5">
            {/* Thumbnail (Top Mobile / Left Desktop) */}
            <div className="w-full sm:w-32 aspect-video sm:aspect-square bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative">
              {teaching.thumbnail_url ? (
                <img src={teaching.thumbnail_url} alt={teaching.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-[#1a0840] flex items-center justify-center">
                  <Music size={24} className="text-white/20 group-hover:scale-110 transition-transform duration-300" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <User size={12} className="text-teleiosis-gold" />
                  {teaching.speaker || 'Unknown'}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-200 hidden sm:block" />
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} className="text-teleiosis-gold" />
                  {new Date(teaching.published_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h4 className={`font-serif font-bold text-base sm:text-lg leading-snug mb-3 transition-colors ${isActive ? 'text-[#4a0e68]' : 'text-[#2c0e68] group-hover:text-[#4a0e68]'}`}>
                {teaching.title}
              </h4>
              <div className="flex items-center gap-4 mt-auto">
                <button
                  onClick={() => isActive ? togglePlay() : playTeaching(teaching)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive 
                      ? 'bg-[#4a0e68] text-white shadow-md' 
                      : 'bg-slate-50 text-[#4a0e68] hover:bg-[#4a0e68] hover:text-white'
                  }`}
                >
                  {isActive && isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                  {isActive && isPlaying ? 'Playing' : 'Listen'}
                </button>
                {teaching.duration_minutes && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums">{teaching.duration_minutes} min</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
