# Teleiosis Mandate — SEO & Launch Checklist

This guide covers what you need to do manually to maximise search engine visibility and social sharing for the Teleiosis Mandate website.

---

## 1. Add Your OG Image

The site references `/og-default.jpg` as the default social preview image (shown when someone shares the homepage on Facebook, WhatsApp, X, etc.).

**Action:**
- Create a **1200 × 630 px** JPG image — ideally the Teleiosis logo/wordmark on a dark purple background
- Save it as `public/og-default.jpg`
- Commit and push

---

## 2. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → enter `https://teleiosis.org`
3. Verify ownership (recommended: HTML tag method — paste the `<meta>` tag into `app/layout.tsx` metadata as `verification.google`)
4. Once verified, go to **Sitemaps** → enter `sitemap.xml` → Submit
5. Check **Coverage** in a few days to see if pages are indexed

---

## 3. Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site → enter `https://teleiosis.org`
3. Submit sitemap: `https://teleiosis.org/sitemap.xml`

---

## 4. Google Analytics (GA4)

1. Go to [analytics.google.com](https://analytics.google.com) → create a GA4 property
2. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Add it to your Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Ask your developer to wire up the GA4 script using `@next/third-parties/google` or manually

---

## 5. Facebook: Domain Verification & Open Graph Debugger

1. **Verify your domain** for Facebook sharing at [business.facebook.com/settings](https://business.facebook.com/settings) → Brand Safety → Domains
2. After deploying with the OG image, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to scrape and preview how your pages look when shared
3. Test key pages: `/`, `/events/[id]`, `/blog/[slug]`

---

## 6. Twitter/X Card Validator

1. Go to [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) (or use the new X developer tools)
2. Paste your event or blog post URL to preview the Twitter card
3. Ensure the image and description show correctly

---

## 7. WhatsApp Link Previews

WhatsApp uses Open Graph tags. After deploying:
- Share a link to an event page or blog post in a chat and verify the preview card appears
- If it doesn't, use the [Facebook Debugger](https://developers.facebook.com/tools/debug/) to refresh the OG cache

---

## 8. Vercel Environment Variables

Make sure these are set in Vercel → Project Settings → Environment Variables for **Production**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://teleiosis.org` |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service role key |
| `NEXT_PUBLIC_LENCO_PUBLIC_KEY` | *production key when going live* |
| `LENCO_SECRET_KEY` | *production key when going live* |
| `NEXT_PUBLIC_LENCO_SANDBOX` | `false` for production |
| `NEXT_PUBLIC_CLOUDFLARE_CDN_URL` | your R2 CDN URL |
| `CLOUDFLARE_R2_ACCESS_KEY` | your R2 access key |
| `CLOUDFLARE_R2_SECRET_KEY` | your R2 secret key |
| `CRON_SECRET` | a random secret string (for cron job security) |

---

## 9. Vercel Cron — Auto-Generate Manifested Sons Classes

The `/api/cron/manifested-sons` endpoint automatically inserts upcoming fortnightly Saturday classes into the events calendar (keeps at least 3 future dates ahead).

**To run it automatically, add this to `vercel.json` in the project root:**

```json
{
  "crons": [
    {
      "path": "/api/cron/manifested-sons",
      "schedule": "0 6 * * 1"
    }
  ]
}
```

This runs every Monday at 6 AM UTC. The endpoint checks if there are enough upcoming classes — if not, it inserts new ones.

**Also set `CRON_SECRET`** in Vercel env vars. Vercel will automatically pass it in the `Authorization: Bearer <CRON_SECRET>` header.

---

## 10. Switch Lenco from Sandbox to Production

When you're ready to accept real payments:

1. Log into your Lenco account and get your **live** Public Key and Secret Key
2. Update Vercel env vars:
   - `NEXT_PUBLIC_LENCO_PUBLIC_KEY` → live public key
   - `LENCO_SECRET_KEY` → live secret key
   - `NEXT_PUBLIC_LENCO_SANDBOX` → `false`
3. Redeploy (or trigger a new deployment)
4. Register your webhook URL in Lenco dashboard: `https://teleiosis.org/api/webhooks/lenco`

---

## 11. WhatsApp Business

If you want WhatsApp links to open a Business number (with a pre-filled message):
1. Register at [business.whatsapp.com](https://business.whatsapp.com)
2. The phone number used in the site footer is `+260977964076` — verify this is correct with Rhema

---

## 12. SQL Migrations to Run

Run these in order in your **Supabase SQL Editor** before deploying:

1. `supabase/recurrence-schema.sql` — adds recurrence_frequency, recurrence_interval_days, recurrence_day_of_week columns to events
2. `supabase/manifested-sons-seed.sql` — inserts the next 4 upcoming Manifested Sons classes (May 2, May 16, May 30, June 13 2026)

---

## 13. Google Search Console: Rich Results

After the site is indexed, check for rich results eligibility:
- **Event rich results**: Go to [search.google.com/test/rich-results](https://search.google.com/test/rich-results) and test an event URL like `https://teleiosis.org/events/[id]`
- **Article rich results**: Test a blog post URL

---

## 14. Ongoing SEO Tips

- Write blog posts regularly — each post creates a new indexed page
- Use descriptive event titles that include keywords people search for (e.g. "Christian Teaching Lusaka")
- Keep the teachings library growing — each series page is indexable
- Share every blog post and event on the Facebook page (`facebook.com/Rhemaword27`) to drive traffic back to the site
