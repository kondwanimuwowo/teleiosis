"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()

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
        className="p-2 rounded-lg text-white/70 hover:text-teleiosis-gold transition-colors"
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
              className="fixed inset-0 z-[100] bg-black/40"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[101] w-[70%] max-w-[300px] bg-[#f8f7ff] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b-4 border-[#4a0e68]/20 bg-[#faf9ff]">
                <span className="font-serif font-bold text-xl text-[#2c0e68] tracking-[0.2em]">
                  TELEIOSIS
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-[#4a0e68]/60 hover:text-teleiosis-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all font-bold text-sm tracking-wide ${
                        isActive
                          ? 'text-teleiosis-gold bg-teleiosis-gold/5'
                          : 'text-[#4a0e68]/80 hover:text-teleiosis-gold hover:bg-teleiosis-gold/5'
                      }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>

              {/* Divider */}
              <div className="h-px bg-[#4a0e68]/10" />

              {/* Join Us Button */}
              <div className="px-6 py-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-lg bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors shadow-sm shadow-teleiosis-gold/20"
                >
                  Join Us
                </Link>
              </div>

              {/* Footer - Social Links */}
              <div className="p-6 flex flex-col items-center gap-4 border-t-4 border-[#4a0e68]/20 bg-[#faf9ff]">
                <p className="text-[#4a0e68]/70 text-[10px] font-bold tracking-[0.3em] uppercase">Connect with us</p>

                <div className="flex justify-center gap-3">
                  {[
                    { icon: Facebook,  href: 'https://web.facebook.com/Rhemaword27' },
                    { icon: Instagram, href: 'https://instagram.com' },
                    { icon: Youtube,   href: 'https://youtube.com' },
                    { icon: Phone,     href: 'tel:+260977964076' },
                    { icon: Mail,      href: 'mailto:info@teleiosis.org' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-9 h-9 rounded-full border border-[#4a0e68]/20 flex items-center justify-center text-[#4a0e68]/60 hover:text-teleiosis-gold hover:bg-teleiosis-gold/10 hover:border-teleiosis-gold transition-all duration-200"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
