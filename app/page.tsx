import Link from 'next/link'
import { FlipText } from './components/FlipText'
import { CTASection } from './components/CTASection'
import { QuoteBand } from './components/QuoteBand'
import { FadeIn } from './components/FadeIn'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export const metadata = {
  title: 'Home',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const PROGRAMS = [
  { n: '01', title: 'Manifested Sons', desc: 'Fortnightly Saturday classes exploring the revelation of the sons of God and Kingdom authority in daily life.', href: '/about', cta: 'Learn more' },
  { n: '02', title: 'Unto Perfection', desc: 'Intensive conferences bringing believers together for deep teaching and encounters with the Spirit. Believers are taught to actualise the word of God in their lives.', href: '/events', cta: 'See events' },
  { n: '03', title: 'Resurrection Life Conferences', desc: 'Intensive practical conferences where believers encounter and activate the realities of Kingdom life — Spirit, Soul, and Body.', href: '/events', cta: 'See events' },
]

export default async function Home() {
  const supabase = await createSupabaseServerClient()

  const [{ data: newsPosts }, { data: siteStats }, { data: nextEvent }] = await Promise.all([
    supabase.from('blog_posts').select('id, slug, category, title, excerpt, published_at, image_url').order('published_at', { ascending: false }).limit(3),
    supabase.from('site_stats').select('*').order('sort_order'),
    supabase.from('events').select('*').gte('date', new Date().toISOString().split('T')[0]).order('date', { ascending: true }).limit(1).maybeSingle(),
  ])

  const newsPreview = newsPosts ?? []
  const STATS = siteStats ?? []

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#2c0e68]/80" />

        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <p className="text-teleiosis-gold text-2xl sm:text-4xl font-semibold tracking-[0.3em] mb-5">
            τελείωσις
          </p>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-6xl text-white tracking-wider mb-5 leading-[1.05] min-h-[1.05em]">
            <FlipText />
          </h1>
          <p className="text-white/55 text-base sm:text-lg font-serif mb-6 max-w-xl leading-relaxed">
            That Which Is Perfect Is Come
          </p>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
            A community devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/events" className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full bg-teleiosis-gold text-teleiosis-deep text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm">
              Upcoming Events
            </Link>
            <Link href="/teachings" className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              Explore Teachings
            </Link>
          </div>
        </div>
      </section>

      {/* ── PILLARS BAR ──────────────────────────────────────────── */}
      <section className="bg-slate-50 py-8 hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-center">
            <p className="text-[#4a0e68]/70 text-xs tracking-[0.2em] uppercase font-semibold">Resurrection · Oneness · Spirit</p>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-teleiosis-gold/60" />
            <p className="text-[#4a0e68]/70 text-xs tracking-[0.2em] uppercase font-semibold">Sonship · Kingdom · Glory</p>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-teleiosis-gold/60" />
            <p className="text-[#4a0e68]/70 text-xs tracking-[0.2em] uppercase font-semibold">Perfection · Purpose · Power</p>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────── */}
      <FadeIn>
        <section className="bg-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text */}
              <div>
                <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Who We Are</p>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-6">
                  Called to a Higher Standard
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                  The Teleiosis Mandate is a ministry movement grounded in the revelation of Christian perfection, the full maturity and manifestation of the sons of God.
                </p>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                  We gather believers who are hungry to move beyond the basics, into the deep things of God's Kingdom.
                </p>
                <blockquote className="border-l-2 border-teleiosis-gold pl-5">
                  <p className="text-[#4a0e68] text-base sm:text-lg leading-relaxed mb-2">
                    "Till we all come unto a perfect man, unto the measure of the stature of the fulness of Christ."
                  </p>
                  <cite className="text-xs text-slate-400 not-italic">Ephesians 4:13</cite>
                </blockquote>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 w-fit mx-auto place-items-center">
                {STATS.map(({ value, label }, i) => (
                  <div
                    key={label}
                    style={{
                      borderRadius:
                        i === 0 ? '30% 0 0 0' :
                        i === 1 ? '0 30% 0 0' :
                        i === 2 ? '0 0 0 30%' :
                        '0 0 30% 0'
                    }}
                    className={`h-40 w-40 p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      i === 0 ? 'bg-[#4a0e68] text-white' :
                      i === 3 ? 'bg-[#2c0e68] text-white' :
                      'bg-slate-50 border border-slate-100 text-[#2c0e68]'
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
            </div>
          </div>
        </section>
      </FadeIn>

      <QuoteBand />

      {/* ── PROGRAMS ─────────────────────────────────────────────── */}
      <FadeIn delay={0.1}>
        <section className="bg-slate-50 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Programs</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-12">
              Training Into Perfection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAMS.map(({ n, title, desc, href, cta }) => (
                <article key={n} className="bg-white border border-slate-100 p-6 sm:p-8 flex flex-col shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <p className="font-serif font-bold text-2xl text-teleiosis-gold mb-3">{n}</p>
                  <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                  <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#4a0e68] hover:text-teleiosis-gold transition-colors min-h-[44px]">
                    {cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── UPCOMING EVENT ───────────────────────────────────────── */}
      {nextEvent && (
        <FadeIn delay={0.2}>
          <section className="bg-[#2c0e68] py-20 sm:py-28 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Poster */}
                <div className="flex justify-center lg:justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm overflow-hidden shadow-md rounded-xl">
                    <img
                      src={nextEvent.image_url ?? '/images/manifested-sons-of-god-class-light.jpg'}
                      alt={nextEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Next Event</p>
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
                    <Link href={`/events/${nextEvent.id}`} className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] bg-teleiosis-gold text-teleiosis-deep text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm">
                      Learn More
                    </Link>
                    <Link href="/events" className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
                      All Events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── NEWS & UPDATES ───────────────────────────────────────── */}
      <FadeIn delay={0.1}>
        <section className="bg-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Latest</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-12">
              News &amp; Updates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsPreview.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-slate-100 flex flex-col group hover:border-[#4a0e68]/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden rounded-xl"
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
                    <span className="text-sm font-semibold text-teleiosis-gold group-hover:text-[#4a0e68] transition-colors pt-4 border-t border-slate-100 mt-auto">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to Go Deeper?"
        description="Join a community of believers pursuing the fullness of Christ and the manifestation of Kingdom authority."
        buttonText="Get Started"
        buttonHref="/contact"
      />
    </>
  )
}
