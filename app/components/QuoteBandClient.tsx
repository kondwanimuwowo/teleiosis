'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

type Quote = { id: string; text: string; scripture: string | null; author: string }

const ROTATE_INTERVAL = 8000
const RADIUS = 16
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~100.5

export default function QuoteBandClient() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const fetchQuote = async () => {
    try {
      const res = await fetch('/api/quotes/random')
      if (res.ok) {
        const data = await res.json()
        setQuote(data)
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  useEffect(() => {
    if (isPaused || isLoading) return
    const interval = setInterval(() => { fetchQuote() }, ROTATE_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused, isLoading])

  return (
    <section
      ref={containerRef}
      className="min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden group"
      style={{ background: 'linear-gradient(160deg, #2c0e68 0%, #14082b 100%)' }}
    >
      <style>{`
        @keyframes progress-ring {
          from { stroke-dashoffset: ${CIRCUMFERENCE}; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Background parallax */}
      <motion.div
        style={{ y, backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }}
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none scale-110 will-change-transform"
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-10 text-center">
          From The Teacher&apos;s Desk
        </p>

        <div className="flex items-center justify-center gap-6 sm:gap-12 lg:gap-20">
          {/* Previous */}
          <button
            onClick={fetchQuote}
            aria-label="Previous quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Quote content */}
          <div className="flex-1 text-center min-h-[200px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-white/50 text-sm">Loading quote...</div>
            ) : quote ? (
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={quote.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-serif font-normal text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {quote.scripture && (
                        <cite className="text-teleiosis-gold text-xs tracking-[0.25em] uppercase font-semibold not-italic">
                          {quote.scripture}
                        </cite>
                      )}
                      <p className="text-white/60 text-xs tracking-[0.15em] font-serif">
                        â€” {quote.author}
                      </p>
                    </div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            ) : (
              <div className="text-white/50">No quotes available</div>
            )}
          </div>

          {/* Next */}
          <button
            onClick={fetchQuote}
            aria-label="Next quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress ring + play/pause */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Mobile prev/next */}
          <button
            onClick={fetchQuote}
            aria-label="Previous quote"
            className="md:hidden w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Ring + button */}
          <button
            onClick={() => setIsPaused(p => !p)}
            aria-label={isPaused ? 'Play' : 'Pause'}
            className="relative w-11 h-11 flex items-center justify-center flex-shrink-0 group/ring"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 44 44"
              aria-hidden="true"
            >
              {/* Track */}
              <circle
                cx="22" cy="22" r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
              {/* Progress */}
              <circle
                key={quote?.id ?? 'loading'}
                cx="22" cy="22" r={RADIUS}
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{
                  strokeDashoffset: CIRCUMFERENCE,
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                  animationName: 'progress-ring',
                  animationDuration: `${ROTATE_INTERVAL}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            </svg>
            {isPaused
              ? <Play size={13} className="text-white fill-white relative z-10" />
              : <Pause size={13} className="text-white/60 group-hover/ring:text-white transition-colors relative z-10" />
            }
          </button>

          {/* Mobile next */}
          <button
            onClick={fetchQuote}
            aria-label="Next quote"
            className="md:hidden w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

