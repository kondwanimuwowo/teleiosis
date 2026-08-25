'use client'

import { useState } from 'react'
import { BookOpen, Mic2, Globe, CheckCircle, Clock, RotateCcw } from 'lucide-react'
import { LencoPayButton } from '../components/LencoPayButton'

const PRESET_AMOUNTS = [100, 250, 500, 1000]

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Fund the teaching',
    desc: 'Your giving supports the production, distribution, and expansion of systematic teaching on Christian perfection, including recordings, materials, and weekly classes.',
  },
  {
    icon: Mic2,
    title: 'Resource the conferences',
    desc: 'The Unto Perfection Conferences bring believers together for deep, intensive encounters. Partnership helps make these gatherings possible and accessible.',
  },
  {
    icon: Globe,
    title: 'Reach beyond Lusaka',
    desc: 'The audio library is reaching believers across Zambia and beyond. Your seed enables the mandate to expand its reach and impact.',
  },
]

export default function PartnershipPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [paymentState, setPaymentState] = useState<'idle' | 'success' | 'abandoned' | 'pending'>('idle')
  const [reference, setReference] = useState('')

  const amount = (selectedAmount ?? parseFloat(customAmount)) || 0
  const canPay = name.trim() && email.trim() && amount >= 10

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg-1.jpg')" }} />
        <div className="absolute inset-0 bg-[#1a0840]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Partner with the mandate
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Sow into the revelation of Christ and the training of believers into perfection. Every gift advances the mandate in spirit, soul, and body.
          </p>
        </div>
      </section>

      {/* ── WHY PARTNER + GIVE ───────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — what partnership does */}
            <div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2c0e68] leading-tight mb-10">
                What your partnership does
              </h2>
              <div className="space-y-6">
                {PILLARS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="p-6 sm:p-8 bg-white shadow-md rounded-xl">
                    <div className="w-10 h-10 bg-slate-100 flex items-center justify-center mb-4 rounded-lg">
                      <Icon size={20} className="text-teleiosis-purple" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#2c0e68] mb-3">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-xl">
              {paymentState === 'success' ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#2c0e68] mb-2">Thank you</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-1">
                    Your gift of <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span> has been received.
                  </p>
                  <p className="text-slate-400 text-xs mb-6">Reference: {reference}</p>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                    May God multiply your seed pressed down, shaken together, and running over. You are advancing the revelation of Christ.
                  </p>
                </div>
              ) : paymentState === 'pending' ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                    <Clock size={32} className="text-blue-500" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#2c0e68] mb-2">Payment processing</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-2">
                    Your payment is being confirmed by your mobile network. We&apos;ll send a confirmation email once it clears.
                  </p>
                  {reference && <p className="text-slate-400 text-xs">Reference: {reference}</p>}
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Amount picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      Amount (ZMW)
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {PRESET_AMOUNTS.map((a) => (
                        <button
                          key={a}
                          onClick={() => { setSelectedAmount(a); setCustomAmount('') }}
                          className={`py-3 text-sm font-bold rounded-lg transition-all ${
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
                      type="number"
                      min="10"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                      className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors"
                    />
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
                        className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Message <span className="font-normal normal-case text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="A word with your giving..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] rounded-lg focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 resize-none transition-colors"
                    />
                  </div>

                  <LencoPayButton
                    email={email}
                    name={name || 'Partner'}
                    amount={amount}
                    label="Ministry Partnership, Teleiosis Mandate"
                    type="partnership"
                    message={message}
                    disabled={!canPay}
                    onSuccess={(ref) => { setReference(ref); setPaymentState('success') }}
                    onAbandoned={() => setPaymentState('abandoned')}
                    onPending={() => setPaymentState('pending')}
                    className={`w-full py-4 text-sm font-bold rounded-full transition-all ${
                      canPay
                        ? 'bg-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/85 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Give ZMW {amount > 0 ? amount.toLocaleString() : '0'}
                  </LencoPayButton>

                  {paymentState === 'abandoned' && (
                    <div className="flex items-start gap-3 bg-amber-50 p-3.5 rounded-lg text-sm">
                      <RotateCcw size={15} className="text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-amber-800 font-medium">Payment not completed.</p>
                        <p className="text-amber-700 text-xs mt-0.5">You can try again whenever you&apos;re ready.</p>
                      </div>
                      <button
                        onClick={() => setPaymentState('idle')}
                        className="text-xs font-bold text-amber-700 underline underline-offset-2 shrink-0"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400 text-center">
                    Secure payments via Lenco · ZMW only · You&apos;ll receive a confirmation email
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
