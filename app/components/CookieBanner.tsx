'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'teleiosis-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'necessary')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none"
        >
          <div
            className="w-full max-w-2xl pointer-events-auto rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(26, 8, 64, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Gold top accent line */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 40%, #d4af37 60%, transparent)' }} />

            <div className="px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-start gap-4">

                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <Cookie size={16} className="text-teleiosis-gold" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm mb-1">
                    We use cookies
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    We use essential cookies to keep the site working and optional cookies to improve your experience.
                    Read our{' '}
                    <Link href="/cookie-policy" className="text-teleiosis-gold/70 hover:text-teleiosis-gold transition-colors underline underline-offset-2">
                      Cookie Policy
                    </Link>{' '}
                    to learn more.
                  </p>
                </div>

                {/* Dismiss (decline) */}
                <button
                  onClick={decline}
                  aria-label="Use necessary cookies only"
                  className="flex-shrink-0 p-1.5 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5 mt-0.5"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-5 sm:mt-4 justify-end">
                <button
                  onClick={decline}
                  className="px-4 py-2 text-xs text-white/50 hover:text-white/80 transition-colors rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5"
                >
                  Necessary Only
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)', color: '#14082b' }}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
