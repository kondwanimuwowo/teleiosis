'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import {
  LayoutDashboard, Calendar, Mic2, BookOpen,
  Quote, Users, LogOut, ExternalLink, ChevronRight, Menu, X, Library, Tag,
  ShoppingBag, CreditCard, Settings, Layers, ClipboardList
} from 'lucide-react'

const NAV_CONTENT = [
  { href: '/admin',              label: 'Dashboard',  Icon: LayoutDashboard },
  { href: '/admin/events',       label: 'Events',     Icon: Calendar },
  { href: '/admin/teachings',    label: 'Teachings',  Icon: Mic2 },
  { href: '/admin/program-groups', label: 'Program Groups', Icon: Layers },
  { href: '/admin/series',       label: 'Series',     Icon: Library },
  { href: '/admin/categories',   label: 'Categories', Icon: Tag },
  { href: '/admin/blog',         label: 'Blog',       Icon: BookOpen },
  { href: '/admin/quotes',       label: 'Quotes',     Icon: Quote },
  { href: '/admin/team',         label: 'Team',       Icon: Users },
]

const NAV_SYSTEM = [
  { href: '/admin/products',       label: 'Store',          Icon: ShoppingBag },
  { href: '/admin/payments',       label: 'Payments',       Icon: CreditCard },
  { href: '/admin/registrations',  label: 'Registrations',  Icon: ClipboardList },
  { href: '/admin/settings',       label: 'Settings',       Icon: Settings },
]

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 z-30 flex items-center justify-between px-4 shadow-md" style={{ background: 'linear-gradient(160deg, #2c0e68 0%, #14082b 100%)' }}>
        <div className="flex flex-col">
          <p className="font-serif font-bold text-sm text-white tracking-[0.2em]">TELEIOSIS</p>
          <p className="text-teleiosis-gold text-[0.5rem] tracking-[0.25em] font-semibold uppercase">Admin Portal</p>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="text-white hover:text-teleiosis-gold transition-colors p-2"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#1a0840]/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* â”€â”€ Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <aside
        className={`w-64 h-screen flex flex-col fixed top-0 left-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(160deg, #2c0e68 0%, #14082b 100%)' }}
      >

        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/8 flex items-center justify-between">
          <div>
            <p className="font-serif font-bold text-lg text-white tracking-[0.2em]">TELEIOSIS</p>
            <p className="text-teleiosis-gold text-[0.55rem] tracking-[0.25em] font-semibold uppercase mt-0.5">Admin Portal</p>
          </div>
          <button 
            className="lg:hidden text-white/50 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto scrollbar-admin">
          <div className="space-y-0.5 mb-6">
            <p className="px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Content</p>
            {NAV_CONTENT.map(({ href, label, Icon }) => {
              const isActive = href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-teleiosis-gold/15 text-teleiosis-gold border border-teleiosis-gold/20'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  {label}
                  {isActive && <ChevronRight size={12} className="ml-auto opacity-60" />}
                </Link>
              )
            })}
          </div>
          
          <div className="space-y-0.5">
            <p className="px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">System</p>
            {NAV_SYSTEM.map(({ href, label, Icon }) => {
              const isActive = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-teleiosis-gold/15 text-teleiosis-gold border border-teleiosis-gold/20'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  {label}
                  {isActive && <ChevronRight size={12} className="ml-auto opacity-60" />}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <ExternalLink size={16} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* â”€â”€ Main content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen pt-16 lg:pt-0">
        <main className="flex-1 p-8">
          {children}
        </main>
        <footer className="px-8 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">Teleiosis Mandate Admin â€” Internal Use Only</p>
        </footer>
      </div>
    </div>
  )
}

