import { EventsHero, EventsListSkeleton } from '../EventsShell'

export default function EventsLoading() {
  return (
    <div>
      <EventsHero />
      <EventsListSkeleton />
    </div>
  )
}
