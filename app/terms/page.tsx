import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of the Teleiosis Mandate website.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms and conditions governing your use of our website and services."
      lastUpdated="May 2026"
      sections={[
        {
          heading: '1. Acceptance of Terms',
          body: (
            <p>
              By accessing or using the Teleiosis Mandate website (teleiosis.org), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          ),
        },
        {
          heading: '2. About Our Ministry',
          body: (
            <p>
              Teleiosis Mandate is a Christian ministry based in Lusaka, Zambia. Our website provides information about our programs, teachings, events, and community. All content is offered in a spirit of ministry and service to the Body of Christ.
            </p>
          ),
        },
        {
          heading: '3. Intellectual Property',
          body: (
            <>
              <p>
                All teachings, sermons, written materials, audio recordings, and other content published on this website are the intellectual property of Teleiosis Mandate and/or the respective speakers, unless otherwise noted.
              </p>
              <p>
                You may access content for personal, non-commercial use. You may not reproduce, redistribute, broadcast, or sell any content without prior written permission from Teleiosis Mandate.
              </p>
              <p>
                Short quotations for educational or review purposes are permitted with proper attribution to the speaker and Teleiosis Mandate.
              </p>
            </>
          ),
        },
        {
          heading: '4. Store & Purchases',
          body: (
            <>
              <p>
                Products and teachings purchased through our store are for personal use only. All sales are final unless the product is faulty or materially different from its description.
              </p>
              <p>
                Digital products (audio teachings, downloads) are made available immediately upon confirmed payment. If you experience technical issues accessing a purchase, contact us at info@teleiosis.org within 14 days.
              </p>
              <p>
                Prices are listed in the currency shown at checkout. Teleiosis Mandate reserves the right to update pricing at any time without prior notice.
              </p>
            </>
          ),
        },
        {
          heading: '5. Event Registration',
          body: (
            <>
              <p>
                By registering for an event, you confirm that the information you provide is accurate. We reserve the right to refuse entry to any individual whose registration details cannot be verified.
              </p>
              <p>
                Event schedules, speakers, and venues are subject to change. We will communicate material changes to registered attendees via email where possible.
              </p>
            </>
          ),
        },
        {
          heading: '6. Partnership Giving',
          body: (
            <p>
              All financial contributions made through the website are voluntary gifts to support the ministry of Teleiosis Mandate. Donations are non-refundable unless made in error, in which case contact us within 48 hours of the transaction. We are not a registered charity and do not issue tax receipts unless otherwise stated.
            </p>
          ),
        },
        {
          heading: '7. Acceptable Use',
          body: (
            <>
              <p>You agree not to use this website to:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
                <li>Violate any applicable law or regulation</li>
                <li>Post or transmit harmful, offensive, or unlawful content</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Interfere with the website's security or functionality</li>
                <li>Misrepresent your affiliation with Teleiosis Mandate</li>
              </ul>
            </>
          ),
        },
        {
          heading: '8. Disclaimer of Warranties',
          body: (
            <p>
              This website and its content are provided "as is" without warranty of any kind. While we strive for accuracy in all spiritual and factual matters, Teleiosis Mandate makes no representations about the completeness, reliability, or suitability of the content for any purpose. Use of the website is at your own risk.
            </p>
          ),
        },
        {
          heading: '9. Limitation of Liability',
          body: (
            <p>
              To the fullest extent permitted by applicable law, Teleiosis Mandate shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or its content.
            </p>
          ),
        },
        {
          heading: '10. Governing Law',
          body: (
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of Zambia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Zambia.
            </p>
          ),
        },
        {
          heading: '11. Contact',
          body: (
            <p>
              For questions about these terms, please contact us at info@teleiosis.org or write to us at Teleiosis Mandate, Lusaka, Zambia.
            </p>
          ),
        },
      ]}
    />
  )
}
