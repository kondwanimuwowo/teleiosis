"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react"
import { PartnershipModal } from "./PartnershipModal"

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "/about",     label: "About" },
  { href: "/teachings", label: "Teachings" },
  { href: "/events",    label: "Events" },
  { href: "/store",     label: "Store" },
  { href: "/blog",      label: "Blog" },
  { href: "/contact",   label: "Contact" },
]

const SOCIALS = [
  { icon: Facebook,  href: 'https://web.facebook.com/Rhemaword27' },
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Youtube,   href: 'https://youtube.com' },
  { icon: Phone,     href: 'tel:+260977964076' },
  { icon: Mail,      href: 'mailto:info@teleiosis.org' },
]

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", damping: 28, stiffness: 220 } },
  exit:   { x: "100%", transition: { type: "spring", damping: 28, stiffness: 220 } },
}

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const linkVariants = {
  hidden:  { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 22, stiffness: 280 } },
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-white/70 hover:text-teleiosis-gold transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-[101] w-[72%] max-w-[300px] flex flex-col overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #1a0840 0%, #14082b 100%)' }}
            >
              {/* Gold top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-teleiosis-gold/60 to-transparent" />

              {/* Header */}
              <div className="px-6 pt-6 pb-5 flex items-start justify-between border-b border-white/8">
                <div>
                  <p className="font-serif font-bold text-lg text-white tracking-[0.25em] leading-none mb-1">
                    TELEIOSIS
                  </p>
                  <p className="text-teleiosis-gold/40 text-[10px] tracking-[0.2em]">τελείωσις</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-white/30 hover:text-teleiosis-gold transition-colors mt-0.5"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <motion.nav
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto py-5 px-4 space-y-0.5"
              >
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href
                  return (
                    <motion.div key={href} variants={linkVariants}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                          isActive
                            ? 'text-teleiosis-gold bg-white/5'
                            : 'text-white/55 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {/* Active indicator */}
                        <span className={`flex-shrink-0 w-0.5 h-4 rounded-full transition-all duration-200 ${
                          isActive ? 'bg-teleiosis-gold' : 'bg-transparent'
                        }`} />
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Divider */}
              <div className="h-px bg-white/8 mx-6" />

              {/* CTAs */}
              <div className="px-6 py-5 flex flex-col gap-2.5">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-teleiosis-gold text-[#14082b] text-sm font-bold hover:bg-teleiosis-gold/90 transition-colors rounded-full"
                >
                  Join Us
                </Link>
                <button
                  onClick={() => setPartnerOpen(true)}
                  className="block w-full text-center px-5 py-3 border border-white/15 text-white/60 text-sm font-semibold hover:border-teleiosis-gold/50 hover:text-teleiosis-gold transition-all duration-200 rounded-full"
                >
                  Partner with Us
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8 mx-6" />

              {/* Social + scripture */}
              <div className="px-6 py-5 flex flex-col items-center gap-3">
                <div className="flex justify-center gap-2">
                  {SOCIALS.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-teleiosis-gold hover:border-teleiosis-gold/40 transition-all duration-200"
                    >
                      <s.icon size={14} />
                    </a>
                  ))}
                </div>
                <p className="text-white/15 text-[9px] text-center tracking-[0.15em] uppercase font-medium">
                  "That Which Is Perfect Is Come"
                </p>
              </div>

              {/* Gold bottom accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-teleiosis-gold/30 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PartnershipModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </div>
  )
}