import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TeachingsPageClient } from './TeachingsPageClient'
import { CTASection } from '../components/CTASection'

export const metadata: Metadata = {
  title: 'Audio Library | Teachings by Rhema Nyambe',
  description: 'Access the Teleiosis Mandate audio library. Systematic teachings on the Christ Dimension, Priesthood, Kingship, and the Ministry of the Spirit.',
}

// Async component â€” fetches data, streams in after hero is already visible
async function TeachingsData() {
  const supabase = await createSupabaseServerClient()

  const [{ data: groupRows }, { data: seriesRows }, { data: teachingRows }] = await Promise.all([
    supabase.from('program_groups').select('*').order('sort_order'),
    supabase.from('teaching_series').select('id, title, slug, description, thumbnail_url, program_group_id').order('created_at', { ascending: false }),
    supabase.from('teachings').select('id, series_id, program_group_id'),
  ])

  const countBySeries: Record<string, number> = {}
  const standaloneByGroup: Record<string, number> = {}
  teachingRows?.forEach((t) => {
    if (t.series_id) {
      countBySeries[t.series_id] = (countBySeries[t.series_id] ?? 0) + 1
    } else if (t.program_group_id) {
      standaloneByGroup[t.program_group_id] = (standaloneByGroup[t.program_group_id] ?? 0) + 1
    }
  })

  const groups = (groupRows ?? []).map((g) => ({
    ...g,
    series: (seriesRows ?? [])
      .filter((s) => s.program_group_id === g.id)
      .map((s) => ({ ...s, teaching_count: countBySeries[s.id] ?? 0 })),
    standalone_count: standaloneByGroup[g.id] ?? 0,
  }))

  return <TeachingsPageClient groups={groups} />
}

// Skeleton shown only for the list area while data streams in
function ListSkeleton() {
  return (
    <div>
      <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="h-9 w-full max-w-sm bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse hidden sm:block" />
        </div>
      </div>
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-[#4a0e68]/20 animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-[35%] lg:w-[40%] aspect-[21/9] sm:aspect-auto sm:min-h-[160px] bg-[#1a0840]" />
                <div className="flex-1 p-6 sm:p-8 bg-gradient-to-r from-[#2c0e68] to-[#4a0e68] flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-20 bg-white/20 rounded" />
                    <div className="h-5 w-24 bg-white/10 rounded-full" />
                  </div>
                  <div className="h-7 w-2/3 bg-white/25 rounded" />
                  <div className="h-4 w-full max-w-sm bg-white/15 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Sync page component â€” hero renders immediately via streaming
export default function TeachingsPage() {
  return (
    <>
      {/* â”€â”€ HERO â€” static, no data needed, streams to browser instantly â”€â”€ */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pexels-bible-1869164_1280.jpg')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,8,64,0.85) 0%, rgba(20,8,43,0.85) 100%)' }} />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">Audio Library</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Teachings &amp; Series
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access a growing library of teachings organised by program â€” covering Kingdom authority, sonship, Christian perfection, and the practical revelation of Christ.
          </p>
        </div>
      </section>

      {/* â”€â”€ DATA â€” skeleton shows while Supabase queries run â”€â”€ */}
      <Suspense fallback={<ListSkeleton />}>
        <TeachingsData />
      </Suspense>

      <CTASection
        title="Ready to Go Deeper?"
        description="Join a community of believers pursuing the fullness of Christ and the practical revelation of Kingdom authority."
        buttonText="Join Us"
        buttonHref="/register"
      />
    </>
  )
}

