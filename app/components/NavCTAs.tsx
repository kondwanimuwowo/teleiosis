'use client'

import Link from 'next/link'

export function NavCTAs() {
  return (
    <>
      {/* Desktop CTAs — split pill: solid gold left, tinted gold right */}
      <div className="hidden md:inline-flex items-center rounded-full overflow-hidden shadow-sm">
        <Link
          href="/register"
          className="px-4 py-1.5 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:brightness-110 transition-all whitespace-nowrap"
        >
          Join Us
        </Link>
        <Link
          href="/partnership"
          className="px-4 py-1.5 bg-teleiosis-gold/15 text-teleiosis-gold text-sm font-bold hover:bg-teleiosis-gold/25 transition-colors whitespace-nowrap"
        >
          Partner
        </Link>
      </div>
    </>
  )
}

export function MobileNavCTAs() {
  return (
    <>
      <div className="px-6 py-4 flex flex-col gap-2">
        <Link
          href="/register"
          className="block w-full text-center px-5 py-3 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm shadow-teleiosis-gold/20 rounded-full"
        >
          Join Us
        </Link>
        <Link
          href="/partnership"
          className="block w-full text-center px-5 py-3 bg-white/10 text-white/80 text-sm font-semibold hover:bg-white/20 hover:text-white transition-all rounded-full"
        >
          Partner with Us
        </Link>
      </div>
    </>
  )
}
