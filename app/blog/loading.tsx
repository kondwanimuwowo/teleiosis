export default function BlogLoading() {
  return (
    <div>
      <section className="relative flex items-center bg-[#1a0840]" style={{ minHeight: '70vh' }} />
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
    </div>
  )
}
