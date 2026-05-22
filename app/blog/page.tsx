import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NewsletterSection } from '../components/NewsletterSection'
import { FadeIn } from '../components/FadeIn'

export const metadata: Metadata = {
  title: 'Blog | Insights into Christian Perfection',
  description: 'Explore teachings, devotionals, and news from the Teleiosis Mandate. Deepen your understanding of sonship and Kingdom authority through the Ministry of the Word.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function BlogData() {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, slug, category, title, excerpt, published_at, read_time, scripture, image_url')
    .order('published_at', { ascending: false })

  const blogPosts = posts ?? []

  return (
    <FadeIn>
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.map((post) => (
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
                  <h2 className="font-serif font-bold text-lg text-[#2c0e68] mb-3 leading-snug group-hover:text-[#4a0e68] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold">{post.scripture}</p>
                    <span className="text-sm font-semibold text-teleiosis-gold group-hover:text-[#4a0e68] transition-colors">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {blogPosts.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-16">No posts published yet. Check back soon.</p>
          )}
        </div>
      </section>
    </FadeIn>
  )
}

function BlogGridSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 overflow-hidden animate-pulse rounded-xl"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[16/9] bg-slate-100" />
              <div className="p-6 space-y-3">
                <div className="flex gap-2">
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                  <div className="h-3 w-12 bg-slate-100 rounded" />
                </div>
                <div className="h-5 w-full bg-slate-100 rounded" />
                <div className="h-5 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                  <div className="h-3 w-12 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function BlogPage() {
  return (
    <>
      {/* ── HERO — static ─────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/peter-hammer-SXTj90G1f5c-unsplash.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">News &amp; Insights</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Latest From Teleiosis
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Stay updated with teachings, event recaps, testimonies, and insights into Kingdom living.
          </p>
        </div>
      </section>

      {/* ── DATA — skeleton while loading ─────────────────────────── */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogData />
      </Suspense>

      {/* ── NEWSLETTER — static ───────────────────────────────────── */}
      <FadeIn>
        <NewsletterSection
          title="Never Miss a Teaching"
          description="Subscribe to be the first to know about new audio releases, teaching series, and upcoming conferences."
          className="bg-slate-50 py-16 sm:py-20 lg:py-24"
        />
      </FadeIn>
    </>
  )
}
