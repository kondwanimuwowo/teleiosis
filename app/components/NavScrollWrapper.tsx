"use client"

import { useEffect, useState } from "react"

export function NavScrollWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-black/20" : ""
      }`}
      style={{ background: 'linear-gradient(160deg, #1a0840 0%, #14082b 100%)' }}
    >
      {children}
    </nav>
  )
}
