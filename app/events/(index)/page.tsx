import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { EventsClient } from '../EventsClient'
import { EventsHero, EventsListSkeleton } from '../EventsShell'
import { NewsletterSection } from '../../components/NewsletterSection'

export const metadata = {
  title: 'Upcoming Events | Teleiosis Mandate',
  description: 'Join our transformative gatherings in Lusaka and beyond. Experience systematic teaching on sonship, Kingdom authority, and Christian perfection.',
}

async function EventsData() {
  const supabase = await createSupabaseServerClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })

  return <EventsClient events={events ?? []} />
}

export default function EventsPage() {
  return (
    <>
      {/* ── HERO — static ─────────────────────────────────────────── */}
      <EventsHero />

      {/* ── DATA — skeleton while loading ─────────────────────────── */}
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsData />
      </Suspense>

      <NewsletterSection />
    </>
  )
}
