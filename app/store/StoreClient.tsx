'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Bell, CheckCircle } from 'lucide-react'

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category: string
  image_url: string | null
  in_stock: boolean
}

const CATEGORIES = ['All', 'Books', 'Merch', 'Resources']

function EmptyState() {
  const [notifyEmail, setNotifyEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-white min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center px-8 py-20">
        <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8">
          <span className="font-serif font-bold text-3xl text-slate-200">T</span>
        </div>
        <p className="text-teleiosis-gold/30 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Coming Soon</p>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68] mb-4">
          Something Special is Coming
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          We are preparing resources, books, and materials to equip you in the revelation of Christ. Check back soon.
        </p>
        {!submitted ? (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              className="flex-1 border border-slate-200 px-4 py-3 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
            />
            <button
              onClick={() => notifyEmail && setSubmitted(true)}
              className="px-4 py-3 bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#3a1878] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Bell size={14} />
              Notify Me
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
            <CheckCircle size={16} />
            We&apos;ll let you know when the store is live!
          </div>
        )}
      </div>
    </section>
  )
}

export function StoreClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>('newest')

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'All') list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) || (p.description ?? '').toLowerCase().includes(q)
      )
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [products, category, search, sort])

  if (products.length === 0) return <EmptyState />

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] placeholder:text-slate-300"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border border-slate-200 pl-9 pr-8 py-2.5 text-sm text-[#2c0e68] focus:outline-none focus:border-[#2c0e68] bg-white cursor-pointer appearance-none"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 text-xs font-bold border transition-all ${
                category === cat
                  ? 'bg-[#2c0e68] text-white border-[#2c0e68]'
                  : 'bg-white text-[#2c0e68] border-slate-200 hover:border-[#2c0e68]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-16">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="border border-slate-100 bg-white hover:border-[#4a0e68]/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif font-bold text-5xl text-slate-100">T</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teleiosis-gold mb-1 capitalize">
                    {product.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#2c0e68] mb-2 leading-snug">{product.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="font-bold text-[#2c0e68] text-sm">ZMW {Number(product.price).toLocaleString()}</span>
                    <button className="px-4 py-2 bg-teleiosis-gold text-[#2c0e68] text-xs font-bold hover:bg-teleiosis-gold/85 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
