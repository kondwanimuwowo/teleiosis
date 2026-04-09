export const metadata = {
  title: 'Upcoming Events | Teleiosis Mandate',
  description: 'Join our transformative gatherings in Lusaka and beyond. Experience systematic teaching on sonship, Kingdom authority, and Christian perfection.',
}

const EVENTS = [
  { id: 1, date: '14 May 2026', month: 'May', day: '14', title: 'Administrating the Secrets of the Firmament', location: 'Emperors Crown Olympia, Lusaka', speaker: 'Rhema Nyambe', time: '2:00 PM – 5:00 PM', type: 'In Person', image: '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg' },
  { id: 2, date: '19 May 2026', month: 'May', day: '19', title: 'Mapping His Footsteps', location: 'Emperors Crown Olympia, Lusaka', speaker: 'Rhema Nyambe', time: '2:00 PM – 5:00 PM', type: 'In Person', image: '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg' },
  { id: 3, date: '14 Jul 2026', month: 'Jul', day: '14', title: 'Going Beyond', location: 'Emperors Crown Olympia, Lusaka', speaker: 'Rhema Nyambe', time: '2:00 PM – 5:00 PM', type: 'In Person', image: '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg' },
  { id: 4, date: '1 Oct 2026', month: 'Oct', day: '1',  title: 'In the Footsteps of the Ancient Ones', location: 'Emperors Crown Olympia, Lusaka', speaker: 'Rhema Nyambe', time: '2:00 PM – 5:00 PM', type: 'In Person', image: '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg' },
  { id: 5, date: '1 Nov 2026', month: 'Nov', day: '1',  title: 'Thunder Academy', location: 'Emperors Crown Olympia, Lusaka', speaker: 'Rhema Nyambe', time: '2:00 PM – 5:00 PM', type: 'In Person', image: '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg' },
]

import { NewsletterSection } from '../components/NewsletterSection'
import { MapPin, Clock, User } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import Link from 'next/link'

export default function EventsPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/event-1.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">
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

      {/* ── EVENTS LIST ──────────────────────────────────────────────────────── */}
      <FadeIn>
        <section className="bg-slate-50 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {EVENTS.map((event) => (
                <div key={event.id} className="bg-white border border-slate-100 shadow-sm flex flex-col group hover:shadow-sm transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl">
                  {/* Image Head */}
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-center min-w-[3.5rem]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-teleiosis-gold leading-none mb-1">{event.month}</p>
                      <p className="font-serif font-bold text-xl text-[#2c0e68] leading-none">{event.day}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-4 leading-snug group-hover:text-[#4a0e68] transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">{event.time}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">Speaker: {event.speaker}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-teleiosis-gold flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-tight">{event.location}</p>
                      </div>
                    </div>

                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] rounded-full bg-[#4a0e68] text-white text-sm font-bold hover:bg-[#2c0e68] transition-colors shadow-sm">
                      Join Us
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── NEVER MISS AN EVENT (NEWSLETTER) ─────────────────────── */}
      <FadeIn>
        <NewsletterSection className="bg-white mt-24 pb-16 sm:pb-20 lg:pb-24" />
      </FadeIn>
    </>
  )
}
