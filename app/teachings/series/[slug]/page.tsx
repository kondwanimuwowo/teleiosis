import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { SeriesTeachingPlayer } from '@/app/components/SeriesTeachingPlayer'
import { FadeIn } from '@/app/components/FadeIn'
import { ArrowLeft, BookOpen } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('teaching_series')
    .select('title, description')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Series Not Found' }
  return {
    title: `${data.title} | Teaching Series`,
    description: data.description ?? undefined,
  }
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()

  // Fetch series
  const { data: series } = await supabase
    .from('teaching_series')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!series) notFound()

  // Fetch teachings in this series, ordered
  const { data: teachings } = await supabase
    .from('teachings')
    .select('*')
    .eq('series_id', series.id)
    .order('order_in_series', { ascending: true, nullsFirst: false })

  // Fetch other series for the footer
  const { data: otherSeries } = await supabase
    .from('teaching_series')
    .select('id, title, thumbnail_url, slug')
    .neq('id', series.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const trackList = teachings ?? []
  const totalMinutes = trackList.reduce((acc, t) => acc + (t.duration_minutes || 0), 0)
  const totalHours   = Math.floor(totalMinutes / 60)
  const remMinutes   = totalMinutes % 60
  const durationLabel = totalMinutes > 0
    ? `${totalHours > 0 ? `${totalHours}h ` : ''}${remMinutes > 0 ? `${remMinutes}m` : ''}`.trim()
    : null

  const hasCover = !!series.thumbnail_url

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ minHeight: '72vh' }}>

        {/* Background */}
        {hasCover ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${series.thumbnail_url}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0840] via-[#2c0e68]/80 to-[#2c0e68]/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0840] via-[#2c0e68] to-[#4a0e68]">
            {/* Decorative orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teleiosis-gold/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#4a0e68]/60 rounded-full blur-2xl" />
          </div>
        )}

        {/* Back link — top left */}
        <div className="absolute top-28 left-0 w-full z-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/teachings"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Audio Library
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">

          {/* Label */}
          <p className="text-teleiosis-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-5">
            Teaching Series
          </p>

          {/* Title */}
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 max-w-3xl">
            {series.title}
          </h1>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-bold uppercase tracking-widest">
              <BookOpen size={12} />
              {trackList.length} Part{trackList.length !== 1 ? 's' : ''}
            </span>
            {durationLabel && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-bold uppercase tracking-widest">
                {durationLabel} total
              </span>
            )}
          </div>

          {/* Description */}
          {series.description && (
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              {series.description}
            </p>
          )}
        </div>
      </section>

      {/* ── TRACK LISTING ────────────────────────────────────────── */}
      {trackList.length > 0 ? (
        <SeriesTeachingPlayer teachings={trackList} />
      ) : (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="text-slate-400 text-sm font-medium">
              No teachings uploaded to this series yet. Check back soon.
            </p>
          </div>
        </section>
      )}

      {/* ── MORE SERIES ──────────────────────────────────────────── */}
      {otherSeries && otherSeries.length > 0 && (
        <FadeIn>
          <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between mb-10">
                <div>
                  <p className="text-teleiosis-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Explore More</p>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68]">Other Series</h2>
                </div>
                <Link
                  href="/teachings"
                  className="text-xs font-bold text-[#4a0e68] hover:text-teleiosis-gold uppercase tracking-widest transition-colors hidden sm:block"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {otherSeries.map((s) => (
                  <Link
                    key={s.id}
                    href={`/teachings/series/${s.slug}`}
                    className="group bg-white border border-slate-100 overflow-hidden hover:border-[#4a0e68]/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-[#2c0e68] relative">
                      {s.thumbnail_url ? (
                        <img
                          src={s.thumbnail_url}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2c0e68] to-[#4a0e68] flex items-center justify-center">
                          <BookOpen size={32} className="text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-base text-[#2c0e68] group-hover:text-[#4a0e68] transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-xs font-bold text-teleiosis-gold uppercase tracking-widest mt-2">
                        View Series →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  )
}
