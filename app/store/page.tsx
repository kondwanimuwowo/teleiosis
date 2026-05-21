import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { StoreClient } from './StoreClient'

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

function StoreGridSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="border border-slate-100 overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-square bg-slate-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-slate-100 rounded-full" />
                <div className="h-5 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-16 bg-slate-100 rounded" />
                  <div className="h-9 w-24 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function StorePage() {
  return (
    <>
      {/* ── HERO — static ─────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0 bg-[#2c0e68]" />
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }} />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">The Store</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Resources &amp; Merch
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Books, teaching materials, and merchandise to equip you in the revelation of Christ and Kingdom authority.
          </p>
        </div>
      </section>

      {/* ── DATA — skeleton while loading ─────────────────────────── */}
      <Suspense fallback={<StoreGridSkeleton />}>
        <StoreData />
      </Suspense>
    </>
  )
}
