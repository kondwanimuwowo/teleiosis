import Link from "next/link"

const NAVIGATE = [
  { href: "/",          label: "Home" },
  { href: "/about",     label: "About" },
  { href: "/teachings", label: "Teachings" },
  { href: "/events",    label: "Events" },
  { href: "/blog",      label: "Blog" },
  { href: "/contact",   label: "Contact" },
]

const PROGRAMS = [
  "Manifested Sons of God Class",
  "Unto Perfection Conference",
  "The Glorious Mandate",
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#2c0e68] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand + newsletter ─────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Wordmark */}
            <div>
              <p className="font-serif font-bold text-2xl text-white tracking-[0.2em]">TELEIOSIS</p>
              <p className="text-teleiosis-gold text-[0.65rem] tracking-[0.25em] font-sans font-semibold uppercase mt-0.5">
                Mandate
              </p>
            </div>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              A community devoted to the practical revelation of the risen Christ — training the sons of God into Christian perfection and Kingdom authority.
            </p>

            <p className="text-white/30 text-xs font-serif italic leading-relaxed">
              "That Which Is Perfect Is Come"
              <span className="ml-2 not-italic tracking-widest">ΤΕΛΕΙΩΣΙΣ</span>
            </p>

            {/* Newsletter signup */}
            <div className="mt-1">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Stay Updated
              </p>
              <form className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/8 border border-white/12 text-white text-sm placeholder-white/35 focus:outline-none focus:border-teleiosis-gold/60 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-teleiosis-gold text-teleiosis-deep text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* ── Navigate ───────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <h3 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-3">
              Navigate
            </h3>
            {NAVIGATE.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-1 text-sm text-white/55 hover:text-teleiosis-gold transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Programs + Social + Contact ────────────── */}
          <div className="flex flex-col gap-8">

            {/* Programs */}
            <div>
              <h3 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-3">
                Programs
              </h3>
              <div className="flex flex-col gap-1">
                {PROGRAMS.map((p) => (
                  <p key={p} className="py-1 text-sm text-white/55">{p}</p>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-3">
                Follow Us
              </h3>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-3">
                Contact
              </h3>
              <div className="flex flex-col gap-1.5">
                <a href="tel:+260976779008"
                  className="text-sm text-white/55 hover:text-teleiosis-gold transition-colors">
                  +260 97 6 779 008
                </a>
                <a href="mailto:info@teleiosis.org"
                  className="text-sm text-white/55 hover:text-teleiosis-gold transition-colors">
                  info@teleiosis.org
                </a>
                <p className="text-sm text-white/35">Lusaka, Zambia</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/35 text-xs">
            &copy; {year} Teleiosis Mandate. All rights reserved.
          </p>
          <p className="text-white/25 text-xs font-serif italic">
            Lusaka, Zambia
          </p>
        </div>

      </div>
    </footer>
  )
}
