export const metadata = {
  title: 'Blog | Insights into Christian Perfection',
  description: 'Explore teachings, devotionals, and news from the Teleiosis Mandate. Deepen your understanding of sonship and Kingdom authority through the Ministry of the Word.',
}

import { NewsletterSection } from '../components/NewsletterSection'
import { FadeIn } from '../components/FadeIn'
import { Button } from '../components/ui/button'

const BLOG_POSTS = [
  {
    id: 1,
    category: 'Devotional',
    title: 'That Which Is Perfect Is Come',
    excerpt: 'The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. The work of Jesus in His death, burial and resurrection accomplished for us more than what we are experiencing now.',
    date: 'Apr 2, 2026',
    scripture: '1 Cor 13:10',
    image: '/images/pexels-bible-1869164_1280.jpg',
  },
  {
    id: 2,
    category: 'Teaching',
    title: 'The Lamb of God: Understanding God\'s Sacrifice',
    excerpt: 'A two-part teaching exploring the depth of what the sacrifice of the Lamb accomplishes for every believer — not just forgiveness, but the full restoration of our identity, authority, and standing before God.',
    date: 'Mar 28, 2026',
    scripture: 'John 1:29',
    image: '/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg',
  },
  {
    id: 3,
    category: 'Devotional',
    title: 'The Perfection of God Is in Christ',
    excerpt: 'It is wrong for you to judge yourself as imperfect, because you are judging one that is a member of Christ. We have to discern the body of Christ. Declare the Glory of God that is in you. You are one with Him.',
    date: 'Mar 20, 2026',
    scripture: 'Eph 5:30',
    image: '/images/pexels-bible-1868359_1280.jpg',
  },
  {
    id: 4,
    category: 'News',
    title: 'New Series: The Ministry of the Spirit',
    excerpt: 'Three new Saturday class recordings are now available — exploring the active, transforming work of the Holy Spirit in the life of the believer. The Spirit is not passive. He is doing something right now on the inside of you.',
    date: 'Mar 12, 2026',
    scripture: 'Acts 1:8',
    image: '/images/sermon-3.jpg',
  },
  {
    id: 5,
    category: 'Devotional',
    title: 'Don\'t Advertise God Small',
    excerpt: 'You are the head and not the tail. Jesus died to make us the First and the Best in all areas of our lives. Through you God is showing the world His Power. Show forth His excellence in all that concerns you.',
    date: 'Mar 5, 2026',
    scripture: 'Eph 2:10',
    image: '/images/sermon-4.jpg',
  },
  {
    id: 6,
    category: 'Teaching',
    title: 'Kingship: Training for Reigning',
    excerpt: 'A four-part series from the Manifested Sons Class on what it means to walk as a king in the Kingdom of God — covering the doctrine of righteousness, the stance of a king, and a kingdom of words.',
    date: 'Feb 25, 2026',
    scripture: 'Rom 5:17',
    image: '/images/rod-long-TzgZrZQFVPc-unsplash.jpg',
  },
]

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
                <article key={post.id} className="bg-white border border-slate-100 flex flex-col group cursor-pointer hover:border-[#4a0e68]/20 transition-colors overflow-hidden">
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
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
                </article>
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
