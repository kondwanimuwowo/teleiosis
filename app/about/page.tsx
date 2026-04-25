import { createSupabaseServerClient } from '@/lib/supabase-server'
import { AboutClient } from './AboutClient'

export const metadata = {
  title: 'About | Teleiosis Mandate',
  description: 'Learn about the Teleiosis Mandate — a ministry movement devoted to the revelation of Christ and the training of believers into Christian perfection.',
}

export default async function AboutPage() {
  const supabase = await createSupabaseServerClient()
  const { data: stats } = await supabase.from('site_stats').select('*').order('sort_order')

  return <AboutClient stats={stats ?? []} />
}
