import { createSupabaseServerClient } from '@/lib/supabase-server'
import { EventsClient } from './EventsClient'

export const metadata = {
  title: 'Upcoming Events | Teleiosis Mandate',
  description: 'Join our transformative gatherings in Lusaka and beyond. Experience systematic teaching on sonship, Kingdom authority, and Christian perfection.',
}

export default async function EventsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/event-1.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
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

      <EventsClient events={events ?? []} />
    </>
  )
}
