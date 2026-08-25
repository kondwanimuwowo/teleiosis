import { createSupabaseServerClient } from '@/lib/supabase-server'
import { SiteStatsEditor } from './SiteStatsEditor'

export default async function AdminSettingsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: stats } = await supabase.from('site_stats').select('*').order('sort_order')

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Site settings</h1>
        <p className="text-slate-500 text-sm mt-1">Edit the stats displayed on the homepage and about page.</p>
      </div>
      <SiteStatsEditor initialStats={stats ?? []} />
    </div>
  )
}
