import { createSupabaseServerClient } from '@/lib/supabase-server'
import QuoteBandClient from './QuoteBandClient'

export async function QuoteBand() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('quotes')
    .select('text, scripture')
    .eq('is_active', true)
    .order('created_at')

  const quotes = data?.length
    ? data
    : [{ text: 'The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us.', scripture: '1 Cor 13:10' }]

  return <QuoteBandClient quotes={quotes} />
}
