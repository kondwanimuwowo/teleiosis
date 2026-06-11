import Link from 'next/link'
import { Suspense } from 'react'
import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { Calendar, Mic2, BookOpen, Quote, Users, Library, HardDrive, Mail, MessageSquare } from 'lucide-react'
import { StorageWidget } from './StorageWidget'

export const metadata = { title: 'Admin Dashboard | Teleiosis' }

async function getStats() {
  const supabase = createSupabaseAdminClient()
  const [events, teachings, series, blog, quotes, team, subscribers, unreadMessages] = await Promise.all([
    supabase.from('events').select('id', { count: 'exact', head: true }),
    supabase.from('teachings').select('id', { count: 'exact', head: true }),
    supabase.from('teaching_series').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('quotes').select('id', { count: 'exact', head: true }),
    supabase.from('co_labourers').select('id', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
  ])
  return {
    events:         events.count         ?? 0,
    teachings:      teachings.count      ?? 0,
    series:         series.count         ?? 0,
    blog:           blog.count           ?? 0,
    quotes:         quotes.count         ?? 0,
    team:           team.count           ?? 0,
    subscribers:    subscribers.count    ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
  }
}

const MODULES = [
  { href: '/admin/events',      label: 'Events',          Icon: Calendar,      color: 'bg-blue-500/10 text-blue-600',     key: 'events' },
  { href: '/admin/teachings',   label: 'Teachings',       Icon: Mic2,          color: 'bg-purple-500/10 text-purple-600', key: 'teachings' },
  { href: '/admin/series',      label: 'Series',          Icon: Library,       color: 'bg-indigo-500/10 text-indigo-600', key: 'series' },
  { href: '/admin/blog',        label: 'Blog Posts',      Icon: BookOpen,      color: 'bg-emerald-500/10 text-emerald-600', key: 'blog' },
  { href: '/admin/quotes',      label: 'Quotes',          Icon: Quote,         color: 'bg-amber-500/10 text-amber-600',   key: 'quotes' },
  { href: '/admin/team',        label: 'Team',            Icon: Users,         color: 'bg-rose-500/10 text-rose-600',     key: 'team' },
  { href: '/admin/subscribers', label: 'Subscribers',     Icon: Mail,          color: 'bg-teal-500/10 text-teal-600',     key: 'subscribers' },
  { href: '/admin/messages',    label: 'Unread Messages', Icon: MessageSquare, color: 'bg-orange-500/10 text-orange-600', key: 'unreadMessages' },
]

const QUICK_ACTIONS = [
  { href: '/admin/events/new',    label: 'New Event',      Icon: Calendar, color: 'bg-blue-500/10 text-blue-600' },
  { href: '/admin/teachings/new', label: 'Upload Teaching', Icon: Mic2,    color: 'bg-purple-500/10 text-purple-600' },
  { href: '/admin/series/new',    label: 'New Series',     Icon: Library,  color: 'bg-indigo-500/10 text-indigo-600' },
  { href: '/admin/blog/new',      label: 'New Blog Post',  Icon: BookOpen, color: 'bg-emerald-500/10 text-emerald-600' },
]

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">Content Management</p>
        <h1 className="font-serif font-bold text-3xl text-[#2c0e68]">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Manage all content for the Teleiosis Mandate site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {MODULES.map(({ href, label, Icon, color, key }) => (
          <Link
            key={key}
            href={href}
            className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group min-h-[100px]"
          >
            {/* Top row: icon + stat */}
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="font-serif font-bold text-3xl text-[#2c0e68] leading-none">
                {stats[key as keyof typeof stats]}
              </p>
            </div>
            {/* Bottom: label */}
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{label}</p>
          </Link>
        ))}
      </div>

      {/* Storage widget */}
      <Suspense fallback={
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center animate-pulse">
            <HardDrive size={16} className="text-slate-300" />
          </div>
          <p className="text-xs text-slate-300 animate-pulse">Checking storage…</p>
        </div>
      }>
        <div className="mb-6">
          <StorageWidget />
        </div>
      </Suspense>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
        <h2 className="font-serif font-bold text-lg text-[#2c0e68] mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ href, label, Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl border border-slate-200 hover:border-[#4a2c9c]/30 hover:bg-[#4a2c9c]/4 transition-all duration-200 text-center group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-[#4a2c9c] leading-tight transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>



      {/* Info banner */}
      <div className="bg-[#1a0840]/5 border border-[#4a2c9c]/15 rounded-2xl p-5">
        <p className="text-xs text-[#4a2c9c]/70 font-medium">
          All content changes are live immediately. Use the modules above to manage events, teachings, series, blog posts, quotes, team members, products, and payments.
        </p>
      </div>
    </div>
  )
}
