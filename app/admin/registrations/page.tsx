import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { ClipboardList } from 'lucide-react'
import DeleteRegistrationButton from './DeleteRegistrationButton'

type FilterType = 'all' | 'general' | 'event'

interface SearchParams {
  type?: string
}

export default async function RegistrationsPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createSupabaseAdminClient()

  const filter = (searchParams.type ?? 'all') as FilterType

  let query = supabase
    .from('registrations')
    .select('id, name, email, phone, type, notes, created_at, events(title)')
    .order('created_at', { ascending: false })

  if (filter !== 'all') {
    query = query.eq('type', filter)
  }

  const { data: registrations, error } = await query

  const counts = await Promise.all([
    supabase.from('registrations').select('id', { count: 'exact', head: true }),
    supabase.from('registrations').select('id', { count: 'exact', head: true }).eq('type', 'general'),
    supabase.from('registrations').select('id', { count: 'exact', head: true }).eq('type', 'event'),
  ])

  const [allCount, generalCount, eventCount] = counts.map((r) => r.count ?? 0)

  const tabs: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: allCount },
    { key: 'general', label: 'General', count: generalCount },
    { key: 'event', label: 'Event', count: eventCount },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2c0e68]/10 rounded-xl flex items-center justify-center">
          <ClipboardList size={20} className="text-[#2c0e68]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrations</h1>
          <p className="text-sm text-slate-500">{allCount} total registrations</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ key, label, count }) => (
          <a
            key={key}
            href={`/admin/registrations${key !== 'all' ? `?type=${key}` : ''}`}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              filter === key
                ? 'bg-white text-[#2c0e68] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filter === key ? 'bg-[#2c0e68]/10 text-[#2c0e68]' : 'bg-slate-200 text-slate-500'
            }`}>
              {count}
            </span>
          </a>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-600">
          Failed to load registrations: {error.message}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {!registrations?.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClipboardList size={40} className="text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No registrations yet</p>
            <p className="text-slate-400 text-sm mt-1">
              {filter !== 'all' ? `No ${filter} registrations found` : 'Registrations will appear here once people sign up'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Phone</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Event</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3.5 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => {
                  const eventTitle = (reg as any).events?.title
                  return (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">{reg.name}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <a href={`mailto:${reg.email}`} className="hover:text-[#2c0e68] transition-colors">{reg.email}</a>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{reg.phone ?? '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                          reg.type === 'event'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {reg.type === 'event' ? 'Event' : 'General'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell max-w-[200px] truncate">
                        {eventTitle ?? '—'}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap hidden sm:table-cell">
                        {new Date(reg.created_at).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <DeleteRegistrationButton id={reg.id} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
