import { Suspense } from 'react'
import { HomeContent, StatsGridSkeleton, NextEventSkeleton, NewsGridSkeleton } from './HomeShell'
import { StatsGrid, NextEvent, NewsPreview } from './HomeData'

export const metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <HomeContent
      stats={<Suspense fallback={<StatsGridSkeleton />}><StatsGrid /></Suspense>}
      event={<Suspense fallback={<NextEventSkeleton />}><NextEvent /></Suspense>}
      news={<Suspense fallback={<NewsGridSkeleton />}><NewsPreview /></Suspense>}
    />
  )
}
