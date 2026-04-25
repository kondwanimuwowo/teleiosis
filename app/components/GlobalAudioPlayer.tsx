'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, X, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'
import { useAudio } from '../context/AudioContext'
import Link from 'next/link'

export function GlobalAudioPlayer() {
  const { currentTeaching, isPlaying, progress, duration, volume, togglePlay, seek, setVolumeLevel, closePlayer } = useAudio()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHoveringVolume, setIsHoveringVolume] = useState(false)

  // Auto-expand on first play on desktop
  useEffect(() => {
    if (currentTeaching && window.innerWidth > 768) {
      setIsExpanded(true)
    }
  }, [currentTeaching])

  if (!currentTeaching) return null

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value))
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeLevel(Number(e.target.value))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-2 sm:px-6 pb-2 sm:pb-6 pointer-events-none"
      >
        <div className={`mx-auto max-w-4xl pointer-events-auto bg-[#1a0840]/85 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'rounded-2xl' : 'rounded-full max-w-sm'}`}>
          
          {/* Main Player Content */}
          <div className="flex items-center gap-3 sm:gap-6 p-2 sm:p-3">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teleiosis-gold flex items-center justify-center text-[#2c0e68] hover:bg-yellow-400 transition-colors shadow-lg"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>

            {/* Info & Progress */}
            <div className={`flex-1 min-w-0 flex flex-col justify-center ${isExpanded ? '' : 'cursor-pointer'}`} onClick={() => !isExpanded && setIsExpanded(true)}>
              <div className="flex items-center justify-between gap-4 mb-0.5">
                <h4 className="text-white text-sm font-semibold truncate leading-tight">
                  {currentTeaching.title}
                </h4>
                {isExpanded && (
                  <span className="text-teleiosis-gold/80 text-[10px] font-bold uppercase tracking-widest hidden sm:block truncate">
                    {currentTeaching.speaker}
                  </span>
                )}
              </div>
              
              {isExpanded ? (
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs tabular-nums w-8 text-right">{formatTime(progress)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-teleiosis-gold"
                    style={{
                      backgroundImage: `linear-gradient(to right, #d4af37 ${(progress / (duration || 1)) * 100}%, transparent 0)`
                    }}
                  />
                  <span className="text-white/40 text-xs tabular-nums w-8">{formatTime(duration)}</span>
                </div>
              ) : (
                <p className="text-white/50 text-xs truncate">
                  {currentTeaching.speaker} • {formatTime(progress)}
                </p>
              )}
            </div>

            {/* Controls (Expanded) */}
            {isExpanded && (
              <div className="hidden sm:flex items-center gap-4">
                <div 
                  className="flex items-center gap-2 relative group"
                  onMouseEnter={() => setIsHoveringVolume(true)}
                  onMouseLeave={() => setIsHoveringVolume(false)}
                >
                  <button onClick={() => setVolumeLevel(volume === 0 ? 1 : 0)} className="text-white/50 hover:text-white transition-colors">
                    {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <div className={`w-20 transition-opacity duration-200 ${isHoveringVolume ? 'opacity-100' : 'opacity-0'}`}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolume}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                      style={{ backgroundImage: `linear-gradient(to right, white ${volume * 100}%, transparent 0)` }}
                    />
                  </div>
                </div>
                <Link href={`/teachings`} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                  Library
                </Link>
              </div>
            )}

            {/* Window Controls */}
            <div className="flex items-center gap-1 sm:gap-2 border-l border-white/10 pl-2 sm:pl-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5 hidden sm:block"
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={closePlayer}
                className="p-2 text-white/40 hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

          </div>

          {/* Progress Bar (Mini mode) */}
          {!isExpanded && (
            <div className="h-0.5 bg-white/10 w-full absolute bottom-0 left-0">
              <div 
                className="h-full bg-teleiosis-gold" 
                style={{ width: `${(progress / (duration || 1)) * 100}%` }}
              />
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
