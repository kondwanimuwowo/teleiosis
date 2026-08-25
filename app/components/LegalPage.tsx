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
    <main className="min-h-screen bg-[#14082b]">
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
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-wide mb-4">
            {title}
          </h1>
          <p className="text-white/50 text-sm">{subtitle}</p>
          <p className="text-white/30 text-xs mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 sm:p-9 shadow-md bg-white/[0.06]"
            >
              <h2 className="font-serif font-semibold text-base text-teleiosis-gold tracking-[0.1em] uppercase mb-5">
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
