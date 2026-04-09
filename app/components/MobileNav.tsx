"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react"

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
              className="fixed inset-y-0 right-0 z-[101] w-[65%] max-w-[280px] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden bg-white/80 backdrop-blur-2xl saturate-[1.8]"
            >
              {/* Header - Violet */}
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

              {/* Navigation Links - Semi-transparent White */}
              <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-3.5 rounded-xl text-slate-800 hover:text-[#1e0a4d] hover:bg-[#1e0a4d]/5 transition-all group"
                  >
                    <span className="text-lg font-medium tracking-tight whitespace-nowrap">{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Footer - Off-white with 5 Violet Icons in 3+2 layout */}
              <div className="p-8 pb-12 border-t border-slate-200 bg-slate-50 flex flex-col items-center gap-6">
                <div className="space-y-4 w-full">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 text-center">Connect With Us</p>
                  
                  <div className="flex flex-col gap-5">
                    {/* Top Icons (3) */}
                    <div className="flex justify-center gap-4">
                      {[
                        { icon: Facebook,  href: 'https://web.facebook.com/Rhemaword27' },
                        { icon: Instagram, href: 'https://instagram.com' },
                        { icon: Youtube,   href: 'https://youtube.com' },
                      ].map((social, i) => (
                        <a 
                          key={i} 
                          href={social.href} 
                          className="w-10 h-10 rounded-full bg-[#1e0a4d] flex items-center justify-center text-white hover:bg-teleiosis-gold hover:text-[#1e0a4d] hover:scale-110 transition-all duration-300 shadow-sm"
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="w-12 h-px bg-slate-200 mx-auto" />

                    {/* Bottom Icons (2) */}
                    <div className="flex justify-center gap-4">
                      {[
                        { icon: Phone,     href: 'tel:+260977964076' },
                        { icon: Mail,      href: 'mailto:info@teleiosis.org' },
                      ].map((social, i) => (
                        <a 
                          key={i} 
                          href={social.href} 
                          className="w-10 h-10 rounded-full bg-[#1e0a4d] flex items-center justify-center text-white hover:bg-teleiosis-gold hover:text-[#1e0a4d] hover:scale-110 transition-all duration-300 shadow-sm"
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
