"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Users, BookOpen, Calendar, Mail, FileText, Facebook, Instagram, Youtube } from "lucide-react"

const NAV_LINKS = [
  { href: "/",          label: "Home",       icon: Home },
  { href: "/about",     label: "About",      icon: Users },
  { href: "/teachings", label: "Teachings",  icon: BookOpen },
  { href: "/events",    label: "Events",     icon: Calendar },
  { href: "/blog",      label: "Blog",       icon: FileText },
  { href: "/contact",   label: "Contact",    icon: Mail },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all active:scale-95"
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

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[101] w-[85%] max-w-sm bg-[#1e0a4d]/85 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <div>
                  <p className="font-serif font-bold text-lg text-white tracking-[0.2em]">TELEIOSIS</p>
                  <p className="text-teleiosis-gold text-[0.6rem] tracking-[0.2em] font-sans font-semibold uppercase">Mandate</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-teleiosis-gold group-hover:text-teleiosis-deep transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium tracking-wide">{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Footer / Connect */}
              <div className="p-8 space-y-8 bg-black/20">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Connect With Us</p>
                  <div className="flex gap-4">
                    {[
                      { icon: Facebook, href: 'https://web.facebook.com/Rhemaword27' },
                      { icon: Instagram, href: 'https://instagram.com' },
                      { icon: Youtube, href: 'https://youtube.com' },
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href} 
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-teleiosis-gold hover:border-teleiosis-gold transition-all"
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Contact</p>
                  <a href="tel:+260977964076" className="block text-sm font-medium text-white/70 hover:text-teleiosis-gold transition-colors">
                    +260 977 964 076
                  </a>
                  <a href="mailto:info@teleiosis.org" className="block text-sm font-medium text-white/70 hover:text-teleiosis-gold transition-colors">
                    info@teleiosis.org
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
