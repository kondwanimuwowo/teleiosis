import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { FadeIn } from '../components/FadeIn'
import { TeachingsList } from '../components/TeachingsList'

export const metadata: Metadata = {
  title: 'Audio Library | Teachings by Rhema Nyambe',
  description: 'Access the Teleiosis Mandate audio library. Systematic teachings on the Christ Dimension, Priesthood, Kingship, and the Ministry of the Spirit.',
}

export default async function TeachingsPage() {
  const supabase = await createSupabaseServerClient()

  // Fetch all series
  const { data: seriesList } = await supabase
    .from('teaching_series')
    .select('id, title, description, thumbnail_url, slug')
    .order('created_at', { ascending: false })

  // Fetch teaching counts per series
  const { data: teachingRows } = await supabase
    .from('teachings')
    .select('series_id')
    .not('series_id', 'is', null)

  const countBySeries: Record<string, number> = {}
  teachingRows?.forEach((t) => {
    if (t.series_id) countBySeries[t.series_id] = (countBySeries[t.series_id] ?? 0) + 1
  })

  const series = seriesList ?? []

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pexels-bible-1869164_1280.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">Audio Library</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Teachings &amp; Series
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access a growing library of teachings covering Kingdom authority, sonship, Christian perfection, and the practical revelation of Christ.
          </p>
        </div>
      </section>

      {/* ── SERIES GRID ──────────────────────────────────────────── */}
      {series.length > 0 && (
        <FadeIn>
          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Featured Series</p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2c0e68] leading-tight mb-10">Explore By Series</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {series.map((s) => {
                  const count = countBySeries[s.id] ?? 0
                  return (
                    <Link
                      key={s.id}
                      href={`/teachings/series/${s.slug}`}
                      className="bg-white border border-slate-100 overflow-hidden group hover:border-[#4a0e68]/20 hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      {/* Cover */}
                      <div className="aspect-[16/9] overflow-hidden bg-[#2c0e68] relative">
                        {s.thumbnail_url ? (
                          <>
                            <img
                              src={s.thumbnail_url}
                              alt={s.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0840]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#2c0e68] to-[#4a0e68] flex items-center justify-center">
                            <BookOpen size={40} className="text-white/15" />
                          </div>
                        )}
                        {/* Part count badge */}
                        {count > 0 && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 bg-teleiosis-gold text-[#2c0e68] text-[10px] font-bold uppercase tracking-widest">
                            {count} Part{count !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-serif font-bold text-lg text-[#2c0e68] group-hover:text-[#4a0e68] transition-colors leading-snug mb-2">
                          {s.title}
                        </h3>
                        {s.description && (
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
                            {s.description}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teleiosis-gold uppercase tracking-widest group-hover:gap-3 transition-all duration-200">
                          Listen Now →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── INTERACTIVE: filter tabs + teachings list + CTA ──────── */}
      <TeachingsList />
    </>
  )
}
