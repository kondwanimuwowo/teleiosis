import Link from "next/link"
import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react"
import { NewsletterForm } from './NewsletterForm'

const SOCIALS = [
  { icon: Facebook,  href: 'https://web.facebook.com/Rhemaword27', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube,   href: 'https://youtube.com', label: 'YouTube' },
  { icon: Phone,     href: 'tel:+260977964076', label: 'Phone' },
  { icon: Mail,      href: 'mailto:info@teleiosis.org', label: 'Email' },
]

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
    <footer className="bg-[#14082b]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand + newsletter ─────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">

            {/* Wordmark */}
            <div>
              <p className="font-serif font-bold text-2xl text-white tracking-[0.2em]">TELEIOSIS</p>
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
              <NewsletterForm />
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
              
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-teleiosis-gold hover:text-[#2c0e68] transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-xs">
            &copy; {year} Teleiosis Mandate. All rights reserved.{' '}
            {/* Admin portal — intentionally subtle */}
            <a
              href="/admin"
              aria-label="Admin"
              className="text-[#2c0e68] hover:text-white/15 transition-colors duration-500 select-none"
              tabIndex={-1}
            >
              τ
            </a>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
