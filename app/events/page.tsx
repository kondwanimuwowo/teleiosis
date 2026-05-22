import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { EventsClient } from './EventsClient'
import { NewsletterSection } from '../components/NewsletterSection'

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

function EventsListSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter tab skeletons */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 bg-slate-100 rounded-full animate-pulse" />
          ))}
        </div>
        {/* Event row skeletons */}
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex-shrink-0 w-20 h-12 bg-slate-100 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-2/3 bg-slate-100 rounded" />
                <div className="h-3 w-1/3 bg-slate-100 rounded" />
              </div>
              <div className="h-5 w-20 bg-slate-100 rounded-full" />
              <div className="h-9 w-28 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function EventsPage() {
  return (
    <>
      {/* ── HERO — static ─────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/event-1.jpg')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,8,64,0.85) 0%, rgba(20,8,43,0.85) 100%)' }} />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">
            Upcoming Events
          </p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Join Us In Person<br className="hidden sm:block" /> or Online
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Experience transformative gatherings designed to deepen your understanding of Christian perfection and Kingdom authority.
          </p>
        </div>
      </section>

      {/* ── DATA — skeleton while loading ─────────────────────────── */}
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsData />
      </Suspense>

      <NewsletterSection />
    </>
  )
}
