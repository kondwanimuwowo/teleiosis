import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Layers } from 'lucide-react'

export default async function AdminProgramGroupsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: groups } = await supabase
    .from('program_groups')
    .select('*, teaching_series(count), teachings(count)')
    .order('sort_order')

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Program Groups</h1>
        <p className="text-slate-500 text-sm mt-1">The 3 main teaching programs. Add new series and teachings within each group via their respective admin pages.</p>
      </div>

      <div className="space-y-4">
        {(groups ?? []).map((group, i) => (
          <div key={group.id} className="bg-white border border-slate-100 p-5 flex items-start gap-5">
            <div className="w-10 h-10 bg-[#2c0e68]/5 border border-[#2c0e68]/10 flex items-center justify-center flex-shrink-0">
              <Layers size={18} className="text-[#4a0e68]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold text-teleiosis-gold uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif font-bold text-[#2c0e68] text-base">{group.name}</h3>
              </div>
              {group.description && <p className="text-slate-500 text-sm leading-relaxed mb-3">{group.description}</p>}
              <p className="text-xs text-slate-400">Slug: <code className="font-mono text-[#4a0e68]">{group.slug}</code></p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-50 border border-slate-100 p-5 text-xs text-slate-400">
        Program groups are seeded via the database migration. To add or rename groups, run the SQL migration or contact your developer. Series and teachings are assigned to groups during upload.
      </div>
    </div>
  )
}
