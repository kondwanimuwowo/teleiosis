import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

// Load .env
const envVars = readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
for (const line of envVars.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] ??= rest.join('=').trim()
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Read all JSON files from public/quotes-devotionals
const quotesDir = resolve(process.cwd(), 'public', 'quotes-devotionals')
const files = readdirSync(quotesDir).filter(f => f.endsWith('.json'))

let allQuotes = []
for (const file of files) {
  const filePath = resolve(quotesDir, file)
  const content = readFileSync(filePath, 'utf-8')
  const fileQuotes = JSON.parse(content)
  allQuotes = allQuotes.concat(fileQuotes)
}

// Transform quotes to match existing DB schema
const quotes = allQuotes.map((q) => ({
  text: q.content,
  quote_date: q.date,
  scripture: null,
  author: 'Rhema Nyambe',
  is_active: true,
}))

console.log(`Seeding ${quotes.length} quotes from ${files.length} files...`)

// Clear existing quotes first
await supabase.from('quotes').delete().neq('id', '')

// Insert all quotes
const { data, error } = await supabase
  .from('quotes')
  .insert(quotes)
  .select('id')

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`Done. Inserted: ${data.length} quotes`)
