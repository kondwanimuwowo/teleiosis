"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

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

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown panel */}
          <div className="absolute right-0 top-full mt-2 w-64 z-50 rounded-xl bg-[#1e0a4d] border border-white/10 shadow-md shadow-black/20 overflow-hidden">
            <div className="py-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-5 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 p-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-2.5 rounded-full bg-teleiosis-gold text-teleiosis-deep text-sm font-semibold hover:bg-teleiosis-gold/85 transition-colors"
              >
                Join Us
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
