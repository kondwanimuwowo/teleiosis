import { createSupabaseServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, User, Calendar, ArrowLeft } from 'lucide-react'
import { EventPartnerSection } from './EventPartnerSection'
import { EventRegisterSection } from './EventRegisterSection'
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

      {/* ── HERO — text-only gradient ─────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d0424 0%, #1a0840 45%, #2c0e68 100%)' }}>
        {/* Subtle decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-teleiosis-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#4a0e68]/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-28">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-semibold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={14} /> All Events
          </Link>

          {event.type && (
            <div className="mb-5">
              <span className="inline-block px-3 py-1 border border-teleiosis-gold/40 bg-teleiosis-gold/10 text-teleiosis-gold text-[10px] font-bold uppercase tracking-[0.25em] rounded-full">
                {event.type}
              </span>
            </div>
          )}

          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mb-6">
            {event.title}
          </h1>

          <p className="text-white/50 text-sm sm:text-base font-medium">
            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            {time && <span className="ml-3 text-white/30">&middot;</span>}
            {time && <span className="ml-3">{time}</span>}
          </p>
        </div>
      </section>

      {/* ── DETAILS + IMAGE + ACCORDIONS ─────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — event details */}
            <div>
              <p className="text-teleiosis-gold/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Event Details</p>
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
                <div className="mb-8">
                  <p className="text-teleiosis-gold/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">About This Event</p>
                  <p className="text-slate-600 text-base leading-relaxed">{event.description}</p>
                </div>
              )}

              {event.is_recurring && event.recurring_label && (
                <div className="mb-8 px-4 py-3 bg-slate-50 border border-slate-100 border-l-2 border-l-teleiosis-gold rounded-r-lg">
                  <p className="text-xs text-slate-500"><span className="font-bold text-[#2c0e68]">Recurring: </span>{event.recurring_label}</p>
                </div>
              )}

              <ShareButtons url={eventUrl} title={event.title} description={event.description ?? undefined} className="mt-2" />
            </div>

            {/* Right — image + register + partner */}
            <div className="space-y-6">
              {/* Event image */}
              {event.image_url && (
                <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-[#1a0840]">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <EventRegisterSection eventId={event.id} eventTitle={event.title} />
              <EventPartnerSection eventId={event.id} eventTitle={event.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
