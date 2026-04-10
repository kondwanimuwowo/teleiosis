import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Plus, Mic2, Pencil } from 'lucide-react'
import { DeleteTeachingButton } from './DeleteTeachingButton'

export const metadata = { title: 'Teachings | Teleiosis Admin' }

export default async function AdminTeachingsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: teachings } = await supabase
    .from('teachings')
    .select('id, title, speaker, duration_minutes, published_date, teaching_categories(name)')
    .order('published_date', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Teachings</h1>
        </div>
        <Link
          href="/admin/teachings/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors shadow-sm"
        >
          <Plus size={16} /> Upload Teaching
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {!teachings?.length ? (
          <div className="p-12 text-center">
            <Mic2 size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No teachings yet. Upload your first one.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {teachings.map((t: any) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 font-medium text-[#2c0e68]">{t.title}</td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                    {t.teaching_categories?.name ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">
                    {t.duration_minutes ? `${t.duration_minutes} min` : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link 
                        href={`/admin/teachings/${t.id}/edit`} 
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a2c9c] hover:bg-[#4a2c9c]/8 transition-colors"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteTeachingButton id={t.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
