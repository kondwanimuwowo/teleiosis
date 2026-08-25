"use client"

import { useEffect, useState } from "react"

export function NavScrollWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#14082b]/95 backdrop-blur-xl shadow-lg shadow-black/25"
          : "bg-transparent"
      }`}
    >
      {/* Subtle height compression on scroll — creates the "lift" feeling */}
      <div className={`transition-all duration-300 ${scrolled ? "py-0" : "py-1.5"}`}>
        {children}
      </div>
    </nav>
  )
}
