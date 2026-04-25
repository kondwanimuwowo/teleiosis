import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TeachingsPageClient } from './TeachingsPageClient'

export const metadata: Metadata = {
  title: 'Audio Library | Teachings by Rhema Nyambe',
  description: 'Access the Teleiosis Mandate audio library. Systematic teachings on the Christ Dimension, Priesthood, Kingship, and the Ministry of the Spirit.',
}

export default async function TeachingsPage() {
  const supabase = await createSupabaseServerClient()

  const [{ data: groupRows }, { data: seriesRows }, { data: teachingRows }] = await Promise.all([
    supabase.from('program_groups').select('*').order('sort_order'),
    supabase.from('teaching_series').select('id, title, slug, description, thumbnail_url, program_group_id').order('created_at', { ascending: false }),
    supabase.from('teachings').select('id, series_id, program_group_id'),
  ])

  // Build series teaching counts
  const countBySeries: Record<string, number> = {}
  const standaloneByGroup: Record<string, number> = {}
  teachingRows?.forEach((t) => {
    if (t.series_id) {
      countBySeries[t.series_id] = (countBySeries[t.series_id] ?? 0) + 1
    } else if (t.program_group_id) {
      standaloneByGroup[t.program_group_id] = (standaloneByGroup[t.program_group_id] ?? 0) + 1
    }
  })

  // Assemble groups with their series
  const groups = (groupRows ?? []).map((g) => ({
    ...g,
    series: (seriesRows ?? [])
      .filter((s) => s.program_group_id === g.id)
      .map((s) => ({ ...s, teaching_count: countBySeries[s.id] ?? 0 })),
    standalone_count: standaloneByGroup[g.id] ?? 0,
  }))

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pexels-bible-1869164_1280.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">Audio Library</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Teachings &amp; Series
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access a growing library of teachings organised by program — covering Kingdom authority, sonship, Christian perfection, and the practical revelation of Christ.
          </p>
        </div>
      </section>

      <TeachingsPageClient groups={groups} />
    </>
  )
}
