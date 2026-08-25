import { FadeIn } from '../components/FadeIn'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Contact Us | Teleiosis Mandate',
  description: 'Get in touch with the Teleiosis Mandate team in Lusaka, Zambia. Have questions about our programs, audio library, or upcoming events?',
}

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ minHeight: '65vh' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/images/sermon-4.jpg')" }} 
        />
        <div className="absolute inset-0 bg-[#1a0840]/75" />

        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pb-20">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6 max-w-3xl">
            Contact us
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">
            Have questions about our programs, events, or the mandate? We are here to serve and support your journey.
          </p>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28 lg:py-32 overflow-hidden relative">
        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a0e68]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teleiosis-gold/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Form Section */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="bg-slate-50 p-6 sm:p-10 shadow-sm rounded-xl">
                  <h2 className="font-serif font-bold text-xl text-[#2c0e68] mb-1">Send a message</h2>
                  <p className="text-slate-500 text-sm mb-8">
                    Fill out the form below and we will get back to you as soon as possible.
                  </p>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="bg-slate-50 p-8 sm:p-12 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teleiosis-gold opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10 space-y-12">
                    <h3 className="font-serif font-bold text-2xl text-[#2c0e68]">Contact information</h3>
                    
                    <div className="space-y-8">
                      {[
                        { icon: Phone, label: 'Phone', value: '+260 977 964 076', href: 'tel:+260977964076' },
                        { icon: Mail, label: 'Email', value: 'info@teleiosis.org', href: 'mailto:info@teleiosis.org' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teleiosis-purple flex-shrink-0">
                            <item.icon size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">{item.label}</p>
                            <a href={item.href} className="text-[#2c0e68] font-bold text-lg hover:text-teleiosis-gold transition-colors">
                              {item.value}
                            </a>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teleiosis-purple flex-shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">Our Location</p>
                          <address className="not-italic text-[#2c0e68] font-bold text-lg leading-snug">
                            The Teleiosis Mandate<br />Lusaka, Zambia
                          </address>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-6">Connect with us</p>
                      <div className="flex gap-4">
                        {[
                          { icon: Facebook, href: 'https://web.facebook.com/Rhemaword27', label: 'Facebook' },
                          { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                          { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
                        ].map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            className="w-12 h-12 rounded-full bg-[#4a0e68]/10 flex items-center justify-center text-[#4a0e68] hover:bg-[#4a0e68] hover:text-white transition-all duration-300"
                          >
                            <social.icon size={20} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
