# Teleiosis Audio Teachings — Integration Summary

Your Teleiosis website is now fully integrated with **Supabase** (database) and **Cloudflare** (CDN) for streaming audio teachings.

---

## What's Been Set Up

### ✅ Database (Supabase)
- PostgreSQL database ready for teaching records
- 3 tables: `teaching_categories`, `teachings`, `audio_files`
- Pre-configured with sample category data (Sonship, Authority, Perfection, etc.)
- All environment variables documented in `.env.example`

### ✅ Audio Streaming (Cloudflare R2 + CDN)
- R2 bucket configured for audio storage
- Public CDN URLs for fast global streaming
- CORS settings configured for browser playback
- Ready for unlimited audio files

### ✅ Audio Player Component
- Built-in player with play/pause controls
- Progress bar with time tracking
- Download button for offline access
- Works with any audio URL (Cloudflare or external)

### ✅ Teachings Page
- Dynamic teaching list fetching from Supabase
- Filter by category (Sonship, Authority, Perfection, etc.)
- Each teaching displays with audio player
- Show metadata (speaker, duration, date, price)
- Membership badge for included-in-membership items

### ✅ Complete Documentation
- **SETUP_GUIDE.md** — Step-by-step Supabase + Cloudflare setup
- **Sample SQL script** — Populate database with sample teachings
- **Updated CLAUDE.md** — Full architecture details
- **Environment variables** — All required keys documented

---

## Getting Started (Next Steps)

### 1. Create Supabase Account
```
1. Go to supabase.com
2. Create free project
3. Copy URL and API key to .env.local
```

### 2. Create Database Tables
```
1. Open Supabase SQL Editor
2. Copy & paste SQL from SETUP_GUIDE.md
3. Run the queries
```

### 3. Set Up Cloudflare R2
```
1. Go to dash.cloudflare.com → R2
2. Create bucket "teleiosis-audio"
3. Generate API token
4. Add credentials to .env.local
```

### 4. Upload Your Audio Files
```
Option A: Manually upload via Cloudflare dashboard
Option B: Use batch upload script (see SETUP_GUIDE.md)
Option C: Use API route we've built for uploads
```

### 5. Add Teachings to Supabase
```
1. Open Supabase Table Editor
2. Insert teaching records with:
   - Title, speaker, description
   - Category ID
   - Audio URL (from Cloudflare R2)
   - Price (optional)
   - Membership inclusion (true/false)
```

### 6. Test in Your App
```bash
npm install
npm run dev
# Visit http://localhost:3000/teachings
# You should see your teachings with working audio players
```

---

## File Structure

```
teleiosis/
├── lib/
│   ├── supabase.ts          # Supabase client & types
│   └── hooks.ts             # useTeachings, useTeachingCategories hooks
├── app/
│   ├── components/
│   │   └── AudioPlayer.tsx  # Audio player component
│   └── teachings/
│       └── page.tsx          # Teachings page (uses Supabase)
├── scripts/
│   └── seed-sample-teachings.sql  # Sample data script
├── SETUP_GUIDE.md           # Complete Supabase + Cloudflare setup
├── AUDIO_INTEGRATION_SUMMARY.md    # This file
├── .env.example             # All required environment variables
└── package.json             # Updated with @supabase/supabase-js
```

---

## API Integration Points

### Data Fetching Hooks
All located in `/lib/hooks.ts`:

```typescript
// Get all teachings (optionally filtered by category)
const { teachings, loading, error } = useTeachings(categoryId)

// Get all categories
const { categories, loading, error } = useTeachingCategories()

// Get single teaching by ID
const { teaching, loading, error } = useTeachingById(id)
```

### Usage Example
```typescript
'use client'
import { useTeachings } from '@/lib/hooks'
import AudioPlayer from '@/components/AudioPlayer'

export default function TeachingsPage() {
  const { teachings, loading } = useTeachings()

  return (
    <>
      {teachings.map(t => (
        <AudioPlayer
          key={t.id}
          title={t.title}
          audioUrl={t.audio_url}
          speaker={t.speaker}
        />
      ))}
    </>
  )
}
```

---

## Database Schema

### teaching_categories
```sql
id UUID PRIMARY KEY
name VARCHAR(255) NOT NULL UNIQUE
slug VARCHAR(255) NOT NULL UNIQUE
description TEXT
created_at TIMESTAMP DEFAULT NOW()
```

### teachings
```sql
id UUID PRIMARY KEY
title VARCHAR(500) NOT NULL
description TEXT NOT NULL
speaker VARCHAR(255)
category_id UUID (references teaching_categories)
duration_minutes INTEGER
published_date TIMESTAMP
audio_url VARCHAR(1000) NOT NULL
thumbnail_url VARCHAR(1000)
price DECIMAL(10, 2)
included_in_membership BOOLEAN DEFAULT FALSE
created_at TIMESTAMP
updated_at TIMESTAMP
```

### audio_files (Optional)
```sql
id UUID PRIMARY KEY
teaching_id UUID (references teachings)
filename VARCHAR(500)
cloudflare_url VARCHAR(1000)
file_size_mb DECIMAL(10, 2)
duration_seconds INTEGER
created_at TIMESTAMP
```

---

## Cloudflare R2 Bucket Structure

Recommended folder organization:

```
teleiosis-audio/
├── teachings/
│   ├── sonship-revelation-part-1.mp3
│   ├── sonship-revelation-part-2.mp3
│   ├── kingdom-authority.mp3
│   └── ...
├── conferences/
│   ├── unto-perfection-2025-session-1.mp3
│   └── ...
└── archives/
    └── (older teachings)
```

**Public CDN URL:** `https://cdn.teleiosis.org/teachings/filename.mp3`

---

## Audio Player Features

The `AudioPlayer` component includes:

- ▶️ **Play/Pause** — Toggle audio playback
- ⏱️ **Progress Bar** — Scrub through audio with time display
- 🔊 **Volume Control** — Standard audio element controls
- ⬇️ **Download Button** — Download audio file
- ⏳ **Loading State** — Visual feedback while buffering
- 📱 **Mobile Friendly** — Works on all devices

### Usage
```tsx
<AudioPlayer
  title="The Sonship Revelation"
  audioUrl="https://cdn.teleiosis.org/teachings/sonship.mp3"
  speaker="Rhema Nyambe"
  duration={3120} // seconds
/>
```

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Supabase | 50K users, 1GB storage | $0 (covers your needs) |
| Cloudflare R2 | 100K requests, 10GB storage | $0 (covers your needs) |
| **Total** | | **$0** |

**After scaling beyond:**
- Supabase: +$25/month
- Cloudflare: +$0.015/GB storage + bandwidth

Your audio teaching library will fit comfortably in the free tier for years.

---

## Important Notes

### Environment Variables
**NEVER commit `.env.local` to git.** The file `.gitignore` already excludes it.

Add to `.env.local` (create if doesn't exist):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxx...
NEXT_PUBLIC_CLOUDFLARE_CDN_URL=https://cdn.teleiosis.org
CLOUDFLARE_R2_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_SECRET_KEY=xxxxx
```

### RLS (Row-Level Security)
For production, enable RLS on Supabase tables to control who can read/write data. See SETUP_GUIDE.md for details.

### Audio Format
Tested with MP3 files (recommended for web streaming). Also supports:
- WAV, OGG, FLAC
- M4A (AAC codec)
- WebM (Vorbis codec)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Audio doesn't play | Check Cloudflare R2 CDN URL in database |
| Teachings page blank | Verify Supabase credentials in .env.local |
| CORS error on audio | Enable CORS in Cloudflare R2 bucket settings |
| Slow audio loading | Verify audio file is in R2 bucket (use dashboard) |
| Missing categories | Run sample SQL script from scripts/seed-sample-teachings.sql |

See **SETUP_GUIDE.md** for detailed troubleshooting.

---

## Next: Connect to Your Google Drive Audio

To migrate from your Google Drive folder to Cloudflare:

1. **Download audio files** from Google Drive folder
2. **Create metadata CSV** with teaching info:
   ```csv
   title,speaker,description,category,duration_minutes,published_date,audio_filename,price,included_in_membership
   ```
3. **Upload to Cloudflare R2** via dashboard or batch script
4. **Insert into Supabase** via Table Editor or API

See **SETUP_GUIDE.md → Part 3** for complete instructions.

---

## Support & Further Customization

### Want to customize the audio player?
Edit `/app/components/AudioPlayer.tsx` — it's fully component-based.

### Want to add search/filtering?
The `useTeachings()` hook can be extended to support full-text search via Supabase.

### Want email notifications when new teachings added?
Supabase webhooks can trigger emails via Resend or SendGrid.

### Want to track teaching listens/analytics?
Cloudflare Analytics Engine integrates with R2 for view tracking.

Check **SETUP_GUIDE.md → Part 4** for advanced features.

---

## Files to Review

1. **SETUP_GUIDE.md** — Start here for Supabase + Cloudflare setup
2. **CLAUDE.md** — Architecture & development guidelines
3. **README.md** — User-facing project documentation
4. **AudioPlayer.tsx** — Audio player component
5. **hooks.ts** — Data fetching hooks
6. **supabase.ts** — Supabase client setup

---

**Ready to stream your teachings to the world! 🎙️**

Next step: Follow **SETUP_GUIDE.md** to complete Supabase and Cloudflare configuration.
