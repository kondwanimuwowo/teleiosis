import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Plus, Calendar, Pencil } from 'lucide-react'
import { DeleteEventButton } from './DeleteEventButton'

export const metadata = { title: 'Events | Teleiosis Admin' }

export default async function AdminEventsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Events</h1>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors shadow-sm"
        >
          <Plus size={16} /> New event
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {!events?.length ? (
          <div className="p-12 text-center">
            <Calendar size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No events yet. Create your first one.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Location</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((event) => {
                const d = new Date(event.date)
                const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <tr key={event.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap font-mono text-xs">{dateStr}</td>
                    <td className="px-5 py-4 font-medium text-[#2c0e68]">{event.title}</td>
                    <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">{event.location}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/events/${event.id}/edit`} className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a2c9c] hover:bg-[#4a2c9c]/8 transition-colors">
                          <Pencil size={14} />
                        </Link>
                        <DeleteEventButton id={event.id} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
