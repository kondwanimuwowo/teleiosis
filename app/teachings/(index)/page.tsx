import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TeachingsPageClient } from '../TeachingsPageClient'
import { CTASection } from '../../components/CTASection'
import { TeachingsHero, TeachingsListSkeleton } from '../TeachingsShell'

export const metadata: Metadata = {
  title: 'Audio Library | Teachings by Rhema Nyambe',
  description: 'Access the Teleiosis Mandate audio library. Systematic teachings on the Christ Dimension, Priesthood, Kingship, and the Ministry of the Spirit.',
}

// Async component — fetches data, streams in after hero is already visible
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

// Sync page component — hero renders immediately via streaming
export default function TeachingsPage() {
  return (
    <>
      {/* ── HERO — static, no data needed, streams to browser instantly ── */}
      <TeachingsHero />

      {/* ── DATA — skeleton shows while Supabase queries run ── */}
      <Suspense fallback={<TeachingsListSkeleton />}>
        <TeachingsData />
      </Suspense>

      <CTASection
        title="Ready to go deeper?"
        description="Join a community of believers pursuing the fullness of Christ and the practical revelation of Kingdom authority."
        buttonText="Join Us"
        buttonHref="/register"
      />
    </>
  )
}
