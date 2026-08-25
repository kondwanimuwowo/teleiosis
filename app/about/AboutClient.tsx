'use client'

import { useState, useEffect } from 'react'
import { Users, ScrollText, Handshake } from 'lucide-react'
import { CTASection } from '../components/CTASection'
import { getLenis } from '../components/SmoothScroll'

type Stat = { id: string; value: string; label: string; sort_order: number }
type TeamMember = { id: string; name: string; initials: string; title: string | null; location: string | null; bio: string | null; image_url: string | null; sort_order: number }

const TABS = [
  { id: 'who-we-are',   label: 'Who We Are',   Icon: Users },
  { id: 'our-mandate',  label: 'Our Mandate',  Icon: ScrollText },
  { id: 'co-labourers', label: 'Co-Labourers', Icon: Handshake },
] as const

type TabId = typeof TABS[number]['id']

const PILLARS = [
  { number: '01', title: 'Reveal',  description: 'Reveal the presence, power, and person of the risen Christ to believers and the world through teaching, prayer, and prophetic proclamation.' },
  { number: '02', title: 'Train',   description: 'Train believers in the depths of Kingdom authority, sonship, and Christian perfection through systematic discipleship and conferences.' },
  { number: '03', title: 'Perfect', description: 'Perfect the saints into the fullness of Christ, equipping them to manifest Kingdom authority in their families, workplaces, and communities.' },
]

const COMMITMENTS = [
  { title: 'Sound Doctrine',              desc: 'All teachings are grounded in Scripture and tested against the revelation of Christ.' },
  { title: 'Practical Application',       desc: 'We focus on real-life implementation of Kingdom authority in daily decisions and relationships.' },
  { title: 'Community & Accountability',  desc: 'Growth happens best in a community of believers who challenge and support one another.' },
]

const TIMELINE = [
  {
    year: '2014',
    title: 'GraceGalore Begins',
    body: "Rhema Nyambe begins sending daily devotionals to a small group of believers. The message: God's grace is not just forgiveness, it is the divine enablement of God at work in a man. \"Grace is the person of Jesus Christ. You have Who it takes to make it.\"",
    scripture: 'Phil 4:13',
  },
  {
    year: '2017',
    title: 'The Perfection Revelation',
    body: '"The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. That which is perfect is come." The devotionals begin turning from foundational grace to the deeper message of teleiosis, the full maturity of believers in Christ.',
    scripture: '1 Cor 13:10',
  },
  {
    year: '2020',
    title: 'Teleiosis Mandate Launched',
    body: "What began as a devotional movement became a teaching mandate. Rhema launched the Teleiosis Mandate in Lusaka, establishing the Manifested Sons of God Class, a fortnightly Saturday gathering at Emperor's Crown Olympia, Chainama Road, dedicated to deep systematic teaching.",
    scripture: 'Rom 8:19',
  },
  {
    year: '2023',
    title: 'The Audio Library Grows',
    body: 'The fortnightly Saturday classes are recorded and released as a growing audio library. Series on The Christ Dimension, Priesthood, Kingship, The God Frequency, and The Ministry of the Word equip believers across Zambia and beyond.',
    scripture: 'Eph 4:13',
  },
  {
    year: '2026',
    title: 'The Growing Mandate',
    body: 'With a growing community of believers across Zambia and an expanding reach through the audio library, the Teleiosis Mandate is fulfilling its call: to reveal Christ, train believers, and perfect the saints into the fullness of God.',
    scripture: 'Col 1:28',
  },
]

// Offset accounts for main nav (80px) + sticky tab bar (~56px)
const SCROLL_OFFSET = -136

export function AboutClient({ stats, team }: { stats: Stat[]; team: TeamMember[] }) {
  const STATS = stats.length > 0 ? stats : [
    { id: '1', value: '500+', label: 'Lives Transformed', sort_order: 0 },
    { id: '2', value: '10+',  label: 'Years of Ministry', sort_order: 1 },
    { id: '3', value: '10+',  label: 'Conferences Held',  sort_order: 2 },
    { id: '4', value: '∞',    label: "God's Grace",       sort_order: 3 },
  ]

  const [activeSection, setActiveSection] = useState<TabId>('who-we-are')

  // Highlight active tab based on which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as TabId)
          }
        })
      },
      { rootMargin: '-100px 0px -55% 0px', threshold: 0 }
    )

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Handle direct URL hash on load (e.g. /about#our-mandate)
  useEffect(() => {
    const hash = window.location.hash.slice(1) as TabId
    if (hash && TABS.some((t) => t.id === hash)) {
      const el = document.getElementById(hash)
      if (el) {
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(el, { offset: SCROLL_OFFSET, immediate: true })
        } else {
          el.scrollIntoView()
        }
      }
    }
  }, [])

  const scrollToSection = (id: TabId) => {
    history.pushState(null, '', `#${id}`)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/image_3.jpg')" }} />
        <div className="absolute inset-0 bg-[#170936]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            About Teleiosis
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            A movement devoted to the practical revelation of Christ, training believers into the fullness of sonship, Kingdom authority, and Christian perfection.
          </p>
        </div>
      </section>

      {/* ── SECTION NAV ──────────────────────────────────────────── */}
      <div className="bg-white shadow-sm sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-3">
            <div className="inline-flex bg-slate-50 rounded-full overflow-hidden">
              {TABS.map(({ id, label, Icon }) => {
                const isActive = activeSection === id
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    aria-current={isActive ? 'true' : undefined}
                    style={{ minHeight: 44 }}
                    className={`flex items-center gap-2 text-sm font-semibold transition-colors rounded-full ${
                      isActive
                        ? 'bg-[#2c0e68] text-white'
                        : 'text-slate-500 hover:text-[#2c0e68] hover:bg-slate-100'
                    } sm:px-8 sm:py-3 px-4 py-3`}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="whitespace-nowrap">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE ───────────────────────────────────────────── */}
      <section id="who-we-are" className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-6">
                Called to a higher standard
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                The Teleiosis Mandate is a ministry movement grounded in the revelation of Christian perfection, the full maturity and manifestation of the sons of God in the earth.
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                We gather believers who hunger to move beyond the basics and into the deep things of God's Kingdom, to understand their identity, authority, and purpose as sons and daughters of God.
              </p>
              <blockquote className="border-l-2 border-teleiosis-gold pl-5">
                <p className="text-[#4a0e68] text-base sm:text-lg leading-relaxed mb-2">
                  "Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ:"
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
                    i === 0 || i === 3 ? 'bg-[#2c0e68] text-white' :
                    'bg-slate-50 shadow-sm text-[#2c0e68]'
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

      {/* Leadership */}
      <section className="bg-slate-50 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-12">
            Meet Rhema Nyambe
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="aspect-[4/5] overflow-hidden max-w-sm mx-auto lg:mx-0">
              <img
                src="/images/rhema-edith-daughter.jpg"
                alt="Rhema Nyambe with his wife Edith and daughter Brielle Liseli"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="pt-8 lg:pt-0">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68] mb-1">Rhema Nyambe</h3>
              <p className="text-teleiosis-gold font-semibold text-sm mb-1">Founder &amp; Leader, Teleiosis Mandate</p>
              <p className="text-slate-400 text-xs mb-6">Theology Graduate, Rhema Bible Training Center Zambia &nbsp;·&nbsp; Architect</p>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                Rhema is a minister, teacher, and architect with a burning passion for the revelation of Christian perfection. A theology graduate of Rhema Bible Training Center Zambia, he leads the Teleiosis Mandate based in Lusaka with a heart to see believers walk in the fullness of their inheritance in Christ, not just in theory, but in practical, lived reality.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                What began as a devotional ministry called <em>GraceGalore</em> in 2014, a daily word of encouragement to a small group of believers, grew into a full teaching and discipleship movement. By 2020, the revelation had deepened: God was calling His people not merely to grace, but to <em>teleiosis</em>: completion, maturity, the fullness of Christ.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Through conferences, fortnightly Saturday classes, and an expanding audio library, Rhema presses on with his wife Edith by his side to equip believers across Zambia and beyond to manifest Kingdom authority in every area of their lives. Together they are parents to their daughter, Brielle Liseli Nyambe.
              </p>
              <div className="flex gap-5">
                <a href="https://web.facebook.com/Rhemaword27" className="text-sm font-semibold text-[#4a0e68] hover:text-teleiosis-gold transition-colors min-h-[44px] flex items-center">Facebook</a>
                <a href="https://youtube.com" className="text-sm font-semibold text-[#4a0e68] hover:text-teleiosis-gold transition-colors min-h-[44px] flex items-center">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MANDATE ──────────────────────────────────────────── */}
      <section id="our-mandate" className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-6">
                What is teleiosis?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-5">
                Teleiosis comes from the Greek word τελείωσις (teleiósis), which means "perfection," "completion," "maturity," or "full development."
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                In the New Testament, it refers specifically to the process of believers being brought to their full spiritual maturity and completeness in Christ, not just salvation, but the full realisation of what it means to be a son or daughter of God.
              </p>
              <blockquote className="border-l-2 border-teleiosis-gold pl-5">
                <p className="text-[#4a0e68] text-base sm:text-lg leading-relaxed mb-2">
                  "Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ:"
                </p>
                <cite className="text-xs text-slate-400 not-italic">Ephesians 4:13</cite>
              </blockquote>
            </div>
            <div className="aspect-square bg-slate-100 lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Origins Timeline */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-4">
            How teleiosis was born
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-16 max-w-2xl">
            The Teleiosis Mandate did not begin with a conference or a vision document. It began with a daily word, a devotional called <em>GraceGalore</em>, sent every morning by a young minister in Lusaka, Zambia.
          </p>
          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-12">
              {TIMELINE.map(({ year, title, body, scripture }) => (
                <div key={year} className="relative pl-12 sm:pl-16">
                  <div className="absolute left-[11px] sm:left-[19px] top-1 w-3 h-3 rounded-full bg-teleiosis-gold border-2 border-white ring-2 ring-teleiosis-gold/30" />
                  <p className="text-teleiosis-gold text-xs font-bold tracking-[0.2em] uppercase mb-1">{year}</p>
                  <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-3">{title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-2">{body}</p>
                  <p className="text-xs text-slate-400 font-semibold">{scripture}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-slate-50 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-12">
            The three pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ number, title, description }) => (
              <div key={number} className="bg-white p-6 sm:p-8 flex flex-col shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-3">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#2c0e68]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-12">
            Walking in the fullness
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMITMENTS.map(({ title, desc }) => (
              <div key={title} className="rounded-2xl bg-white/5 p-6 sm:p-8 hover:bg-white/10 transition-all duration-300">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-3">{title}</h3>
                <p className="text-white/60 text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CO-LABOURERS ─────────────────────────────────────────── */}
      <section
        id="co-labourers"
        className="py-20 sm:py-28 lg:py-32 bg-[#2c0e68]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-16">
            Our co-labourers
          </h2>

          {team.length === 0 ? (
            <div className="py-20 text-center bg-white/5 rounded-2xl">
              <p className="text-white/30 text-sm">Team members will appear here once added.</p>
            </div>

          ) : team.length === 1 ? (
            /* ── Single member: editorial spread ── */
            (() => {
              const member = team[0]
              return (
                <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start max-w-5xl">
                  {/* Portrait */}
                  <div className="relative">
                    {member.image_url ? (
                      <div className="aspect-[3/4] overflow-hidden max-w-xs shadow-md">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] max-w-xs bg-white/[0.04] flex items-center justify-center">
                        <span className="font-serif font-bold text-7xl text-teleiosis-gold/30">{member.initials}</span>
                      </div>
                    )}
                    {/* Gold accent line */}
                    <div className="absolute -bottom-4 left-0 w-16 h-px bg-teleiosis-gold/60" />
                  </div>

                  {/* Text */}
                  <div className="lg:pt-4">
                    <h3 className="font-serif font-bold text-4xl sm:text-5xl text-white leading-[1.05] mb-2">
                      {member.name}
                    </h3>
                    {member.title && (
                      <p className="text-teleiosis-gold font-semibold text-sm mb-1">{member.title}</p>
                    )}
                    {member.location && (
                      <p className="text-white/30 text-xs tracking-widest uppercase mb-8">{member.location}</p>
                    )}
                    {member.bio && (
                      <div className="mt-8">
                        <p className="text-white/65 text-base sm:text-lg leading-relaxed">{member.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()

          ) : (
            /* ── Multiple members: responsive grid ── */
            <div className={`grid grid-cols-1 gap-5 ${
              team.length === 2 ? 'sm:grid-cols-2 max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white/[0.04] p-6 flex flex-col gap-4 hover:bg-white/[0.08] transition-all duration-300 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-14 object-cover flex-shrink-0"
                        style={{ height: '74px' }}
                      />
                    ) : (
                      <div className="w-14 flex-shrink-0 bg-white/[0.04] flex items-center justify-center"
                        style={{ height: '74px' }}>
                        <span className="font-serif font-bold text-lg text-teleiosis-gold/40">{member.initials}</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-serif font-bold text-base text-white leading-tight truncate">{member.name}</h3>
                      {member.title && (
                        <p className="text-teleiosis-gold text-xs font-semibold mt-0.5 truncate">{member.title}</p>
                      )}
                      {member.location && (
                        <p className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">{member.location}</p>
                      )}
                    </div>
                  </div>
                  {member.bio && (
                    <p className="text-white/55 text-sm leading-relaxed mt-1">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Partner With Our Team"
        description="Are you called to co-labour in advancing the revelation of Christ and the training of believers? We're always looking for dedicated partners."
        buttonText="Get in Touch"
        buttonHref="/contact"
        className="bg-slate-50 py-20 sm:py-28 lg:py-32"
      />
    </>
  )
}
