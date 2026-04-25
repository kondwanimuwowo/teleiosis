import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { PublicShell } from './components/PublicShell'
import { ProgressBar } from './components/ProgressBar'
import { Suspense } from 'react'
import { AudioProvider } from './context/AudioContext'
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer'

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
  description: 'A community devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`} suppressHydrationWarning>
        <AudioProvider>
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <PublicShell>
            {children}
          </PublicShell>
          <GlobalAudioPlayer />
        </AudioProvider>
      </body>
    </html>
  )
}
