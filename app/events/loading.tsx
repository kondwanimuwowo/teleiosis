export default function EventsLoading() {
  return (
    <div>
      <section className="relative flex items-center bg-[#2c0e68]" style={{ minHeight: '70vh' }} />
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-9 w-24 bg-slate-100 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-slate-100 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 animate-pulse"
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
    </div>
  )
}
