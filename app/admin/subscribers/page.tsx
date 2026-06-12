import { createSupabaseAdminClient } from '@/lib/supabase-server'
import SubscribersClient from './SubscribersClient'

export default async function AdminSubscribersPage() {
  const supabase = createSupabaseAdminClient()

  const { data } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, subscribed_at')
    .order('subscribed_at', { ascending: false })
    .limit(500)

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Subscribers</h1>
        <p className="text-slate-500 text-sm mt-1">Everyone who signed up for the newsletter</p>
      </div>
      <SubscribersClient initial={data ?? []} />
    </div>
  )
}
