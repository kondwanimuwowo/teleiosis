# Teleiosis Mandate — Supabase & Cloudflare Setup Guide

This guide walks you through setting up Supabase (database) and Cloudflare (CDN) for the Teleiosis audio teachings platform.

## Prerequisites

- Supabase account (free tier works): https://supabase.com
- Cloudflare account (free tier works): https://cloudflare.com
- Node.js 18+
- Git

---

## Part 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name:** `teleiosis` (or your preference)
   - **Password:** Strong password (save this!)
   - **Region:** Choose closest to your users
4. Click "Create new project" and wait ~2 min

### 1.2 Get Your Credentials

1. Go to **Settings → API** in your Supabase dashboard
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Paste them into `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxx...
```

### 1.3 Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run these SQL scripts:

#### Table 1: Teaching Categories

```sql
CREATE TABLE teaching_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default categories
INSERT INTO teaching_categories (name, slug, description) VALUES
  ('Sonship & Identity', 'sonship', 'Teachings on your true identity as a son/daughter of God'),
  ('Kingdom Authority', 'authority', 'Exercising dominion and authority in Kingdom'),
  ('Christian Perfection', 'perfection', 'The pathway to Christian maturity and fullness'),
  ('Corporate Prayer', 'prayer', 'Intercession, worship, and unified prayer'),
  ('Heavenly Realms', 'heavenly', 'Understanding and accessing the supernatural realm'),
  ('Conferences', 'conferences', 'Teachings from annual conferences and events');
```

#### Table 2: Teachings

```sql
CREATE TABLE teachings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  speaker VARCHAR(255),
  category_id UUID NOT NULL REFERENCES teaching_categories(id) ON DELETE CASCADE,
  duration_minutes INTEGER,
  published_date TIMESTAMP NOT NULL DEFAULT NOW(),
  audio_url VARCHAR(1000) NOT NULL,
  thumbnail_url VARCHAR(1000),
  price DECIMAL(10, 2),
  included_in_membership BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_teachings_category_id ON teachings(category_id);
CREATE INDEX idx_teachings_published_date ON teachings(published_date DESC);
```

#### Table 3: Audio Files (Optional, for advanced tracking)

```sql
CREATE TABLE audio_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teaching_id UUID NOT NULL REFERENCES teachings(id) ON DELETE CASCADE,
  filename VARCHAR(500) NOT NULL,
  cloudflare_url VARCHAR(1000) NOT NULL,
  file_size_mb DECIMAL(10, 2),
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audio_files_teaching_id ON audio_files(teaching_id);
```

### 1.4 Enable Row Level Security (Optional but Recommended)

For production, enable RLS to control data access:

```sql
-- Enable RLS on teachings table
ALTER TABLE teachings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read" ON teachings
  FOR SELECT
  USING (true);

-- Create policy to allow only admins to insert/update
CREATE POLICY "Allow admins to insert/update" ON teachings
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

### 1.5 Test Your Connection

In your Next.js app:

```bash
npm install
npm run dev
```

Visit http://localhost:3000/teachings and check the browser console for errors.

---

## Part 2: Cloudflare Setup

### 2.1 Enable Cloudflare R2 (Object Storage)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the left sidebar, click **R2**
3. Click "Create bucket"
4. Name it: `teleiosis-audio`
5. Choose CORS settings:
   - **CORS:** Enabled
   - **Allowed origins:** `https://teleiosis.org`, `http://localhost:3000`
   - **Methods:** GET, HEAD, OPTIONS
6. Click "Create bucket"

### 2.2 Create R2 API Credentials

1. Click **R2 API Tokens** in the sidebar
2. Click "Create API token"
3. Name: `teleiosis-app`
4. Permissions: **Object Read and Write**
5. TTL: 730 days (1 year)
6. Copy the credentials:
   - `Access Key ID` → `CLOUDFLARE_R2_ACCESS_KEY`
   - `Secret Access Key` → `CLOUDFLARE_R2_SECRET_KEY`

Add to `.env.local`:

```bash
CLOUDFLARE_R2_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_SECRET_KEY=xxxxx
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=xxxxx
NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET=teleiosis-audio
```

### 2.3 Configure Public URL for Your Bucket

1. In R2 bucket settings, scroll to **Domain**
2. Connect a custom domain (recommended):
   - Buy a domain (e.g., `cdn.teleiosis.org`)
   - Add to Cloudflare DNS
   - Point to R2: `CNAME` to `xxxxx.r2.cloudflarestorage.com`
   - Or use Cloudflare's free public URL: `https://pub-xxxxx.r2.dev`

Add to `.env.local`:

```bash
NEXT_PUBLIC_CLOUDFLARE_CDN_URL=https://cdn.teleiosis.org
```

### 2.4 Create Audio Upload Script (Optional)

Create `/scripts/upload-to-r2.js` to batch upload audio files:

```javascript
import fs from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  },
})

const audioDir = './audio-files'
const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'))

for (const file of files) {
  const filePath = path.join(audioDir, file)
  const fileContent = fs.readFileSync(filePath)

  const params = {
    Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
    Key: `teachings/${file}`,
    Body: fileContent,
    ContentType: 'audio/mpeg',
  }

  try {
    await s3.send(new PutObjectCommand(params))
    console.log(`✓ Uploaded ${file}`)
  } catch (err) {
    console.error(`✗ Failed to upload ${file}:`, err)
  }
}
```

Run with:
```bash
node scripts/upload-to-r2.js
```

---

## Part 3: Adding Your Audio Teachings

### 3.1 Prepare Audio Metadata

Create a CSV file with your teaching info:

```csv
title,speaker,description,category,duration_minutes,published_date,audio_filename,price,included_in_membership
Kingdom Authority in the Marketplace,Rhema Nyambe,Exercising dominion in everyday life,authority,45,2026-04-01,kingdom-authority.mp3,29,true
The Sonship Revelation,Rhema Nyambe,Understanding your identity as a son of God,sonship,52,2026-03-28,sonship-revelation.mp3,24,true
Ascending to Glory,Rhema Nyambe,Walking in heavenly authority,heavenly,58,2026-03-21,ascending-to-glory.mp3,31,false
```

### 3.2 Upload Audio Files to Cloudflare R2

1. Download your audio files from Google Drive
2. Upload to Cloudflare R2 bucket (`teleiosis-audio`)
   - Use the Cloudflare dashboard **Upload** button, or
   - Use the script above for batch uploads

### 3.3 Insert Teachings into Supabase

Go to **Supabase → Table Editor**:

1. Click the `teaching_categories` table and note the category IDs
2. Click the `teachings` table and click **Insert row**
3. Fill in:
   - **title:** Teaching title
   - **speaker:** Speaker name
   - **description:** 1-2 sentence description
   - **category_id:** UUID from categories table
   - **duration_minutes:** Length in minutes
   - **published_date:** Date published (YYYY-MM-DD)
   - **audio_url:** Full Cloudflare R2 URL (e.g., `https://cdn.teleiosis.org/teachings/kingdom-authority.mp3`)
   - **price:** Cost (or NULL if included in membership)
   - **included_in_membership:** true/false
4. Click **Save**

Repeat for each teaching.

### 3.4 Verify in Your App

1. Go to http://localhost:3000/teachings
2. You should see all your teachings with working audio players
3. Click play to test streaming from Cloudflare

---

## Part 4: Optional Enhancements

### 4.1 Automated Audio Upload API

Create an API route to upload audio directly:

```typescript
// app/api/upload-audio/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const key = `teachings/${Date.now()}-${file.name}`

    await s3.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
    }))

    const publicUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_CDN_URL}/${key}`

    return NextResponse.json({ url: publicUrl }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

### 4.2 Analytics with Cloudflare Analytics Engine

Track teaching listens and downloads:

```typescript
// In your audio player component
const trackPlay = async (teachingId: string) => {
  await fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      event: 'teaching_played',
      teaching_id: teachingId,
      timestamp: new Date(),
    }),
  })
}
```

---

## Troubleshooting

### Error: "SUPABASE_URL not found"
- Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL`
- Restart dev server: `npm run dev`

### Audio doesn't play
- Verify Cloudflare R2 CDN URL is correct
- Check CORS settings on R2 bucket
- Ensure audio file exists in bucket

### Supabase query returns empty
- Check teaching records exist in table
- Verify `category_id` references a valid category
- Check RLS policies (if enabled)

### Cloudflare upload fails
- Verify R2 credentials in `.env.local`
- Check bucket name is correct
- Ensure API token has **Object Write** permissions

---

## Production Checklist

- [ ] Supabase project created and secured
- [ ] Database tables created with test data
- [ ] Cloudflare R2 bucket configured with custom domain
- [ ] Audio files uploaded to R2
- [ ] Teaching records in Supabase with correct audio URLs
- [ ] Environment variables set in production
- [ ] CORS and RLS policies configured
- [ ] Backup plan for database (use Supabase backups)
- [ ] CDN cache headers configured on Cloudflare
- [ ] SSL/TLS enabled (Cloudflare handles this)
- [ ] Tested audio streaming from production URL
- [ ] Monitoring enabled (Cloudflare Analytics)

---

## Cost Estimate (Monthly, Free Tier)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Supabase | 50K monthly active users, 1GB storage | Free (covers your use case) |
| Cloudflare | 100K requests/month, R2 storage | Free (first 10GB R2 storage) |
| **Total** | | **~$0/month** |

Once you exceed free tier limits, Supabase charges $25/month and Cloudflare charges based on storage/requests.

---

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Cloudflare R2 Docs:** https://developers.cloudflare.com/r2
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Last Updated:** April 5, 2026
**Questions?** Check CLAUDE.md for architecture details
