import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const supabase = await createSupabaseServerClient()

  // Get total count
  const { count } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  if (!count || count === 0) {
    return NextResponse.json({ error: 'No quotes found' }, { status: 404 })
  }

  // Get random quote using offset
  const randomOffset = Math.floor(Math.random() * count)
  const { data, error } = await supabase
    .from('quotes')
    .select('id, text, scripture, author')
    .range(randomOffset, randomOffset)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 })
  }

  return NextResponse.json(data)
}
