'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

declare global {
  interface Window {
    LencoPay: {
      getPaid: (options: LencoOptions) => void
    }
  }
}

interface LencoOptions {
  key: string
  email: string
  reference: string
  amount: number
  currency?: string
  label?: string
  firstname?: string
  lastname?: string
  onSuccess: (data: { reference: string }) => void
  onClose: () => void
  onConfirmationPending?: () => void
}

interface LencoPayButtonProps {
  email: string
  name: string
  amount: number
  label?: string
  type: 'partnership' | 'store' | 'event'
  eventId?: string
  productId?: string
  message?: string
  children: React.ReactNode
  className?: string
  onSuccess?: (reference: string) => void
  onAbandoned?: () => void
  onPending?: () => void
  onBeforeOpen?: () => void
  disabled?: boolean
}

const SCRIPT_URL = process.env.NEXT_PUBLIC_LENCO_SANDBOX === 'true'
  ? 'https://pay.sandbox.lenco.co/js/v1/inline.js'
  : 'https://pay.lenco.co/js/v1/inline.js'

function generateReference() {
  return `tel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function LencoPayButton({
  email,
  name,
  amount,
  label,
  type,
  eventId,
  productId,
  message,
  children,
  className = '',
  onSuccess,
  onAbandoned,
  onPending,
  onBeforeOpen,
  disabled = false,
}: LencoPayButtonProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const [missingKey, setMissingKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const referenceRef = useRef<string>('')

  useEffect(() => {
    // If script is already in the DOM (e.g. re-mount), mark as ready immediately
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      if (window.LencoPay) setScriptLoaded(true)
      else {
        // Script tag exists but not yet executed — wait for it
        const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement
        existing.addEventListener('load', () => setScriptLoaded(true))
        existing.addEventListener('error', () => setScriptError(true))
      }
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => setScriptError(true)
    document.head.appendChild(script)
    scriptRef.current = script
  }, [])

  const handlePay = async () => {
    // Always fire onBeforeOpen so the parent can surface validation errors
    onBeforeOpen?.()

    if (disabled || loading) return

    if (!process.env.NEXT_PUBLIC_LENCO_PUBLIC_KEY) {
      setMissingKey(true)
      return
    }

    if (scriptError) {
      alert('Payment system failed to load. Please check your connection and try again.')
      return
    }

    if (!scriptLoaded || !window.LencoPay) {
      alert('Payment system is still loading. Please try again in a moment.')
      return
    }

    const reference = generateReference()
    referenceRef.current = reference
    const [firstname, ...rest] = name.trim().split(' ')
    const lastname = rest.join(' ') || undefined

    setLoading(true)

    window.LencoPay.getPaid({
      key: process.env.NEXT_PUBLIC_LENCO_PUBLIC_KEY!,
      email,
      reference,
      amount, // Lenco expects the actual amount with decimals (e.g. 250.00), NOT converted to lowest unit
      currency: 'ZMW',
      label: label ?? `Teleiosis — ${type}`,
      firstname,
      lastname,
      onSuccess: async ({ reference: ref }) => {
        try {
          const res = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: ref, type, eventId, productId, name, email, amount, message }),
          })
          if (res.ok) onSuccess?.(ref)
        } finally {
          setLoading(false)
        }
      },
      onClose: () => {
        setLoading(false)
        onAbandoned?.()
      },
      onConfirmationPending: async () => {
        const ref = referenceRef.current
        try {
          await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: ref, type, eventId, productId, name, email, amount, message }),
          })
        } finally {
          setLoading(false)
          onPending?.()
        }
      },
    })
  }

  // Determine display state
  const isDisabled = disabled || loading

  return (
    <>
      <button
        type="button"
        onClick={handlePay}
        disabled={isDisabled}
        className={`relative flex items-center justify-center gap-2.5 transition-all ${className} ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin shrink-0" />
            <span>Processing…</span>
          </>
        ) : scriptError ? (
          <>
            <AlertCircle size={16} className="shrink-0" />
            <span>Payment unavailable</span>
          </>
        ) : (
          children
        )}
      </button>
      {missingKey && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-red-500 mt-2">
          <AlertCircle size={12} />
          Payment is not configured. Please contact the site administrator.
        </p>
      )}
    </>
  )
}
