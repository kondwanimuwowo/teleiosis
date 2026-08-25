import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Teleiosis Mandate collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="May 2026"
      sections={[
        {
          heading: '1. Who we are',
          body: (
            <>
              <p>
                Teleiosis Mandate is a Christian ministry community based in Lusaka, Zambia, devoted to the practical revelation of the risen Christ and the training of believers into Christian perfection and Kingdom authority.
              </p>
              <p>
                This Privacy Policy explains how we handle personal data collected through our website at teleiosis.org and related services.
              </p>
            </>
          ),
        },
        {
          heading: '2. Information we collect',
          body: (
            <>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li><strong className="text-white/80">Contact forms:</strong> name, email address, phone number, and message content</li>
                <li><strong className="text-white/80">Newsletter sign-up:</strong> email address</li>
                <li><strong className="text-white/80">Event registration:</strong> name, email, and phone number</li>
                <li><strong className="text-white/80">Store purchases:</strong> name, email, and payment details processed securely by our payment provider</li>
                <li><strong className="text-white/80">Partnership giving:</strong> name, email, and payment information processed by our payment provider</li>
              </ul>
              <p className="mt-3">
                We also collect limited technical data automatically, such as your browser type, device type, and pages visited, through standard server logs and analytics.
              </p>
            </>
          ),
        },
        {
          heading: '3. How we use your information',
          body: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li>Respond to your enquiries and prayer requests</li>
                <li>Send ministry updates, event announcements, and teaching notifications (with your consent)</li>
                <li>Process event registrations and notify you of event details</li>
                <li>Fulfil store orders and confirm purchases</li>
                <li>Process partnership giving and issue receipts</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="mt-3">
                We will never sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </>
          ),
        },
        {
          heading: '4. Data storage and security',
          body: (
            <>
              <p>
                Your data is stored securely on Supabase (PostgreSQL database hosted on AWS infrastructure) with row-level security policies controlling access. Payment information is handled entirely by our payment processor and is never stored on our servers.
              </p>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or disclosure.
              </p>
            </>
          ),
        },
        {
          heading: '5. Email communications',
          body: (
            <>
              <p>
                If you subscribe to our newsletter or register for an event, we may send you email updates about our ministry, teachings, and upcoming events. Every email includes an unsubscribe link. You may also opt out at any time by contacting us directly at info@teleiosis.org.
              </p>
            </>
          ),
        },
        {
          heading: '6. Third-party services',
          body: (
            <>
              <p>We use trusted third-party services to operate our website:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li><strong className="text-white/80">Supabase:</strong> database and authentication</li>
                <li><strong className="text-white/80">Cloudflare R2:</strong> audio and media file hosting</li>
                <li><strong className="text-white/80">Resend:</strong> transactional email delivery</li>
                <li><strong className="text-white/80">Vercel:</strong> website hosting and infrastructure</li>
                <li><strong className="text-white/80">Payment provider:</strong> secure payment processing</li>
              </ul>
              <p className="mt-3">
                Each of these services operates under its own privacy policy and data processing agreements.
              </p>
            </>
          ),
        },
        {
          heading: '7. Your rights',
          body: (
            <>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for email communications at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at info@teleiosis.org.
              </p>
            </>
          ),
        },
        {
          heading: '8. Changes to this policy',
          body: (
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated via our website. Continued use of the website after changes constitutes acceptance of the updated policy.
            </p>
          ),
        },
      ]}
    />
  )
}
