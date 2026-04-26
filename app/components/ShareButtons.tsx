'use client'

import { useState } from 'react'
import { Facebook, Share2, Check, MessageCircle } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButtons({ url, title, description, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(description ? `${title} — ${description}` : title)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Share</span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
      >
        <Facebook size={14} />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors"
      >
        <MessageCircle size={14} />
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-black hover:border-black transition-colors"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        title="Copy link"
        className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
          copied
            ? 'border-green-400 text-green-500'
            : 'border-slate-200 text-slate-500 hover:border-[#2c0e68] hover:text-[#2c0e68]'
        }`}
      >
        {copied ? <Check size={13} /> : <Share2 size={13} />}
      </button>
    </div>
  )
}
