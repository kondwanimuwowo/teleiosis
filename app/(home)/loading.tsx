import { HomeContent, StatsGridSkeleton, NextEventSkeleton, NewsGridSkeleton } from './HomeShell'

export default function HomeLoading() {
  return (
    <HomeContent
      stats={<StatsGridSkeleton />}
      event={<NextEventSkeleton />}
      news={<NewsGridSkeleton />}
    />
  )
}
