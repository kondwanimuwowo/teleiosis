'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

type Quote = { id: string; text: string; scripture: string | null; author: string }

const ROTATE_INTERVAL = 8000 // 8 seconds

export default function QuoteBandClient() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // 2.5 times slower parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

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

  // Initial load
  useEffect(() => {
    fetchQuote()
  }, [])

  // Auto-rotate quotes
  useEffect(() => {
    if (isHovering || isLoading) return

    const interval = setInterval(() => {
      fetchQuote()
    }, ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [isHovering, isLoading])

  return (
    <section
      ref={containerRef}
      className="bg-[#2c0e68] min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background - Parallax effect (slow scroll) */}
      <motion.div 
        style={{ y, backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }}
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none scale-110" 
      />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-10 text-center">From The Teacher's Desk</p>

        <div className="flex items-center justify-center gap-6 sm:gap-12 lg:gap-20">
          {/* Previous button */}
          <button
            onClick={fetchQuote}
            aria-label="Previous quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Quote content - Stable container to prevent layout shift */}
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
                      "{quote.text}"
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {quote.scripture && (
                        <cite className="text-teleiosis-gold text-xs tracking-[0.25em] uppercase font-semibold not-italic">
                          {quote.scripture}
                        </cite>
                      )}
                      <p className="text-white/60 text-xs tracking-[0.15em] font-serif">
                        — {quote.author}
                      </p>
                    </div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            ) : (
              <div className="text-white/50">No quotes available</div>
            )}
          </div>

          {/* Next button */}
          <button
            onClick={fetchQuote}
            aria-label="Next quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Mobile rotation buttons */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-12">
          <button
            onClick={fetchQuote}
            aria-label="Previous quote"
            className="w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={fetchQuote}
            aria-label="Next quote"
            className="w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
