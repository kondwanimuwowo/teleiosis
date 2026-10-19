export function BlogHero() {
  return (
    <section className="relative flex items-center bg-[#1a0840]" style={{ minHeight: '70vh' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/peter-hammer-SXTj90G1f5c-unsplash.jpg')" }} />
      <div className="absolute inset-0 bg-[#1a0840]/85" />
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
          Latest from Teleiosis
        </h1>
        <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
          Stay updated with teachings, event recaps, testimonies, and insights into Kingdom living.
        </p>
      </div>
    </section>
  )
}

export function BlogGridSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white shadow-sm overflow-hidden animate-pulse rounded-xl"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[16/9] bg-slate-100" />
              <div className="p-6 space-y-3">
                <div className="flex gap-2">
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                  <div className="h-3 w-12 bg-slate-100 rounded" />
                </div>
                <div className="h-5 w-full bg-slate-100 rounded" />
                <div className="h-5 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
                <div className="pt-3 flex justify-between">
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                  <div className="h-3 w-12 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
