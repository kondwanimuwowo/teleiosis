'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Quote = { id: string; text: string; scripture: string | null; author: string }

export default function QuoteBandClient() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  // Auto-rotate quotes (DISABLED temporarily to debug scroll jump issue)
  // useEffect(() => {
  //   if (isHovering || isLoading) return

  //   const interval = setInterval(() => {
  //     fetchQuote()
  //   }, ROTATE_INTERVAL)

  //   return () => clearInterval(interval)
  // }, [isHovering, isLoading])

  if (isLoading) {
    return (
      <section className="bg-[#2c0e68] min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }} />
        <div className="relative z-10 text-white/50 text-sm">Loading quote...</div>
      </section>
    )
  }

  if (!quote) {
    return (
      <section className="bg-[#2c0e68] min-h-screen flex items-center justify-center">
        <div className="text-white/50">No quotes available</div>
      </section>
    )
  }

  return (
    <section
      className="bg-[#2c0e68] min-h-screen flex items-center relative overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed pointer-events-none" style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-10 text-center">From The Teacher's Desk</p>

        <div className="flex items-center justify-center gap-6 sm:gap-12 lg:gap-20">
          {/* Previous button — hidden until hover */}
          <button
            onClick={fetchQuote}
            aria-label="Previous quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex"
            style={{ borderRadius: 0 }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Quote content */}
          <blockquote className="flex-1 text-center">
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
          </blockquote>

          {/* Next button — hidden until hover */}
          <button
            onClick={fetchQuote}
            aria-label="Next quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 hidden md:flex"
            style={{ borderRadius: 0 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
