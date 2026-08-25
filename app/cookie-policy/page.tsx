import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Teleiosis Mandate uses cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies to improve your experience."
      lastUpdated="May 2026"
      sections={[
        {
          heading: '1. What are cookies',
          body: (
            <p>
              Cookies are small text files placed on your device when you visit a website. They allow the website to remember your preferences and improve your experience over time. Cookies cannot run programmes or deliver viruses to your device.
            </p>
          ),
        },
        {
          heading: '2. How we use cookies',
          body: (
            <>
              <p>
                Teleiosis Mandate uses a minimal set of cookies necessary to operate the website and provide a good user experience. We do not use cookies for advertising or cross-site tracking.
              </p>
            </>
          ),
        },
        {
          heading: '3. Types of cookies we use',
          body: (
            <>
              <div className="space-y-5">
                <div className="rounded-xl p-5 bg-white/[0.05] shadow-sm">
                  <p className="text-teleiosis-gold font-semibold text-sm mb-2">Strictly necessary</p>
                  <p>These cookies are essential for the website to function. They enable core features such as authentication for the admin area and maintaining your session state. The website cannot function properly without these cookies.</p>
                  <p className="mt-2 text-white/40 text-xs">Examples: Supabase authentication session, CSRF protection tokens</p>
                </div>
                <div className="rounded-xl p-5 bg-white/[0.05] shadow-sm">
                  <p className="text-teleiosis-gold font-semibold text-sm mb-2">Functional</p>
                  <p>These cookies remember your preferences to personalise your experience, such as remembering your audio player state or display preferences.</p>
                  <p className="mt-2 text-white/40 text-xs">Examples: Audio player volume preference, UI state persistence</p>
                </div>
                <div className="rounded-xl p-5 bg-white/[0.05] shadow-sm">
                  <p className="text-teleiosis-gold font-semibold text-sm mb-2">Analytics (optional)</p>
                  <p>If we use analytics tools to understand how visitors interact with our website, these cookies collect information in aggregate and anonymised form. No personally identifiable information is collected through analytics cookies.</p>
                  <p className="mt-2 text-white/40 text-xs">We do not currently use any third-party analytics that set persistent cookies.</p>
                </div>
              </div>
            </>
          ),
        },
        {
          heading: '4. Third-party cookies',
          body: (
            <>
              <p>
                Some features of our website involve third-party services that may set their own cookies:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li><strong className="text-white/80">Payment processing:</strong> our payment provider may set cookies during the checkout process to prevent fraud and enable secure payment flows. These cookies are governed by the payment provider's own privacy policy.</li>
                <li><strong className="text-white/80">Embedded media:</strong> if we embed video or audio content from third-party platforms, those platforms may set their own cookies when the content is loaded.</li>
              </ul>
              <p className="mt-3">
                We do not control third-party cookies. Please refer to the relevant third party's cookie or privacy policy for details.
              </p>
            </>
          ),
        },
        {
          heading: '5. Managing cookies',
          body: (
            <>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or in bulk</li>
                <li>Block cookies from specific websites</li>
                <li>Block all third-party cookies</li>
                <li>Block all cookies (note: this may break core website features)</li>
              </ul>
              <p className="mt-3">
                For guidance on how to manage cookies in your specific browser, visit your browser's help pages or go to{' '}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teleiosis-gold/70 hover:text-teleiosis-gold transition-colors"
                >
                  allaboutcookies.org
                </a>.
              </p>
            </>
          ),
        },
        {
          heading: '6. Cookie consent',
          body: (
            <p>
              By continuing to use our website, you consent to the use of strictly necessary and functional cookies as described in this policy. Where we introduce optional analytics cookies in the future, we will seek your explicit consent at that time.
            </p>
          ),
        },
        {
          heading: '7. Changes to this policy',
          body: (
            <p>
              We may update this Cookie Policy as our website evolves. We will post any changes on this page with an updated revision date. We encourage you to check back periodically.
            </p>
          ),
        },
        {
          heading: '8. Contact us',
          body: (
            <p>
              If you have questions about our use of cookies, please contact us at info@teleiosis.org.
            </p>
          ),
        },
      ]}
    />
  )
}
