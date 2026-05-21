import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEventReminder } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find events happening tomorrow (within the next 24–48 hours)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]

    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, title, date, time_start, time_end, location, speaker, type')
      .eq('date', dateStr)

    if (eventsError) throw eventsError
    if (!events || events.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No events tomorrow.' })
    }

    let totalSent = 0
    const errors: string[] = []

    for (const event of events) {
      // Find all verified registrants for this event
      const { data: registrants, error: regError } = await supabase
        .from('payments')
        .select('name, email')
        .eq('event_id', event.id)
        .eq('status', 'verified')
        .eq('type', 'event')

      if (regError) {
        errors.push(`Event ${event.id}: ${regError.message}`)
        continue
      }

      if (!registrants || registrants.length === 0) continue

      // Send reminders in parallel, cap at 10 concurrent to avoid rate limits
      const chunks = []
      for (let i = 0; i < registrants.length; i += 10) {
        chunks.push(registrants.slice(i, i + 10))
      }

      for (const chunk of chunks) {
        await Promise.allSettled(
          chunk.map((r) =>
            sendEventReminder({ to: r.email, name: r.name || r.email, event })
              .catch((err) => errors.push(`${r.email}: ${err.message}`))
          )
        )
        totalSent += chunk.length
      }
    }

    return NextResponse.json({
      sent: totalSent,
      events: events.length,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (err: any) {
    console.error('Event reminders cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
