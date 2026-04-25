'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Clock, User, Search, Heart } from 'lucide-react'
import { PartnershipModal } from '../components/PartnershipModal'

type Event = {
  id: string
  title: string
  date: string
  time_start: string | null
  time_end: string | null
  location: string | null
  speaker: string | null
  type: string | null
  image_url: string | null
  description: string | null
}

const EVENT_TYPES = ['All', 'In Person', 'Online', 'Hybrid']

export function EventsClient({ events }: { events: Event[] }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [partnerEventId, setPartnerEventId] = useState<string | undefined>()
  const [partnerEventTitle, setPartnerEventTitle] = useState<string | undefined>()

  const filtered = useMemo(() => {
    let list = events
    if (typeFilter !== 'All') list = list.filter((e) => e.type === typeFilter)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((e) =>
        e.title.toLowerCase().includes(q) ||
        (e.speaker ?? '').toLowerCase().includes(q) ||
        (e.location ?? '').toLowerCase().includes(q)
      )
    }
    return list
  }, [events, search, typeFilter])

  return (
    <>
      <section className="bg-slate-50 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, speaker, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 rounded-xl focus:shadow-md transition-shadow"
              />
            </div>
            <div className="flex gap-2">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-2 text-xs font-bold border transition-all whitespace-nowrap rounded-xl ${
                    typeFilter === t
                      ? 'bg-[#2c0e68] text-white border-[#2c0e68]'
                      : 'bg-white text-[#2c0e68] border-slate-200 hover:border-[#2c0e68]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm">
              No events match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event) => {
                const d = new Date(event.date)
                const month = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
                const day = d.getDate().toString()
                const time = event.time_start && event.time_end
                  ? `${event.time_start} – ${event.time_end}`
                  : event.time_start ?? ''

                return (
                  <div key={event.id} className="bg-white border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      <img
                        src={event.image_url ?? '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg'}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm text-center min-w-[3.5rem]">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-teleiosis-gold leading-none mb-1">{month}</p>
                        <p className="font-serif font-bold text-xl text-[#2c0e68] leading-none">{day}</p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-4 leading-snug line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2.5 mb-6 flex-1">
                        {time && (
                          <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">{time}</p>
                          </div>
                        )}
                        {event.speaker && (
                          <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">{event.speaker}</p>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600 leading-tight">{event.location}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/events/${event.id}`}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] bg-[#4a0e68] text-white text-sm font-bold hover:bg-[#2c0e68] transition-colors rounded-xl"
                        >
                          Learn More
                        </Link>
                        <button
                          onClick={() => { setPartnerEventId(event.id); setPartnerEventTitle(event.title) }}
                          className="inline-flex items-center justify-center px-3 py-2.5 min-h-[44px] border-2 border-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/10 transition-colors rounded-xl"
                          title="Partner with this event"
                        >
                          <Heart size={16} className="text-teleiosis-gold" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <PartnershipModal
        open={!!partnerEventId}
        onClose={() => { setPartnerEventId(undefined); setPartnerEventTitle(undefined) }}
        eventId={partnerEventId}
        eventTitle={partnerEventTitle}
      />
    </>
  )
}
