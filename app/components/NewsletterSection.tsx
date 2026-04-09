export function NewsletterSection({ className = "bg-white py-16 sm:py-20 lg:py-28" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 md:p-16 relative overflow-hidden border border-[#4a0e68]/10 shadow-sm transition-all duration-500 hover:shadow-md group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4a0e68] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teleiosis-gold opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 transition-all duration-700 group-hover:scale-110" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2c0e68] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 tracking-tight">
              Never Miss an Event
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Subscribe to our newsletter for exclusive updates, upcoming gatherings, and deep teachings.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-slate-900 border border-[#4a0e68]/20 focus:outline-none focus:ring-2 focus:ring-[#4a0e68]/40 focus:border-[#4a0e68]/40 bg-white transition-all shadow-sm"
                required
              />
              <button type="button" className="px-8 py-4 bg-[#4a0e68] text-white font-bold rounded-xl hover:bg-[#4a0e68]/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-sm text-slate-400 font-medium">We respect your privacy. No spam, ever.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
