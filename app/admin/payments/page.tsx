import { createSupabaseServerClient } from '@/lib/supabase-server'

const TYPE_COLORS: Record<string, string> = {
  partnership: 'bg-purple-50 text-purple-700',
  event: 'bg-blue-50 text-blue-700',
  store: 'bg-green-50 text-green-700',
}

const STATUS_COLORS: Record<string, string> = {
  verified: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  failed: 'bg-red-50 text-red-600',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminPaymentsPage() {
  const supabase = await createSupabaseServerClient()

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  const all = payments ?? []

  const totalVerified = all.filter((p) => p.status === 'verified').reduce((s, p) => s + Number(p.amount), 0)
  const partnerships = all.filter((p) => p.type === 'partnership')
  const events = all.filter((p) => p.type === 'event')

  const now = new Date()
  const thisMonth = all.filter((p) => {
    const d = new Date(p.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthTotal = thisMonth.filter((p) => p.status === 'verified').reduce((s, p) => s + Number(p.amount), 0)

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Payments</h1>
        <p className="text-slate-500 text-sm mt-1">All partnership, event, and store payments</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Received (ZMW)', value: `${totalVerified.toLocaleString()}` },
          { label: 'This Month (ZMW)', value: `${thisMonthTotal.toLocaleString()}` },
          { label: 'Partnerships', value: partnerships.length },
          { label: 'Event Gifts', value: events.length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-slate-100 p-5 rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
            <p className="font-serif font-bold text-2xl text-[#2c0e68]">{value}</p>
          </div>
        ))}
      </div>

      {all.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 text-slate-400 text-sm">
          No payments recorded yet.
        </div>
      ) : (
        <div className="border border-slate-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {all.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(p.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-[#2c0e68]">{p.name ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.email}</td>
                  <td className="px-4 py-3 font-bold text-[#2c0e68]">ZMW {Number(p.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${TYPE_COLORS[p.type] ?? 'bg-slate-100 text-slate-600'}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${STATUS_COLORS[p.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs font-mono hidden lg:table-cell truncate max-w-[120px]">{p.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
