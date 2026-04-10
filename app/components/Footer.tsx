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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand + newsletter ─────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">

            {/* Wordmark */}
            <div>
              <p className="font-serif font-bold text-2xl text-white tracking-[0.2em]">TELEIOSIS</p>
              <p className="text-teleiosis-gold text-[0.65rem] tracking-[0.25em] font-sans font-semibold uppercase mt-0.5">
                Mandate
              </p>
            </div>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              A community devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority.
            </p>

            <p className="text-white/30 text-xs font-serif leading-relaxed">
              "That Which Is Perfect Is Come"
            </p>

            {/* Newsletter signup */}
            <div className="mt-2">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                Stay Updated
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-sm">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-teleiosis-gold/60 transition-all"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-full bg-teleiosis-gold text-[#2c0e68] text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Join Us
                </button>
              </form>
            </div>
          </div>

          {/* ── Navigate (Left on mobile/tablet) ───────────────────────────────── */}
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

          {/* ── Connect With Us (Right on mobile/tablet) ────────────── */}
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

            {/* Connect Section */}
            <div className="flex flex-col gap-5">
              <h3 className="font-serif font-bold text-sm text-white uppercase tracking-widest">
                Connect With Us
              </h3>
              
              <div className="flex flex-col gap-4">
                {/* Social Icons (3) */}
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a href="https://web.facebook.com/Rhemaword27" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                  </a>
                </div>

                {/* Contact Icons (2) */}
                <div className="flex items-center gap-3">
                  {/* Phone */}
                  <a href="tel:+260977964076" aria-label="Phone"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </a>
                  {/* Email */}
                  <a href="mailto:info@teleiosis.org" aria-label="Email"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
          <p className="text-white/35 text-xs">
            &copy; {year} Teleiosis Mandate. All rights reserved.
          </p>
          {/* Admin portal — intentionally subtle */}
          <a
            href="/admin"
            aria-label="Admin"
            className="text-[#2c0e68] hover:text-white/15 transition-colors duration-500 text-[10px] select-none"
            tabIndex={-1}
          >
            τ
          </a>
        </div>

      </div>
    </footer>
  )
}
