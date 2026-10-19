import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { StoreClient } from '../StoreClient'
import { StoreHero, StoreGridSkeleton } from '../StoreShell'

export const metadata: Metadata = {
  title: 'Store | Teleiosis Mandate',
  description: 'Books, merch, and resources from the Teleiosis Mandate.',
}

async function StoreData() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('sort_order', { ascending: true })

  return <StoreClient products={products ?? []} />
}

export default function StorePage() {
  return (
    <>
      {/* ── HERO — static ─────────────────────────────────────────── */}
      <StoreHero />

      {/* ── DATA — skeleton while loading ─────────────────────────── */}
      <Suspense fallback={<StoreGridSkeleton />}>
        <StoreData />
      </Suspense>
    </>
  )
}
