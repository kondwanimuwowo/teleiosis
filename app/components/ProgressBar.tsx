'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Start animation on route change
    setIsAnimating(true)
    
    // Simple mock timing for the loading bar
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ width: 0, opacity: 1 }}
          animate={{ width: '100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none"
          style={{ backgroundColor: '#e4ac05', boxShadow: '0 0 12px 2px rgba(228, 172, 5, 0.6)' }}
        />
      )}
    </AnimatePresence>
  )
}
