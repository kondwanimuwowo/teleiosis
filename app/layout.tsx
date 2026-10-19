import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { PublicShell } from './components/PublicShell'
import { ProgressBar } from './components/ProgressBar'
import { Suspense } from 'react'
import { AudioProvider } from './context/AudioContext'
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer'
import { JsonLd, organizationSchema } from './components/JsonLd'
import SmoothScroll from './components/SmoothScroll'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from './components/ScrollToTop'
import { isMaintenanceMode } from '@/lib/maintenance'

// Self-hosted variable fonts, subset to Latin (+ Greek for Inter) — see app/fonts
const inter = localFont({
  src: './fonts/Inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

const cinzel = localFont({
  src: './fonts/Cinzel.woff2',
  variable: '--font-serif',
  display: 'swap',
  weight: '400 900',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'

export const metadata: Metadata = {
  title: { template: '%s | Teleiosis Mandate', default: 'Teleiosis Mandate: That Which Is Perfect Is Come' },
  description: 'A community devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority. Based in Lusaka, Zambia.',
  metadataBase: new URL(BASE),
  keywords: ['Teleiosis Mandate', 'Christian perfection', 'Kingdom authority', 'Rhema Nyambe', 'Lusaka Zambia', 'Christian teaching', 'Manifested Sons of God', 'sonship'],
  authors: [{ name: 'Rhema Nyambe', url: BASE }],
  creator: 'Teleiosis Mandate',
  openGraph: {
    type: 'website',
    siteName: 'Teleiosis Mandate',
    locale: 'en_ZM',
    url: BASE,
    title: 'Teleiosis Mandate: That Which Is Perfect Is Come',
    description: 'A community devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Teleiosis Mandate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teleiosis Mandate: That Which Is Perfect Is Come',
    description: 'Training believers into Christian perfection and Kingdom authority. Based in Lusaka, Zambia.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: BASE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`} suppressHydrationWarning>
        {isMaintenanceMode() ? children : (
        <AudioProvider>
          <SmoothScroll>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <PublicShell>
              {children}
            </PublicShell>
            <GlobalAudioPlayer />
          <CookieBanner />
          <ScrollToTop />
          </SmoothScroll>
        </AudioProvider>
        )}
      </body>
    </html>
  )
}
