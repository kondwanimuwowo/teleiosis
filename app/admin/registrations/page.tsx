import { createSupabaseAdminClient } from '@/lib/supabase-server'
import RegistrationsClient from './RegistrationsClient'

export default async function RegistrationsPage() {
  const supabase = createSupabaseAdminClient()

  const { data } = await supabase
    .from('registrations')
    .select('id, name, email, phone, type, notes, created_at, events(title)')
    .order('created_at', { ascending: false })

  return <RegistrationsClient initial={data ?? []} />
}
