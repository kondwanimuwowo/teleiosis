export const metadata = {
  title: 'Blog | Insights into Christian Perfection',
  description: 'Explore teachings, devotionals, and news from the Teleiosis Mandate. Deepen your understanding of sonship and Kingdom authority through the Ministry of the Word.',
}

import Link from 'next/link'
import { NewsletterSection } from '../components/NewsletterSection'
import { FadeIn } from '../components/FadeIn'
import { Button } from '../components/ui/button'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function BlogPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/peter-hammer-SXTj90G1f5c-unsplash.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">News &amp; Insights</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Latest From Teleiosis
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Stay updated with teachings, event recaps, testimonies, and insights into Kingdom living.
          </p>
        </div>
      </section>

      {/* ── BLOG GRID ────────────────────────────────────────────── */}
      <FadeIn>
        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-slate-100 flex flex-col group hover:border-[#4a0e68]/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-[#4a0e68]">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-xs text-slate-400">{post.date}</span>
                    </div>
                    <h2 className="font-serif font-bold text-lg text-[#2c0e68] mb-3 leading-snug group-hover:text-[#4a0e68] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 tracking-widest uppercase font-semibold">{post.scripture}</p>
                      <span className="text-sm font-semibold text-teleiosis-gold group-hover:text-[#4a0e68] transition-colors">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Button variant="secondary" size="lg" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────── */}
      <FadeIn>
        <NewsletterSection className="bg-slate-50 py-16 sm:py-20 lg:py-24" />
      </FadeIn>
    </>
  )
}
