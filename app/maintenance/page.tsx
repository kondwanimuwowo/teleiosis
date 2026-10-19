import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isMaintenanceMode } from '@/lib/maintenance'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Temporarily Unavailable | Teleiosis Mandate' },
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  if (!isMaintenanceMode()) notFound()

  return (
    <main className="min-h-screen flex items-center bg-[#1a0840]">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <p className="text-teleiosis-gold text-2xl sm:text-3xl font-semibold tracking-[0.3em] mb-8">
          τελείωσις
        </p>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-6 max-w-2xl">
          We&apos;ll be back shortly
        </h1>
        <p className="text-white/65 text-base sm:text-lg max-w-xl leading-relaxed">
          The Teleiosis Mandate website is temporarily unavailable while we carry out maintenance. Thank you for your patience.
        </p>
        <p className="mt-16 text-white/35 text-xs tracking-[0.2em] uppercase font-semibold">
          Teleiosis Mandate
        </p>
      </div>
    </main>
  )
}
