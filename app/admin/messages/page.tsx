import { createSupabaseAdminClient } from '@/lib/supabase-server'
import MessagesClient from './MessagesClient'

export default async function AdminMessagesPage() {
  const supabase = createSupabaseAdminClient()

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  const all = messages ?? []
  const unreadCount = all.filter((m) => !m.read).length

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">Contact form submissions from the website</p>
        </div>
        {unreadCount > 0 && (
          <span className="ml-auto bg-[#d4af37] text-[#2c0e68] text-xs font-bold px-2.5 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>

      <MessagesClient initial={all} />
    </div>
  )
}
