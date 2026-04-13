import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, CalendarDays } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { FadeIn } from '@/app/components/FadeIn'
import { NewsletterSection } from '@/app/components/NewsletterSection'

interface Props {
  params: Promise<{ slug: string }>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()

  if (!data) return {}
  return {
    title: `${data.title} | Teleiosis Blog`,
    description: data.excerpt,
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  Devotional: 'bg-amber-50 text-amber-700 border-amber-200',
  Teaching:   'bg-[#4a0e68]/8 text-[#4a0e68] border-[#4a0e68]/20',
  News:       'bg-slate-100 text-slate-600 border-slate-200',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('id, slug, category, title, excerpt, published_at, image_url')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3)

  const related = relatedPosts ?? []

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ minHeight: '65vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${post.image_url}')` }}
        />
        {/* layered overlays for depth */}
        <div className="absolute inset-0 bg-[#2c0e68]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0840]/90 via-transparent to-transparent" />

        <div className="relative z-10 w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-36 pb-14 sm:pb-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold tracking-widest uppercase mb-8 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>

          {/* Category badge */}
          <p className="text-teleiosis-gold text-xs font-bold tracking-[0.3em] uppercase mb-5">
            {post.category}
          </p>

          {/* Title */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-6 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-white/50 text-xs">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.read_time}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={13} />
              {post.scripture}
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ──────────────────────────────────────── */}
      <FadeIn>
        <div className="bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

            {/* Scripture pull-quote */}
            <blockquote className="relative mb-12 pl-6 border-l-2 border-teleiosis-gold">
              <p className="text-lg sm:text-xl text-[#4a0e68] leading-relaxed">
                {post.scripture_text}
              </p>
            </blockquote>

            {/* Body paragraphs */}
            <div className="prose-teleiosis space-y-6">
              {(post.body as string[]).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-slate-700 text-base sm:text-[17px] leading-[1.85] tracking-[0.01em]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags / category row */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {post.category}
              </span>
              <p className="text-xs text-slate-400">{post.scripture}</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── RELATED POSTS ─────────────────────────────────────── */}
      {related.length > 0 && (
        <FadeIn delay={0.1}>
          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-teleiosis-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Continue Reading</p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68] mb-10">More from Teleiosis</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white border border-slate-100 overflow-hidden hover:border-[#4a0e68]/20 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                      <img
                        src={rel.image_url}
                        alt={rel.title}
                        width={560}
                        height={315}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#4a0e68]">{rel.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] text-slate-400">{formatDate(rel.published_at)}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#2c0e68] leading-snug mb-2 group-hover:text-[#4a0e68] transition-colors flex-1">
                        {rel.title}
                      </h3>
                      <span className="text-xs font-semibold text-teleiosis-gold group-hover:text-[#4a0e68] transition-colors mt-3">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <FadeIn>
        <NewsletterSection className="bg-white py-16 sm:py-20 lg:py-24" />
      </FadeIn>
    </>
  )
}
