'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Quote = { text: string; scripture: string }

export default function QuoteBandClient({ quotes }: { quotes: Quote[] }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((i) => (i - 1 + quotes.length) % quotes.length)
  const next = () => setIdx((i) => (i + 1) % quotes.length)
  const { text, scripture } = quotes[idx]

  return (
    <section className="bg-[#2c0e68] py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-10 text-center">From The Teacher's Desk</p>
        <div className="flex items-center gap-6 sm:gap-12 lg:gap-20">
          <button onClick={prev} aria-label="Previous quote" className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/50 transition-colors" style={{ borderRadius: 0 }}>
            <ChevronLeft size={18} />
          </button>
          <blockquote className="flex-1 text-center" style={{ minHeight: '12rem' }}>
            <div className="flex flex-col items-center justify-center h-full" style={{ minHeight: '12rem' }}>
              <p key={idx} className="font-serif font-normal text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-5">"{text}"</p>
              <cite className="text-teleiosis-gold text-xs tracking-[0.25em] uppercase font-semibold not-italic">{scripture}</cite>
            </div>
          </blockquote>
          <button onClick={next} aria-label="Next quote" className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/50 transition-colors" style={{ borderRadius: 0 }}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-10">
          {quotes.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Go to quote ${i + 1}`} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-teleiosis-gold' : 'bg-white/25 hover:bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
