import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { STAT_RADII } from './HomeShell'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export async function StatsGrid() {
  const supabase = await createSupabaseServerClient()
  const { data: siteStats } = await supabase.from('site_stats').select('*').order('sort_order')
  const STATS = siteStats ?? []

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto place-items-center">
      {STATS.map(({ value, label }, i) => (
        <div
          key={label}
          style={{ borderRadius: STAT_RADII[i] ?? '0' }}
          className={`h-40 w-40 p-4 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
            i === 0 || i === 3 ? 'bg-[#2c0e68] text-white' :
            'bg-slate-50 text-[#2c0e68]'
          }`}
        >
          <p className={`font-serif font-bold text-xl sm:text-2xl mb-1 ${i === 0 || i === 3 ? 'text-teleiosis-gold' : 'text-[#4a0e68]'}`}>
            {value}
          </p>
          <p className={`text-[10px] sm:text-xs tracking-widest uppercase font-semibold leading-tight ${i === 0 || i === 3 ? 'text-white/70' : 'text-slate-500'}`}>
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

export async function NextEvent() {
  const supabase = await createSupabaseServerClient()
  const { data: nextEvent } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!nextEvent) return null

  return (
    <FadeIn delay={0.2}>
      <section className="py-20 sm:py-28 lg:py-32 bg-[#2c0e68]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-center">
            {/* Poster */}
            <div className="flex justify-center lg:justify-end lg:pr-10">
              <div className="w-full max-w-xs sm:max-w-sm overflow-hidden shadow-md rounded-xl">
                <img
                  src={nextEvent.image_url ?? '/images/manifested-sons-of-god-class-light.jpg'}
                  alt={nextEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vertical rule */}
            <div className="hidden lg:block w-px self-stretch bg-white/15 mx-0" />

            {/* Details */}
            <div className="lg:pl-10">
              <p className="text-white/50 text-sm mb-3">Mark your calendar for our next gathering.</p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-8">
                {nextEvent.title}
              </h2>
              <dl className="space-y-5 mb-10">
                {[
                  { dt: 'When',    dd: new Date(nextEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                  { dt: 'Time',    dd: nextEvent.time_start && nextEvent.time_end ? `${nextEvent.time_start} – ${nextEvent.time_end}` : nextEvent.time_start },
                  { dt: 'Venue',   dd: nextEvent.location },
                  { dt: 'Speaker', dd: nextEvent.speaker },
                  { dt: 'Format',  dd: nextEvent.type },
                ].filter((r) => r.dd).map(({ dt, dd }) => (
                  <div key={dt} className="flex gap-4 items-baseline">
                    <dt className="text-white/40 text-xs tracking-widest uppercase w-20 flex-shrink-0">{dt}</dt>
                    <dd className="text-white/85 text-base">{dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3">
                <Link href={`/events/${nextEvent.id}`} className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full bg-teleiosis-gold text-teleiosis-deep text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm">
                  Learn More
                </Link>
                <Link href="/events" className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-colors">
                  All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

export async function NewsPreview() {
  const supabase = await createSupabaseServerClient()
  const { data: newsPosts } = await supabase
    .from('blog_posts')
    .select('id, slug, category, title, excerpt, published_at, image_url')
    .order('published_at', { ascending: false })
    .limit(3)
  const newsPreview = newsPosts ?? []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsPreview.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="bg-white flex flex-col group hover:-translate-y-1 hover:shadow-md shadow-sm transition-all duration-300 overflow-hidden rounded-xl"
        >
          <div className="aspect-[16/9] overflow-hidden bg-slate-100">
            <img
              src={post.image_url}
              alt={post.title}
              width={560}
              height={315}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#4a0e68]">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-xs text-slate-400">{formatDate(post.published_at)}</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-3 leading-snug group-hover:text-[#4a0e68] transition-colors flex-1">
              {post.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teleiosis-gold group-hover:text-[#4a0e68] transition-colors pt-4 mt-auto">
              Read <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
