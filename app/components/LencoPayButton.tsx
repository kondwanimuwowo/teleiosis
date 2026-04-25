'use client'

import { useEffect, useRef, useState } from 'react'

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
  onConfirmationPending?: (data: { reference: string }) => void
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
  disabled?: boolean
}

const SANDBOX = process.env.NEXT_PUBLIC_LENCO_SANDBOX === 'true'
const SCRIPT_URL = SANDBOX
  ? 'https://sandbox.pay.lenco.co/js/v1/inline.js'
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
  disabled = false,
}: LencoPayButtonProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.head.appendChild(script)
    scriptRef.current = script
  }, [])

  const handlePay = async () => {
    if (!scriptLoaded || !window.LencoPay) return
    const reference = generateReference()
    const [firstname, ...rest] = name.trim().split(' ')
    const lastname = rest.join(' ') || undefined

    setLoading(true)

    window.LencoPay.getPaid({
      key: process.env.NEXT_PUBLIC_LENCO_PUBLIC_KEY!,
      email,
      reference,
      amount: Math.round(amount * 100), // Lenco expects amount in ngwe (smallest unit)
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
      onClose: () => setLoading(false),
      onConfirmationPending: ({ reference: ref }) => {
        onSuccess?.(ref)
        setLoading(false)
      },
    })
  }

  return (
    <button
      onClick={handlePay}
      disabled={disabled || loading || !scriptLoaded}
      className={className}
    >
      {loading ? 'Processing...' : children}
    </button>
  )
}
