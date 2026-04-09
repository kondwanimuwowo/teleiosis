import type { Metadata } from 'next'
import { FadeIn } from '../components/FadeIn'
import { TeachingsList } from '../components/TeachingsList'

export const metadata: Metadata = {
  title: 'Audio Library | Teachings by Rhema Nyambe',
  description: 'Access the Teleiosis Mandate audio library. Systematic teachings on the Christ Dimension, Priesthood, Kingship, and the Ministry of the Spirit.',
}

const SERIES = [
  {
    title: 'Kingship',
    episodeCount: 4,
    desc: 'What does it mean to reign in life? Covering the doctrine of righteousness, the stance of a king, and a kingdom of words — training believers to exercise their royal authority in Christ.',
    image: '/images/sermon-4.jpg',
  },
  {
    title: 'The Ministry of the Word',
    episodeCount: 4,
    desc: 'A deep exploration of the Word of God as a living force. Includes Part 6: "Prophecy as a Weapon" — equipping believers to wield the spoken Word with precision and authority.',
    image: '/images/pexels-bible-1868359_1280.jpg',
  },
  {
    title: 'The Christ Dimension',
    episodeCount: 3,
    desc: 'Accessing the reality of Christ within. Teachings on In Reality, Accessing the Christ Dimensions, and the Spirit of Truth — going beyond doctrine into lived experience.',
    image: '/images/pexels-bible-1869164_1280.jpg',
  },
  {
    title: 'The Ministry of the Spirit',
    episodeCount: 3,
    desc: "The Holy Spirit is not passive. He is actively at work in you right now. A three-part series on what the Spirit's ministry looks like practically in the life of a son of God.",
    image: '/images/rod-long-TzgZrZQFVPc-unsplash.jpg',
  },
  {
    title: 'Priesthood',
    episodeCount: 3,
    desc: "Orders, responsibilities, and the priestly calling of every believer. A foundational series on the believer's access, intercession, and function as a royal priest before God.",
    image: '/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg',
  },
  {
    title: 'The Lamb of God',
    episodeCount: 2,
    desc: "The most recent series — January 2026. A two-part teaching on God's sacrifice and what the blood of the Lamb accomplishes beyond what most believers have yet received.",
    image: '/images/sermon-3.jpg',
  },
]

export default function TeachingsPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pexels-bible-1869164_1280.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">Audio Library</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Teachings &amp; Bundles
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access a growing library of teachings covering Kingdom authority, sonship, Christian perfection, and the practical revelation of Christ.
          </p>
        </div>
      </section>

      {/* ── FEATURED SERIES ──────────────────────────────────────── */}
      <FadeIn>
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Featured Series</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2c0e68] leading-tight mb-10">Explore By Series</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERIES.map((series) => (
                <div key={series.title} className="bg-white border border-slate-100 overflow-hidden group cursor-pointer hover:border-[#4a0e68]/20 transition-colors">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={series.image}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-teleiosis-gold tracking-widest uppercase">{series.episodeCount} parts</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-2 leading-snug">{series.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{series.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── INTERACTIVE: filter tabs + teachings list + CTA ──────── */}
      <TeachingsList />
    </>
  )
}
