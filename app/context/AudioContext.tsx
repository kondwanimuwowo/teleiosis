'use client'

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import type { Teaching } from '@/lib/supabase'

interface AudioContextType {
  currentTeaching: Teaching | null
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  playTeaching: (teaching: Teaching) => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolumeLevel: (level: number) => void
  closePlayer: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTeaching, setCurrentTeaching] = useState<Teaching | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    const audio = audioRef.current

    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  const playTeaching = (teaching: Teaching) => {
    if (!audioRef.current) return

    // If clicking the same teaching that is currently loaded
    if (currentTeaching?.id === teaching.id) {
      togglePlay()
      return
    }

    // Load new teaching
    audioRef.current.src = teaching.audio_url
    audioRef.current.load()
    setCurrentTeaching(teaching)
    setIsPlaying(true)
    audioRef.current.play().catch(console.error)
  }

  const togglePlay = () => {
    if (!audioRef.current || !currentTeaching) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
    }
  }

  const seek = (time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setProgress(time)
  }

  const setVolumeLevel = (level: number) => {
    if (!audioRef.current) return
    const newVol = Math.max(0, Math.min(1, level))
    audioRef.current.volume = newVol
    setVolume(newVol)
  }

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
    setCurrentTeaching(null)
  }

  return (
    <AudioContext.Provider
      value={{
        currentTeaching,
        isPlaying,
        progress,
        duration,
        volume,
        playTeaching,
        togglePlay,
        seek,
        setVolumeLevel,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
