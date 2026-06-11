import { createSupabaseAdminClient } from '@/lib/supabase-server'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminSubscribersPage() {
  const supabase = createSupabaseAdminClient()

  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })
    .limit(500)

  const all = subscribers ?? []

  const now = new Date()
  const thisMonth = all.filter((s) => {
    const d = new Date(s.subscribed_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Subscribers</h1>
        <p className="text-slate-500 text-sm mt-1">Everyone who signed up for the newsletter</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-slate-100 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Subscribers</p>
          <p className="font-serif font-bold text-2xl text-[#2c0e68]">{all.length}</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Joined This Month</p>
          <p className="font-serif font-bold text-2xl text-[#2c0e68]">{thisMonth.length}</p>
        </div>
      </div>

      {all.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 text-slate-400 text-sm">
          No subscribers yet. Once someone signs up for the newsletter, they will appear here.
        </div>
      ) : (
        <div className="border border-slate-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {all.map((s, i) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-400 text-xs w-12">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#2c0e68]">{s.email}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.subscribed_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
