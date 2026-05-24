'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PartnershipModal } from './PartnershipModal'

export function NavCTAs() {
  const [partnerOpen, setPartnerOpen] = useState(false)

  return (
    <>
      {/* Desktop CTAs — split pill: solid white left, ghost gold right */}
      <div className="hidden md:inline-flex items-center border border-teleiosis-gold/50 rounded-full overflow-hidden hover:border-teleiosis-gold/80 transition-colors duration-200">
        <Link
          href="/register"
          className="px-4 py-1.5 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:brightness-110 transition-all whitespace-nowrap"
        >
          Join Us
        </Link>
        <button
          onClick={() => setPartnerOpen(true)}
          className="px-4 py-1.5 text-teleiosis-gold text-sm font-bold hover:bg-teleiosis-gold/10 transition-colors whitespace-nowrap"
        >
          Partner
        </button>
      </div>

      <PartnershipModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </>
  )
}

export function MobileNavCTAs() {
  const [partnerOpen, setPartnerOpen] = useState(false)

  return (
    <>
      <div className="px-6 py-4 flex flex-col gap-2">
        <Link
          href="/register"
          className="block w-full text-center px-5 py-3 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm shadow-teleiosis-gold/20 rounded-full"
        >
          Join Us
        </Link>
        <button
          onClick={() => setPartnerOpen(true)}
          className="block w-full text-center px-5 py-3 border border-white/25 text-white/80 text-sm font-semibold hover:border-white/50 hover:text-white transition-all rounded-full"
        >
          Partner with Us
        </button>
      </div>

      <PartnershipModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </>
  )
}
