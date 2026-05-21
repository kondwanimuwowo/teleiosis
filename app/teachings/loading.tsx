// Shown only for the very brief moment before streaming begins.
// The hero renders immediately once streaming starts, so we only
// need a skeleton for the list area here.
export default function TeachingsLoading() {
  return (
    <div>
      <section className="relative flex items-center bg-[#2c0e68]" style={{ minHeight: '70vh' }} />

      <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-30">
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
              className="rounded-2xl overflow-hidden border border-[#4a0e68]/20 animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-[35%] lg:w-[40%] aspect-[21/9] sm:aspect-auto sm:min-h-[160px] bg-[#1a0840]" />
                <div className="flex-1 p-6 sm:p-8 bg-gradient-to-r from-[#2c0e68] to-[#4a0e68] flex flex-col justify-center gap-3">
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
