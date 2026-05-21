export default function StoreLoading() {
  return (
    <div>
      <section className="relative flex items-center bg-[#2c0e68]" style={{ minHeight: '50vh' }} />
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
    </div>
  )
}
