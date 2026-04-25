"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/",            label: "Home" },
  { href: "/about",       label: "About" },
  { href: "/teachings",   label: "Teachings" },
  { href: "/events",      label: "Events" },
  { href: "/store",       label: "Store" },
  { href: "/blog",        label: "Blog" },
  { href: "/contact",     label: "Contact" },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop nav, centered */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'text-teleiosis-gold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
