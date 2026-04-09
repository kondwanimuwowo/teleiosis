import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ProgressBar } from './components/ProgressBar'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: { template: '%s | Teleiosis Mandate', default: 'Teleiosis Mandate' },
  description: 'A community devoted to the practical revelation of the risen Christ — training the sons of God into Christian perfection and Kingdom authority.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`} suppressHydrationWarning>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
