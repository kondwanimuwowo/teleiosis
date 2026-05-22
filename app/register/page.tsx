import type { Metadata } from 'next'
import { RegisterForm } from './RegisterForm'

export const metadata: Metadata = {
  title: 'Join Us — Teleiosis Mandate',
  description: 'Become part of a community devoted to Christian perfection, Kingdom authority, and the revelation of the risen Christ.',
}

export default function RegisterPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg-1.jpg')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,8,64,0.85) 0%, rgba(20,8,43,0.85) 100%)' }} />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold/70 text-xs font-semibold tracking-[0.3em] uppercase mb-5">Community</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-3xl">
            Join the Teleiosis Mandate
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            Become part of a community devoted to the practical revelation of the risen Christ and the training of believers into Christian perfection and Kingdom authority.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — copy */}
            <div className="lg:pt-4">
              <p className="text-teleiosis-gold/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Why Join</p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2c0e68] leading-tight mb-6">
                Spirit · Soul · Body
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                The Teleiosis Mandate is a training community, not just a church service. When you join, you become part of an active programme of discipleship aimed at bringing every believer to full maturity in Christ.
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Weekly Teaching', desc: 'Saturday classes at Emperor\'s Crown Olympia, Chainama Rd, Lusaka.' },
                  { title: 'Audio Library', desc: 'Access the growing library of systematic teaching series and conference recordings.' },
                  { title: 'Upcoming Conferences', desc: 'Be first to know about the Unto Perfection Conference and other gatherings.' },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teleiosis-gold shrink-0 mt-2.5" />
                    <div>
                      <p className="font-semibold text-[#2c0e68] text-sm">{title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="bg-slate-50 border border-slate-100 p-6 sm:p-10 shadow-sm">
              <h3 className="font-serif font-bold text-xl text-[#2c0e68] mb-6">Register Today</h3>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
