import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Section {
  heading: string
  body: React.ReactNode
}

interface LegalPageProps {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #2c0e68 0%, #14082b 100%)' }}
    >
      {/* Orb accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4a2c9c 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #2c0e68 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-teleiosis-gold transition-colors text-sm mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        {/* Hero */}
        <div className="mb-14 text-center">
          <p className="text-teleiosis-gold/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Legal
          </p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-wide mb-4">
            {title}
          </h1>
          <p className="text-white/50 text-sm">{subtitle}</p>
          <p className="text-white/30 text-xs mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Glass cards */}
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 p-7 sm:p-9"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              <h2 className="font-serif font-semibold text-base text-teleiosis-gold tracking-[0.15em] uppercase mb-5">
                {section.heading}
              </h2>
              <div className="text-white/70 text-sm leading-relaxed space-y-3">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-white/25 text-xs">
            Questions? Contact us at{' '}
            <a href="mailto:info@teleiosis.org" className="text-teleiosis-gold/60 hover:text-teleiosis-gold transition-colors">
              info@teleiosis.org
            </a>
          </p>
        </div>

      </div>
    </main>
  )
}
