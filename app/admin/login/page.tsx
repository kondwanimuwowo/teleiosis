'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0840] flex items-center justify-center px-4 relative overflow-hidden">

      {/* ── Background glow ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#4a2c9c]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-teleiosis-gold/5 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* ── Brand ─────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="font-serif font-bold text-3xl text-white tracking-[0.25em]">TELEIOSIS</p>
          <p className="text-teleiosis-gold text-[0.6rem] tracking-[0.3em] font-semibold uppercase mt-1">Admin Portal</p>
        </div>

        {/* ── Card ──────────────────────────────────────── */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <h1 className="font-serif font-bold text-xl text-white mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to manage your content</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@teleiosis.org"
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-teleiosis-gold/60 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/8 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-teleiosis-gold/60 focus:bg-white/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400/90 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-yellow-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                <><LogIn size={16} /> Sign in</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/15 text-xs mt-8">
          Teleiosis Mandate, internal portal
        </p>
      </div>
    </div>
  )
}
