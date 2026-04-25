import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { StoreClient } from './StoreClient'

export const metadata: Metadata = {
  title: 'Store | Teleiosis Mandate',
  description: 'Books, merch, and resources from the Teleiosis Mandate.',
}

export default async function StorePage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('sort_order', { ascending: true })

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0 bg-[#2c0e68]" />
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg')" }} />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">The Store</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Resources &amp; Merch
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Books, teaching materials, and merchandise to equip you in the revelation of Christ and Kingdom authority.
          </p>
        </div>
      </section>

      <StoreClient products={products ?? []} />
    </>
  )
}
