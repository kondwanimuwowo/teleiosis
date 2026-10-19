export function TeachingsHero() {
  return (
    <section className="relative flex items-center bg-[#1a0840]" style={{ minHeight: '70vh' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pexels-bible-1869164_1280.jpg')" }} />
      <div className="absolute inset-0 bg-[#1a0840]/85" />
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
          Teachings and series
        </h1>
        <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
          Access a growing library organised by program, covering Kingdom authority, sonship, Christian perfection, and the practical revelation of Christ.
        </p>
      </div>
    </section>
  )
}

export function TeachingsListSkeleton() {
  return (
    <div>
      <div className="bg-white shadow-sm py-4 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="h-9 w-full max-w-sm bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse hidden sm:block" />
        </div>
      </div>
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-sm animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-[35%] lg:w-[40%] aspect-[21/9] sm:aspect-auto sm:min-h-[160px] bg-[#1a0840]" />
                <div className="flex-1 p-6 sm:p-8 bg-[#2c0e68] flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-20 bg-white/20 rounded" />
                    <div className="h-5 w-24 bg-white/10 rounded-full" />
                  </div>
                  <div className="h-7 w-2/3 bg-white/25 rounded" />
                  <div className="h-4 w-full max-w-sm bg-white/15 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
