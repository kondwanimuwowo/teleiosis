'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PartnershipModal } from './PartnershipModal'

export function NavCTAs() {
  const [partnerOpen, setPartnerOpen] = useState(false)

  return (
    <>
      {/* Desktop split pill */}
      <div className="hidden md:inline-flex overflow-hidden border border-teleiosis-gold/40 shadow-sm shadow-teleiosis-gold/20 rounded-full">
        <Link
          href="/register"
          className="px-5 py-2 bg-teleiosis-gold text-teleiosis-deep text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors whitespace-nowrap"
        >
          Join Us
        </Link>
        <span className="w-px bg-teleiosis-gold/30 flex-shrink-0" />
        <button
          onClick={() => setPartnerOpen(true)}
          className="px-5 py-2 bg-[#2c0e68] text-teleiosis-gold text-sm font-bold hover:bg-[#3a1878] transition-colors whitespace-nowrap"
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
          className="block w-full text-center px-5 py-3 bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm shadow-teleiosis-gold/20"
        >
          Join Us
        </Link>
        <button
          onClick={() => setPartnerOpen(true)}
          className="block w-full text-center px-5 py-3 border-2 border-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/10 transition-colors"
        >
          Partner with Us
        </button>
      </div>

      <PartnershipModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </>
  )
}
