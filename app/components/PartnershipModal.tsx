'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, CheckCircle } from 'lucide-react'
import { LencoPayButton } from './LencoPayButton'

const PRESET_AMOUNTS = [100, 250, 500, 1000]

interface PartnershipModalProps {
  open: boolean
  onClose: () => void
  eventId?: string
  eventTitle?: string
}

export function PartnershipModal({ open, onClose, eventId, eventTitle }: PartnershipModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [reference, setReference] = useState('')

  const amount = (selectedAmount ?? parseFloat(customAmount)) || 0
  const canPay = name.trim() && email.trim() && amount >= 10

  function reset() {
    setName('')
    setEmail('')
    setSelectedAmount(250)
    setCustomAmount('')
    setMessage('')
    setSuccess(false)
    setReference('')
  }

  function handleClose() {
    onClose()
    setTimeout(reset, 300)
  }

  const label = eventTitle ? `Partner — ${eventTitle}` : 'Ministry Partnership'

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl overflow-hidden rounded-2xl"
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
                <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      Choose Amount (ZMW)
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {PRESET_AMOUNTS.map((a) => (
                        <button
                          key={a}
                          onClick={() => { setSelectedAmount(a); setCustomAmount('') }}
                          className={`py-2.5 text-sm font-bold border transition-all ${
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
                      className="w-full border border-slate-200 px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
                    />
                    {amount > 0 && (
                      <p className="text-xs text-slate-400 mt-1.5">
                        Giving <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span>
                      </p>
                    )}
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
                        className="w-full border border-slate-200 px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
                      />
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
                      className="w-full border border-slate-200 px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 resize-none"
                    />
                  </div>

                  {/* Pay button */}
                  <LencoPayButton
                    email={email}
                    name={name || 'Partner'}
                    amount={amount}
                    label={label}
                    type={eventId ? 'event' : 'partnership'}
                    eventId={eventId}
                    message={message}
                    disabled={!canPay}
                    onSuccess={(ref) => { setReference(ref); setSuccess(true) }}
                    className={`w-full py-3.5 text-sm font-bold transition-all ${
                      canPay
                        ? 'bg-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/85 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Give ZMW {amount > 0 ? amount.toLocaleString() : '—'}
                  </LencoPayButton>

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
                  className="px-8 py-3 bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#3a1878] transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
