// Manifested Sons of God Class — fortnightly (every 14 days) on Saturday
// Seed date: 18 April 2026

const SEED_DATE = new Date('2026-04-18T00:00:00Z')
const INTERVAL_DAYS = 14

export function getNextManifestSonsDates(fromDate: Date, count = 4): Date[] {
  const dates: Date[] = []
  let cursor = new Date(SEED_DATE)

  // Advance cursor past fromDate
  while (cursor <= fromDate) {
    cursor = new Date(cursor.getTime() + INTERVAL_DAYS * 86400000)
  }

  for (let i = 0; i < count; i++) {
    dates.push(new Date(cursor))
    cursor = new Date(cursor.getTime() + INTERVAL_DAYS * 86400000)
  }

  return dates
}

export function getNextManifestSonsDate(fromDate: Date): Date {
  return getNextManifestSonsDates(fromDate, 1)[0]
}

export const MANIFESTED_SONS_TEMPLATE = {
  title: 'Manifested Sons of God Class',
  time_start: '2:00 PM',
  time_end: '5:00 PM',
  location: 'Emperors Crown Olympia, Along Chainama Road, Lusaka',
  speaker: 'Rhema Nyambe',
  type: 'In Person',
  is_recurring: true,
  recurrence_frequency: 'fortnightly',
  recurrence_interval_days: 14,
  recurrence_day_of_week: 'saturday',
  recurring_label: 'Manifested Sons of God Class — Fortnightly Saturday',
  description: 'A deep systematic teaching class held every two weeks, exploring the revelation of the Manifested Sons of God, Kingdom authority, and the fullness of Christ.',
  image_url: '/images/manifested-sons-of-god-class-light1.jpg',
}
