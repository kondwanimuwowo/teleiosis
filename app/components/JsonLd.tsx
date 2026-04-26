// Server component — renders JSON-LD structured data in <head>

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Pre-built schemas
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Teleiosis Mandate',
  url: BASE,
  logo: `${BASE}/images/teleiosis-logo.png`,
  description: 'A ministry movement devoted to the practical revelation of the risen Christ, training the sons of God into Christian perfection and Kingdom authority.',
  founder: { '@type': 'Person', name: 'Rhema Nyambe' },
  foundingDate: '2020',
  address: { '@type': 'PostalAddress', addressLocality: 'Lusaka', addressCountry: 'ZM' },
  sameAs: [
    'https://web.facebook.com/Rhemaword27',
    'https://youtube.com',
    'https://instagram.com',
  ],
}

export function eventSchema(event: {
  title: string
  date: string
  time_start?: string | null
  time_end?: string | null
  location?: string | null
  speaker?: string | null
  description?: string | null
  image_url?: string | null
  id: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.time_start ? `${event.date}T${to24h(event.time_start)}` : event.date,
    endDate: event.time_end ? `${event.date}T${to24h(event.time_end)}` : undefined,
    description: event.description ?? undefined,
    image: event.image_url ? [event.image_url] : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
      address: { '@type': 'PostalAddress', addressLocality: 'Lusaka', addressCountry: 'ZM' },
    } : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'Teleiosis Mandate',
      url: BASE,
    },
    performer: event.speaker ? { '@type': 'Person', name: event.speaker } : undefined,
    url: `${BASE}/events/${event.id}`,
  }
}

export function articleSchema(post: {
  title: string
  slug: string
  excerpt?: string | null
  image_url?: string | null
  published_at: string
  category?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.image_url ? [post.image_url] : undefined,
    datePublished: post.published_at,
    url: `${BASE}/blog/${post.slug}`,
    author: { '@type': 'Person', name: 'Rhema Nyambe' },
    publisher: {
      '@type': 'Organization',
      name: 'Teleiosis Mandate',
      logo: { '@type': 'ImageObject', url: `${BASE}/images/teleiosis-logo.png` },
    },
    articleSection: post.category ?? 'Ministry',
  }
}

// Converts "2:00 PM" → "14:00:00"
function to24h(time: string): string {
  try {
    const [t, period] = time.trim().split(' ')
    const [h, m] = t.split(':').map(Number)
    const hours = period?.toUpperCase() === 'PM' && h !== 12 ? h + 12 : period?.toUpperCase() === 'AM' && h === 12 ? 0 : h
    return `${String(hours).padStart(2, '0')}:${String(m || 0).padStart(2, '0')}:00`
  } catch {
    return '00:00:00'
  }
}
