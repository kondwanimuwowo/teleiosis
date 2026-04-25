'use client'

import { useState } from 'react'
import { Heart, CheckCircle } from 'lucide-react'
import { LencoPayButton } from '../../components/LencoPayButton'

const PRESET_AMOUNTS = [50, 100, 250, 500]

export function EventPartnerSection({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [reference, setReference] = useState('')

  const amount = (selectedAmount ?? parseFloat(customAmount)) || 0
  const canPay = name.trim() && email.trim() && amount >= 10

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-[#2c0e68] mb-2">Thank You!</h3>
        <p className="text-slate-500 text-sm mb-1">
          Your gift of <span className="font-bold text-[#2c0e68]">ZMW {amount.toLocaleString()}</span> toward <em>{eventTitle}</em> has been received.
        </p>
        <p className="text-slate-400 text-xs">Reference: {reference}</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 border border-slate-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-teleiosis-gold/10 flex items-center justify-center">
          <Heart size={16} className="text-teleiosis-gold" />
        </div>
        <div>
          <p className="font-serif font-bold text-[#2c0e68] text-base">Partner with this Event</p>
          <p className="text-xs text-slate-400">Sow into making this gathering possible</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount (ZMW)</label>
          <div className="grid grid-cols-4 gap-2 mb-2">
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
            type="number" min="10" placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
            className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name</label>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email</label>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Message <span className="font-normal normal-case text-slate-400">(optional)</span>
          </label>
          <textarea rows={2} placeholder="A note..." value={message} onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300 resize-none" />
        </div>

        <LencoPayButton
          email={email} name={name || 'Partner'} amount={amount}
          label={`Event Partnership — ${eventTitle}`}
          type="event" eventId={eventId} message={message}
          disabled={!canPay}
          onSuccess={(ref) => { setReference(ref); setSuccess(true) }}
          className={`w-full py-3.5 text-sm font-bold transition-all ${
            canPay
              ? 'bg-teleiosis-gold text-[#2c0e68] hover:bg-teleiosis-gold/85 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Give ZMW {amount > 0 ? amount.toLocaleString() : '—'}
        </LencoPayButton>
      </div>
    </div>
  )
}
