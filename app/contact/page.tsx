export const metadata = {
  title: 'Contact Us | Teleiosis Mandate',
  description: 'Get in touch with the Teleiosis Mandate team in Lusaka, Zambia. Have questions about our programs, audio library, or upcoming events?',
}

import { FadeIn } from '../components/FadeIn'
import { Button } from '../components/ui/button'

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/sermon-4.jpg')" }} />
        <div className="absolute inset-0 bg-[#2c0e68]/85" />
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">Get in Touch</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[62px] text-white leading-[1.05] mb-6 max-w-2xl">
            Contact Us
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-xl leading-relaxed">
            Have questions about our programs, events, or the Teleiosis Mandate? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────── */}
      <FadeIn>
        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              {/* Form */}
              <div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68] mb-8">Send a Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Name <span className="text-teleiosis-gold">*</span>
                      </label>
                      <input
                        id="name" type="text" name="name" required
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4a0e68] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Email <span className="text-teleiosis-gold">*</span>
                      </label>
                      <input
                        id="email" type="email" name="email" required
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4a0e68] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                    <input
                      id="phone" type="tel" name="phone"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4a0e68] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <select
                      id="subject" name="subject"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#4a0e68] transition-colors bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="programs">Programs</option>
                      <option value="events">Events</option>
                      <option value="teachings">Teachings</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Message <span className="text-teleiosis-gold">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={5} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#4a0e68] transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto rounded-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact info */}
              <div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c0e68] mb-8">Other Ways to Reach Us</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Phone', value: '+260 97 6 779 008', href: 'tel:+260976779008' },
                    { label: 'Email', value: 'info@teleiosis.org', href: 'mailto:info@teleiosis.org' },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">{label}</p>
                      <a href={href} className="text-[#4a0e68] font-semibold text-base hover:text-teleiosis-gold transition-colors min-h-[44px] flex items-center">
                        {value}
                      </a>
                    </div>
                  ))}
                  <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                    <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Location</p>
                    <address className="not-italic text-[#2c0e68] font-semibold text-base leading-relaxed">
                      The Teleiosis Mandate<br />Lusaka, Zambia
                    </address>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Follow Us</p>
                  <div className="flex gap-5">
                    {[
                      { label: 'Facebook', href: 'https://facebook.com' },
                      { label: 'Instagram', href: 'https://instagram.com' },
                      { label: 'YouTube', href: 'https://youtube.com' },
                    ].map(({ label, href }) => (
                      <a key={label} href={href} className="text-sm font-semibold text-[#4a0e68] hover:text-teleiosis-gold transition-colors min-h-[44px] flex items-center">
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
