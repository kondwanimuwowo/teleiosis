'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, CheckCircle, AlertCircle } from 'lucide-react'
import { LencoPayButton } from './LencoPayButton'

const PRESET_AMOUNTS = [100, 250, 500, 1000]
const CACHE_KEY = 'teleiosis_partner_info'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface PartnershipModalProps {
  open: boolean
  onClose: () => void
  eventId?: string
  eventTitle?: string
}

interface Touched {
  name: boolean
  email: boolean
  amount: boolean
}

function getFieldError(field: 'name' | 'email' | 'amount', value: string | number, touched: boolean): string {
  if (!touched) return ''
  switch (field) {
    case 'name':
      return !(value as string).trim() ? 'Full name is required' : ''
    case 'email':
      if (!(value as string).trim()) return 'Email address is required'
      if (!EMAIL_RE.test(value as string)) return 'Please enter a valid email address'
      return ''
    case 'amount':
      return (value as number) > 0 && (value as number) < 10 ? 'Minimum giving amount is ZMW 10' : ''
    default:
      return ''
  }
}

export function PartnershipModal({ open, onClose, eventId, eventTitle }: PartnershipModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [reference, setReference] = useState('')
  const [touched, setTouched] = useState<Touched>({ name: false, email: false, amount: false })

  const amount = (selectedAmount ?? parseFloat(customAmount)) || 0

  // Validation
  const nameError   = getFieldError('name',   name,   touched.name)
  const emailError  = getFieldError('email',  email,  touched.email)
  const amountError = getFieldError('amount', amount, touched.amount)
  const hasErrors   = !!(nameError || emailError || amountError)
  const canPay      = name.trim() && email.trim() && EMAIL_RE.test(email) && amount >= 10

  // ── Caching: pre-fill name/email from localStorage on open ──────────────
  useEffect(() => {
    if (!open) return
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { cachedName, cachedEmail } = JSON.parse(cached)
        if (cachedName && !name) setName(cachedName)
        if (cachedEmail && !email) setEmail(cachedEmail)
      }
    } catch {/* ignore */}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Persist name + email whenever they change
  useEffect(() => {
    if (!name && !email) return
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ cachedName: name, cachedEmail: email }))
    } catch {/* ignore */}
  }, [name, email])

  // ────────────────────────────────────────────────────────────────────────

  function touch(field: keyof Touched) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  function touchAll() {
    setTouched({ name: true, email: true, amount: true })
  }

  function reset() {
    setSelectedAmount(250)
    setCustomAmount('')
    setMessage('')
    setSuccess(false)
    setReference('')
    setTouched({ name: false, email: false, amount: false })
    // NOTE: intentionally keep name + email (they came from cache, user can reuse them)
  }

  function handleClose() {
    onClose()
    setTimeout(reset, 300)
  }

  const label = eventTitle ? `Partner — ${eventTitle}` : 'Ministry Partnership'

  // Shared input class builder
  function inputCls(hasError: boolean) {
    return `w-full border px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none placeholder:text-slate-300 rounded-xl transition-colors ${
      hasError
        ? 'border-red-300 bg-red-50/40 focus:border-red-400'
        : 'border-slate-200 focus:border-[#2c0e68]'
    }`
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Scroll container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl flex flex-col pointer-events-auto my-auto"
            >
            {!success ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teleiosis-gold/10 flex items-center justify-center rounded-full">
                      <Heart size={16} className="text-teleiosis-gold" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-[#2c0e68] text-base leading-tight">
                        {eventTitle ? 'Partner with this Event' : 'Partner with Teleiosis'}
                      </p>
                      {eventTitle && (
                        <p className="text-xs text-slate-400 mt-0.5">{eventTitle}</p>
                      )}
                    </div>
                  </div>
                  <button onClick={handleClose} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5 overflow-y-auto min-h-0">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      Choose Amount (ZMW)
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {PRESET_AMOUNTS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => { setSelectedAmount(a); setCustomAmount(''); touch('amount') }}
                          className={`py-2.5 text-sm font-bold border transition-all rounded-xl ${
                            selectedAmount === a
                              ? 'bg-[#2c0e68] text-white border-[#2c0e68]'
                              : 'bg-white text-[#2c0e68] border-slate-200 hover:border-[#2c0e68]'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="10"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                      onBlur={() => touch('amount')}
                      className={inputCls(!!amountError)}
                    />
                    {amountError ? (
                      <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                        <AlertCircle size={11} /> {amountError}
                      </p>
                    ) : amount > 0 ? (
                      <p className="text-xs text-slate-400 mt-1.5">
                        Giving <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span>
                      </p>
                    ) : null}
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => touch('name')}
                        className={inputCls(!!nameError)}
                      />
                      {nameError && (
                        <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle size={11} /> {nameError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => touch('email')}
                        className={inputCls(!!emailError)}
                      />
                      {emailError && (
                        <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle size={11} /> {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Message <span className="font-normal normal-case text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="A note with your giving..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-slate-200 px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 resize-none rounded-xl"
                    />
                  </div>

                  {/* Pay button — touch all fields on click if form invalid */}
                  <LencoPayButton
                    email={email}
                    name={name || 'Partner'}
                    amount={amount}
                    label={label}
                    type={eventId ? 'event' : 'partnership'}
                    eventId={eventId}
                    message={message}
                    disabled={!canPay}
                    onBeforeOpen={touchAll}
                    onSuccess={(ref) => { setReference(ref); setSuccess(true) }}
                    className={`w-full py-3.5 text-sm font-bold transition-all rounded-xl ${
                      canPay
                        ? 'bg-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/85 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Give ZMW {amount > 0 ? amount.toLocaleString() : '—'}
                  </LencoPayButton>

                  {/* Inline summary of what's wrong (only after interaction) */}
                  {hasErrors && (touched.name || touched.email || touched.amount) && (
                    <p className="text-xs text-red-500 text-center -mt-1">
                      Please fill in all required fields above to continue.
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400 text-center">
                    Payments are processed securely via Lenco. You will receive a confirmation email.
                  </p>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="px-8 py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#2c0e68] mb-2">Thank You!</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-1">
                  Your gift of <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span> has been received.
                </p>
                <p className="text-slate-400 text-xs mb-6">Reference: {reference}</p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
                  You are sowing into the revelation of Christ and the perfection of the saints. May God multiply your seed pressed down, shaken together, and running over.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#3a1878] transition-colors rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
