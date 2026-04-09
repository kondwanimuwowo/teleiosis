"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react"

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "/about",     label: "About" },
  { href: "/teachings", label: "Teachings" },
  { href: "/events",    label: "Events" },
  { href: "/blog",      label: "Blog" },
  { href: "/contact",   label: "Contact" },
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

      <AnimatePresence mode="wait">
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
              className="fixed inset-y-0 right-0 z-[101] w-[65%] max-w-[280px] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header - Purple */}
              <div className="p-6 flex items-center justify-between border-b border-white/10 bg-[#1e0a4d]">
                <div>
                  <p className="font-serif font-bold text-lg text-white tracking-[0.2em]">TELEIOSIS</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links - White Middle */}
              <nav className="flex-1 overflow-y-auto py-10 px-6 space-y-2 bg-white flex flex-col justify-center">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-4 rounded-xl text-[#1e0a4d]/70 hover:text-[#1e0a4d] hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-base font-bold uppercase tracking-widest">{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Footer / Connect - Purple Bottom */}
              <div className="p-8 space-y-8 bg-[#1e0a4d]/95 backdrop-blur-md">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 text-center sm:text-left">Connect</p>
                  <div className="flex justify-center sm:justify-start gap-4">
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
                <div className="space-y-2 text-center sm:text-left">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Contact</p>
                  <a href="tel:+260977964076" className="block text-xs font-medium text-white/60 hover:text-teleiosis-gold transition-colors">
                    +260 977 964 076
                  </a>
                  <a href="mailto:info@teleiosis.org" className="block text-xs font-medium text-white/60 hover:text-teleiosis-gold transition-colors">
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
