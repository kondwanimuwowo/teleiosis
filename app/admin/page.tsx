import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Calendar, Mic2, BookOpen, Quote, Users, Plus } from 'lucide-react'

export const metadata = { title: 'Admin Dashboard | Teleiosis' }

async function getStats() {
  const supabase = await createSupabaseServerClient()
  const [events, teachings, blog, quotes, team] = await Promise.all([
    supabase.from('events').select('id', { count: 'exact', head: true }),
    supabase.from('teachings').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('quotes').select('id', { count: 'exact', head: true }),
    supabase.from('co_labourers').select('id', { count: 'exact', head: true }),
  ])
  return {
    events:    events.count    ?? 0,
    teachings: teachings.count ?? 0,
    blog:      blog.count      ?? 0,
    quotes:    quotes.count    ?? 0,
    team:      team.count      ?? 0,
  }
}

const MODULES = [
  { href: '/admin/events',    label: 'Events',    Icon: Calendar, color: 'bg-blue-500/10 text-blue-600',   key: 'events' },
  { href: '/admin/teachings', label: 'Teachings', Icon: Mic2,     color: 'bg-purple-500/10 text-purple-600', key: 'teachings' },
  { href: '/admin/blog',      label: 'Blog Posts', Icon: BookOpen, color: 'bg-emerald-500/10 text-emerald-600', key: 'blog' },
  { href: '/admin/quotes',    label: 'Quotes',    Icon: Quote,    color: 'bg-amber-500/10 text-amber-600', key: 'quotes' },
  { href: '/admin/team',      label: 'Team',      Icon: Users,    color: 'bg-rose-500/10 text-rose-600',   key: 'team' },
]

const QUICK_ACTIONS = [
  { href: '/admin/events/new',    label: 'New Event',      Icon: Calendar },
  { href: '/admin/teachings/new', label: 'Upload Teaching', Icon: Mic2 },
  { href: '/admin/blog/new',      label: 'New Blog Post',   Icon: BookOpen },
  { href: '/admin/quotes',        label: 'Add Quote',       Icon: Quote },
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {MODULES.map(({ href, label, Icon, color, key }) => (
          <Link
            key={key}
            href={href}
            className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="font-serif font-bold text-2xl text-[#2c0e68]">{stats[key as keyof typeof stats]}</p>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
        <h2 className="font-serif font-bold text-lg text-[#2c0e68] mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 text-slate-600 hover:border-[#4a2c9c]/30 hover:bg-[#4a2c9c]/4 hover:text-[#4a2c9c] transition-all duration-200 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                <Plus size={14} className="opacity-50" />
              </div>
              <Icon size={16} />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-[#1a0840]/5 border border-[#4a2c9c]/15 rounded-2xl p-5">
        <p className="text-xs text-[#4a2c9c]/70 font-medium">
          All content changes are live immediately. Use the modules above to manage events, teachings, blog posts, quotes, and team members.
        </p>
      </div>
    </div>
  )
}
