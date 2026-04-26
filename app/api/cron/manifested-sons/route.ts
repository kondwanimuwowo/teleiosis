import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getNextManifestSonsDates, MANIFESTED_SONS_TEMPLATE } from '@/lib/manifested-sons'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  // Allow internal calls and Vercel cron (Authorization header with cron secret)
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date()
  const in60Days = new Date(today.getTime() + 60 * 86400000)

  // Count upcoming Manifested Sons classes in the next 60 days
  const { data: existing } = await supabase
    .from('events')
    .select('id, date')
    .eq('title', MANIFESTED_SONS_TEMPLATE.title)
    .gte('date', today.toISOString().split('T')[0])
    .lte('date', in60Days.toISOString().split('T')[0])

  const existingCount = existing?.length ?? 0

  if (existingCount >= 3) {
    return NextResponse.json({ created: 0, message: 'Sufficient upcoming classes already exist' })
  }

  // Get all existing dates to avoid duplicates
  const existingDates = new Set((existing ?? []).map((e) => e.date))

  // Generate enough dates to have 4 upcoming
  const needed = 4 - existingCount
  const upcomingDates = getNextManifestSonsDates(today, needed + 2)

  const toInsert = upcomingDates
    .filter((d) => !existingDates.has(d.toISOString().split('T')[0]))
    .slice(0, needed)
    .map((d) => ({
      ...MANIFESTED_SONS_TEMPLATE,
      date: d.toISOString().split('T')[0],
    }))

  if (toInsert.length === 0) {
    return NextResponse.json({ created: 0, message: 'No new events needed' })
  }

  const { error } = await supabase.from('events').insert(toInsert)
  if (error) {
    console.error('Failed to insert Manifested Sons events:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ created: toInsert.length, dates: toInsert.map((e) => e.date) })
}
