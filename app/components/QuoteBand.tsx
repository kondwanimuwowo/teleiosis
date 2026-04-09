"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QUOTES = [
  { text: "The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. That which is perfect is come.", scripture: "1 Cor 13:10" },
  { text: "Leave nothing hanging in your life. Your Heavenly Father is very much concerned about the fine details. He is big enough to take care of the minutia of your life.", scripture: "Psa 138:8" },
  { text: "Don't advertise God small, show forth His excellence in all that concerns you. Through you, God is showing the world His Power.", scripture: "Eph 2:10" },
  { text: "The fabric between Heaven and Earth is wearing thin as we reveal the Heart of the Father to the world. Let Heaven come.", scripture: "Matt 6:10" },
  { text: "You are powerful, more than you know. The limits you see or the things that seem insurmountable are more scared of you than you are of them.", scripture: "Eph 3:20" },
  { text: "Love is not naive, but in its function it is higher than the flaws and mistakes of others, it sees the greatest outcome from any situation, which is the perfection of that thing.", scripture: "1 Cor 13:4–5" },
  { text: "The things of God are permanent. God does not do temporal fixes. The work of Jesus in His death, burial and resurrection accomplished for us more than what we are experiencing now.", scripture: "1 Cor 13:10" },
  { text: "What you have inside of you is what the Father placed there to bless and impact the world. Don't look outwardly to find who God made you to be. Look on the inside, there lies the treasure the world is eagerly awaiting.", scripture: "2 Cor 4:7" },
  { text: "Jesus came to give life more abundantly. There is a life that is overflowing, that gives life to all things around it. You are called to be a life-giving spirit.", scripture: "1 Cor 15:45" },
  { text: "You are the best at being you. Don't try to be someone else. Who you are is only found in Christ, He is the one who defines you. You are a Heaven-class person, one of a kind.", scripture: "Matt 5:16" },
  { text: "Grace is the divine enablement of God at work in a man. Grace is the person of Jesus Christ. You may not have what it takes, but you have WHO it takes.", scripture: "Phil 4:13" },
  { text: "The highest call for any being is to be loved of God, and you, individually, are at the very centre of His affection. There is nothing that can ever separate you from the Love of God that is in Christ Jesus.", scripture: "1 John 3:1" },
]

export function QuoteBand() {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx((i) => (i - 1 + QUOTES.length) % QUOTES.length)
  const next = () => setIdx((i) => (i + 1) % QUOTES.length)

  const { text, scripture } = QUOTES[idx]

  return (
    <section className="bg-[#2c0e68] py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-10 text-center">
          From The Teacher's Desk
        </p>

        {/* Quote + arrows row */}
        <div className="flex items-center gap-6 sm:gap-12 lg:gap-20">
          <button
            onClick={prev}
            aria-label="Previous quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/50 transition-colors"
            style={{ borderRadius: 0 }}
          >
            <ChevronLeft size={18} />
          </button>

          <blockquote className="flex-1 text-center" style={{ minHeight: '12rem' }}>
            <div className="flex flex-col items-center justify-center h-full" style={{ minHeight: '12rem' }}>
              <p
                key={idx}
                className="font-serif font-normal text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-5"
              >
                "{text}"
              </p>
              <cite className="text-teleiosis-gold text-xs tracking-[0.25em] uppercase font-semibold not-italic">
                {scripture}
              </cite>
            </div>
          </blockquote>

          <button
            onClick={next}
            aria-label="Next quote"
            className="flex-shrink-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/50 transition-colors"
            style={{ borderRadius: 0 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to quote ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-teleiosis-gold" : "bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
