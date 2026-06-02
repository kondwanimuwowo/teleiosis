'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

// Module-level singleton — safe since there's only one Lenis instance per page.
let _lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return _lenis
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    _lenis = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      _lenis = null
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <>{children}</>
}
