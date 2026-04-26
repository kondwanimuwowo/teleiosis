import { createSupabaseServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, User, Calendar, ArrowLeft } from 'lucide-react'
import { EventPartnerSection } from './EventPartnerSection'
import { JsonLd, eventSchema } from '@/app/components/JsonLd'
import { ShareButtons } from '@/app/components/ShareButtons'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('events').select('title, description, image_url, date').eq('id', params.id).single()
  if (!data) return { title: 'Event | Teleiosis Mandate' }
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'
  return {
    title: data.title,
    description: data.description ?? `Join us for ${data.title} on ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`,
    alternates: { canonical: `${base}/events/${params.id}` },
    openGraph: {
      title: data.title,
      description: data.description ?? undefined,
      url: `${base}/events/${params.id}`,
      type: 'website',
      images: data.image_url ? [{ url: data.image_url, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description ?? undefined,
      images: data.image_url ? [data.image_url] : undefined,
    },
  }
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient()
  const { data: event } = await supabase.from('events').select('*').eq('id', params.id).single()
  if (!event) notFound()

  const time = event.time_start && event.time_end
    ? `${event.time_start} – ${event.time_end}`
    : event.time_start ?? null

  const details = [
    { icon: Calendar, label: 'Date',     value: formatDate(event.date) },
    { icon: Clock,    label: 'Time',     value: time },
    { icon: User,     label: 'Speaker',  value: event.speaker },
    { icon: MapPin,   label: 'Location', value: event.location },
  ].filter((d) => d.value)

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'
  const eventUrl = `${base}/events/${event.id}`

  return (
    <>
      <JsonLd data={eventSchema(event)} />
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ minHeight: '65vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${event.image_url ?? '/images/event-1.jpg'}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c0e68] via-[#2c0e68]/60 to-transparent" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-12 sm:pb-16">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft size={14} /> All Events
          </Link>
          {event.type && (
            <span className="inline-block px-3 py-1 bg-teleiosis-gold/20 border border-teleiosis-gold/40 text-teleiosis-gold text-xs font-bold uppercase tracking-widest mb-4">
              {event.type}
            </span>
          )}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl mb-4">
            {event.title}
          </h1>
          <p className="text-white/60 text-sm">
            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* ── DETAILS + PARTNER ────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — event details */}
            <div>
              <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">Event Details</p>
              <dl className="space-y-5 mb-10">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <Icon size={17} className="text-teleiosis-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</dt>
                      <dd className="text-[#2c0e68] text-base font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {event.description && (
                <div>
                  <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">About This Event</p>
                  <p className="text-slate-600 text-base leading-relaxed">{event.description}</p>
                </div>
              )}

              {event.is_recurring && event.recurring_label && (
                <div className="mt-6 px-4 py-3 bg-slate-50 border border-slate-100 border-l-2 border-l-teleiosis-gold">
                  <p className="text-xs text-slate-500"><span className="font-bold text-[#2c0e68]">Recurring: </span>{event.recurring_label}</p>
                </div>
              )}

              <ShareButtons url={eventUrl} title={event.title} description={event.description ?? undefined} className="mt-8" />
            </div>

            {/* Right — partner section */}
            <EventPartnerSection eventId={event.id} eventTitle={event.title} />
          </div>
        </div>
      </section>
    </>
  )
}
