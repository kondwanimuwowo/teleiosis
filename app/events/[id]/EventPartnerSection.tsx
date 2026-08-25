'use client'

import { useState, useEffect } from 'react'
import { Heart, CheckCircle, Clock, RotateCcw, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LencoPayButton } from '../../components/LencoPayButton'

const PRESET_AMOUNTS = [50, 100, 250, 500]

type PaymentState = 'idle' | 'success' | 'abandoned' | 'pending'

export function EventPartnerSection({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')
  const [reference, setReference] = useState('')

  const amount = (selectedAmount ?? parseFloat(customAmount)) || 0
  const canPay = name.trim() && email.trim() && amount >= 10

  useEffect(() => {
    if (window.location.hash === '#partner') setOpen(true)
  }, [])

  const inputCls = 'w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors'

  return (
    <div id="partner" className="bg-slate-50 rounded-xl overflow-hidden shadow-sm scroll-mt-28">
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-5 sm:p-6 text-left group"
      >
        <Heart size={20} className="text-teleiosis-gold flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-[#2c0e68] text-base leading-snug">Partner with this event</p>
          <p className="text-xs text-slate-400 mt-0.5">Sow into making this gathering possible</p>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {open && (
        <motion.div
          key="partner-body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
        <div className="px-5 sm:px-6 pb-6 bg-white">
          {paymentState === 'success' ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-2">Thank you!</h3>
              <p className="text-slate-500 text-sm mb-1">
                Your gift of <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span> toward <em>{eventTitle}</em> has been received.
              </p>
              {reference && <p className="text-slate-400 text-xs mt-1">Reference: {reference}</p>}
            </div>
          ) : paymentState === 'pending' ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Clock size={28} className="text-blue-500" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-2">Payment processing</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Your payment is being confirmed by your mobile network. We&apos;ll send a confirmation email once it clears.
              </p>
              {reference && <p className="text-slate-400 text-xs mt-2">Reference: {reference}</p>}
            </div>
          ) : (
            <div className="space-y-4 pt-5">
              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount (ZMW)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setSelectedAmount(a); setCustomAmount('') }}
                      className={`py-2.5 text-sm font-bold rounded-full transition-all ${
                        selectedAmount === a
                          ? 'bg-[#2c0e68] text-white'
                          : 'bg-slate-100 text-[#2c0e68] hover:bg-slate-200'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <input
                  type="number" min="10" placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name</label>
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email</label>
                  <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Message <span className="font-normal normal-case text-slate-400">(optional)</span>
                </label>
                <textarea rows={2} placeholder="A note..." value={message} onChange={(e) => setMessage(e.target.value)}
                  className={inputCls + ' resize-none'} />
              </div>

              <LencoPayButton
                email={email} name={name || 'Partner'} amount={amount}
                label={`Event partnership for ${eventTitle}`}
                type="event" eventId={eventId} message={message}
                disabled={!canPay}
                onSuccess={(ref) => { setReference(ref); setPaymentState('success') }}
                onAbandoned={() => setPaymentState('abandoned')}
                onPending={() => setPaymentState('pending')}
                className={`w-full py-3 text-sm font-bold rounded-full transition-all ${
                  canPay
                    ? 'bg-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/85 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Give ZMW {amount > 0 ? amount.toLocaleString() : '0'}
              </LencoPayButton>

              {paymentState === 'abandoned' && (
                <div className="flex items-start gap-3 bg-amber-50 shadow-sm p-3.5 rounded-lg text-sm">
                  <RotateCcw size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-800 font-medium">Payment not completed.</p>
                    <p className="text-amber-700 text-xs mt-0.5">You can try again whenever you&apos;re ready.</p>
                  </div>
                  <button
                    onClick={() => setPaymentState('idle')}
                    className="ml-auto text-xs font-bold text-amber-700 underline underline-offset-2 shrink-0"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
