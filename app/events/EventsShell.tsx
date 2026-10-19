export function EventsHero() {
  return (
    <section className="relative flex items-center bg-[#170836]" style={{ minHeight: '70vh' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/event-1.jpg')" }} />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(23,8,54,0.85)' }} />
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
          Join us in person<br className="hidden sm:block" /> or online
        </h1>
        <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
          Experience transformative gatherings designed to deepen your understanding of Christian perfection and Kingdom authority.
        </p>
      </div>
    </section>
  )
}

export function EventsListSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter tab skeletons */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 bg-slate-100 rounded-full animate-pulse" />
          ))}
        </div>
        {/* Event row skeletons */}
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="shadow-sm rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex-shrink-0 w-20 h-12 bg-slate-100 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-2/3 bg-slate-100 rounded" />
                <div className="h-3 w-1/3 bg-slate-100 rounded" />
              </div>
              <div className="h-5 w-20 bg-slate-100 rounded-full" />
              <div className="h-9 w-28 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
