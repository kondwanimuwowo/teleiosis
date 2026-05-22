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

  // Initialize audio element + Media Session action handlers
  useEffect(() => {
    audioRef.current = new Audio()
    const audio = audioRef.current

    const updateProgress = () => {
      setProgress(audio.currentTime)
      if ('mediaSession' in navigator && audio.duration && !isNaN(audio.duration)) {
        try {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            playbackRate: audio.playbackRate,
            position: audio.currentTime,
          })
        } catch {}
      }
    }
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'none'
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        audio.play().catch(console.error)
        setIsPlaying(true)
        navigator.mediaSession.playbackState = 'playing'
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause()
        setIsPlaying(false)
        navigator.mediaSession.playbackState = 'paused'
      })
      navigator.mediaSession.setActionHandler('stop', () => {
        audio.pause()
        setIsPlaying(false)
        setCurrentTeaching(null)
        navigator.mediaSession.playbackState = 'none'
      })
      navigator.mediaSession.setActionHandler('seekbackward', ({ seekOffset }) => {
        audio.currentTime = Math.max(0, audio.currentTime - (seekOffset ?? 10))
      })
      navigator.mediaSession.setActionHandler('seekforward', ({ seekOffset }) => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + (seekOffset ?? 10))
      })
      navigator.mediaSession.setActionHandler('seekto', ({ seekTime }) => {
        if (seekTime != null) audio.currentTime = seekTime
      })
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null)
        navigator.mediaSession.setActionHandler('pause', null)
        navigator.mediaSession.setActionHandler('stop', null)
        navigator.mediaSession.setActionHandler('seekbackward', null)
        navigator.mediaSession.setActionHandler('seekforward', null)
        navigator.mediaSession.setActionHandler('seekto', null)
      }
    }
  }, [])

  const playTeaching = (teaching: Teaching) => {
    if (!audioRef.current) return

    if (currentTeaching?.id === teaching.id) {
      togglePlay()
      return
    }

    audioRef.current.src = teaching.audio_url
    audioRef.current.load()
    setCurrentTeaching(teaching)
    setIsPlaying(true)
    audioRef.current.play().catch(console.error)

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: teaching.title,
        artist: teaching.speaker ?? 'Teleiosis Mandate',
        album: 'Teleiosis Mandate',
        artwork: teaching.thumbnail_url
          ? [{ src: teaching.thumbnail_url, sizes: '512x512', type: 'image/jpeg' }]
          : [{ src: '/images/og-image.png', sizes: '512x512', type: 'image/png' }],
      })
      navigator.mediaSession.playbackState = 'playing'
    }
  }

  const togglePlay = () => {
    if (!audioRef.current || !currentTeaching) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'
    } else {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'
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
    if (audioRef.current) audioRef.current.pause()
    setIsPlaying(false)
    setCurrentTeaching(null)
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null
      navigator.mediaSession.playbackState = 'none'
    }
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
