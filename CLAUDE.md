# Teleiosis Mandate — Project Brief

## Overview

**Teleiosis** (τελείωσις — Greek: "perfection," "completion," "maturity") is a Next.js web application for a Christian ministry community devoted to the practical revelation of the risen Christ and the training of believers into Christian perfection and Kingdom authority.

**Client:** Rhema Nyambe, Leader of the Teleiosis Mandate (Lusaka, Zambia)
**Project Type:** Full-stack Next.js Web Application
**Status:** In Active Development
**Launch Target:** Q2 2026

---

## Design System & Branding

### Color Palette
All colors use **0–1 CSS variable range** or **hex codes** (as documented in `/app/globals.css`).

| Purpose | Hex | CSS Variable | Usage |
|---------|-----|-------------|-------|
| Primary Background | #ffffff | `--color-white` | Main page background |
| Accent Background | #f8f7ff | `--color-off-white` | Alternating sections |
| Brand Purple | #4a2c9c | `--color-royal-purple` | Headings, key elements |
| Brand Gold | #d4af37 | `--color-luxury-gold` | CTAs, accents (use sparingly) |
| Dark Background | #14082b | `--color-dark-bg` | Footer, dark sections |
| Text (Primary) | #2a1a5e | `--color-deep-text` | Headings on white |
| Text (Secondary) | #7b7094 | `--color-muted-text` | Body copy, captions |

### Typography
- **Serif (Headings):** Cinzel (400, 600, 700 weights) — ancient Roman/Greek aesthetic
- **Serif (Quotes):** EB Garamond — editorial refinement
- **Sans (Body):** Montserrat (400–700) — clarity and professionalism
- **System Sans (Fallback):** -apple-system, BlinkMacSystemFont, Segoe UI

### Type Scale (Increased for Readability)
- **Hero:** 160px (Cinzel, font-bold)
- **H1:** 160px
- **H2:** 64px
- **H3:** 40px
- **H4:** 32px
- **Body:** 18px
- **Small:** 14px
- **Micro:** 12px

### Design Principles (Minimal-Webapp)
1. **Sharp mode:** Zero border-radius on all elements (cards, buttons, inputs)
2. **White-dominant:** Backgrounds are white or off-white; no colored fills
3. **Extreme whitespace:** Section heights minimum 880px; generous padding (py-24, py-32)
4. **Typography-driven:** Cinzel wordmark carries the design; minimal decoration
5. **Gold discipline:** One gold accent per section maximum (CTA button or border)
6. **No gradients:** Only solid fills unless explicitly requested
7. **Minimal icons:** Lucide React icons used only for clarity (nav menu, close buttons)

---

## Project Structure

```
teleiosis/
├── app/
│   ├── layout.tsx              # Root layout with metadata & fonts
│   ├── globals.css              # Design tokens & utility classes
│   ├── page.tsx                 # Homepage
│   ├── events/page.tsx          # Events listing page
│   ├── teachings/page.tsx       # Teachings & bundles page
│   ├── store/page.tsx           # Store/products page
│   ├── programs/page.tsx        # Programs detail page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   └── components/
│       ├── Nav.tsx              # Navigation bar (sticky, mobile-responsive)
│       └── Footer.tsx           # Footer (dark bg, multi-column layout)
├── public/                      # Static assets (images, logos)
├── package.json
├── next.config.js
├── tsconfig.json
├── .gitignore
├── CLAUDE.md                    # This file
└── README.md                    # User-facing project guide
```

---

## Pages & Routes

### 1. Home Page (`/`)
**Purpose:** Hero landing page with ministry overview, programs, upcoming events, membership CTA.

**Sections:**
- Nav (sticky, white, gold underline on "Join Us" CTA)
- Hero section: Wordmark + tagline + mission statement + CTAs
- Tagline bar: "Spirit · Soul · Body" / "Sonship · Kingdom · Glory" / "Perfection · Purpose · Power"
- "Who We Are" section: Ministry overview + stats cards (240+, 6+, 12+, 1)
- Programs grid: 3 programs (Manifested Sons, Unto Perfection, Glorious Mandate)
- Upcoming events section (dark bg)
- Footer

### 2. Events Page (`/events`)
**Purpose:** Complete events listing with date, venue, type, registration CTA.

**Content:**
- Page header with intro copy
- Event list rows: date | title | type (pill) | venue | "Get Tickets" button
- CTA section: newsletter signup
- 5–6 upcoming events

### 3. Teachings & Bundles Page (`/teachings`)
**Purpose:** Store for teaching audio, bundles, memberships.

**Content:**
- Header + filter tabs (All / Conferences / Teaching Series)
- 2-column grid of teaching cards
- Each card: image placeholder | title | description | price | "Get Access" button
- "Included in Membership" badge on featured items
- Membership CTA section: "Join the Community" with 14-day free trial offer

### 4. Store Page (`/store`)
**Purpose:** E-commerce store for products, memberships, resources.

**Content:**
- Header + product grid (3 columns)
- 6 products with categories (Teaching Series, Bundle, Workshop, Conference, Membership, Resource)
- Featured "Bestseller" badge on popular items
- Membership benefits section with pricing tiers (Monthly / Quarterly / Annual)

### 5. Programs Page (`/programs`)
**Purpose:** Detailed program descriptions with schedules.

**Content:**
- 3-column grid of program cards with border-top accent
- Program 1: Manifested Sons of God Class (Saturday, Emperor's Crown)
- Program 2: Unto Perfection Conference (November)
- Program 3: The Glorious Mandate (Ongoing outreach)
- FAQ section: 4 common questions with answers

### 6. About Page (`/about`)
**Purpose:** Ministry mission, leadership, beliefs, vision.

**Content:**
- Page hero: "About Teleiosis" + intro
- 2-column layout: Mission + Leadership card (Rhema bio + avatar placeholder)
- Core beliefs section: 4 belief cards
- Programs summary with links
- CTA: "Join the Movement"

### 7. Contact Page (`/contact`)
**Purpose:** Contact form + business information.

**Content:**
- 2-column layout: Contact form | contact info
- Form fields: Name, Email, Phone, Subject dropdown, Message
- Contact details: Phone, Email, Physical location, Social links

---

## Components

### Nav.tsx
- **Props:** None (uses hardcoded routes)
- **Features:**
  - Sticky positioning with white background
  - Desktop menu (hidden on mobile)
  - Mobile hamburger menu with slide-down navigation
  - "Join Us" CTA button (gold bg)
  - Responsive layout

### Footer.tsx
- **Props:** None
- **Features:**
  - Dark purple background
  - 4-column layout: Brand | Navigate | Community | Follow & Newsletter
  - Links to all major pages
  - Newsletter subscription form
  - Social icons (Facebook, Instagram, YouTube)
  - Copyright notice

---

## Design Token System

All design values are defined in `/app/globals.css` using CSS custom properties:

```css
:root {
  /* Color tokens */
  --color-royal-purple: #4a2c9c;
  --color-luxury-gold: #d4af37;
  
  /* Semantic aliases */
  --bg-primary: var(--color-white);
  --accent-primary: var(--color-luxury-gold);
  
  /* Typography */
  --font-serif: 'Cinzel', serif;
  --font-sans: -apple-system, ...;
  --text-hero: 160px;
  
  /* Spacing */
  --space-4: 16px;
  --space-24: 96px;
}
```

**Usage:** Apply tokens via CSS classes (e.g., `text-heading`, `bg-primary`) or inline styles (`color: var(--accent-primary)`).

---

## Development Workflow

### Getting Started
```bash
npm install
npm run dev
```

Runs dev server on `http://localhost:3000`.

### Build for Production
```bash
npm run build
npm start
```

### Linting & QA
```bash
npm run lint
```

---

## Key Conventions

### File Naming
- **Pages:** `page.tsx` (Next.js App Router convention)
- **Components:** `ComponentName.tsx` (PascalCase)
- **Utilities:** camelCase (e.g., `formatDate.ts`)

### Component Structure
- All components use `'use client'` directive at top for interactivity
- Props interface defined above component export
- Tailwind + CSS variable hybrid: prefer CSS variables for brand values, Tailwind for layout

### Routing
- All routes defined via `/app/[route]/page.tsx` structure
- Link navigation via Next.js `<Link>` component

### Color Usage
- **Never hardcode hex colors** — use CSS variables (e.g., `text-heading`, `bg-accent-light`)
- Accent color (gold) appears **once per section maximum**
- Always check globals.css for the right token before adding new colors

### Typography
- Headings: Always `font-serif` + `font-bold` or `font-semibold`
- Body: Always `font-sans` + appropriate size (`text-base`, `text-sm`)
- Never center body copy on white backgrounds (left-align only)

---

## Content Structure

### Dummy/Placeholder Content
- Event titles, dates, venues pulled from Rhema's Facebook posts + Ian Clayton's site structure
- Stats (240+, 6+, 12+, 1) are placeholders — will be replaced with real metrics
- All teaching titles are representative but **not approved by Rhema** — will be finalized during QA
- "Emperor's Crown Olympia, Chainama Road, Lusaka" is the confirmed venue from posts

### Ready for Client Copy
The following are **confirmed** and require no changes:
- Ministry name: "Teleiosis Mandate"
- Tagline: "That Which Is Perfect Is Come"
- Greek letters: "ΤΕΛΕΙΩΣΙΣ"
- Rhema Nyambe as Leader
- Saturday schedule at Emperor's Crown Olympia, Chainama Rd
- Phone: +260 97 6 779 008 (if accurate — **verify with Rhema**)

### To Be Finalized
- Exact event dates and details
- Teaching titles and descriptions
- Product pricing
- Membership tiers and pricing
- Rhema's bio/photo
- Official contact email
- Social media URLs

---

## Performance & Optimization

### Current Setup
- **Framework:** Next.js 14 (App Router)
- **Styling:** CSS custom properties + Tailwind (zero build dependencies)
- **Images:** Next.js Image component (lazy loading, optimization)
- **Fonts:** Google Fonts (Cinzel, EB Garamond, Montserrat) loaded in layout

### Future Optimizations
- Image optimization (replace placeholders with real photos)
- Caching headers for static pages
- API integration (if adding backend for events, store, newsletter)
- SEO enhancements (meta tags, open graph)

---

## Client Handoff Checklist

- [ ] Client reviews and approves all copy (events, programs, about)
- [ ] Client provides Rhema's bio and photo
- [ ] Client confirms contact email and phone number
- [ ] Client provides real event dates and details
- [ ] Client defines teaching titles, prices, descriptions
- [ ] Client approves membership pricing tiers
- [ ] Client provides logos (optional, currently text-only "TELEIOSIS")
- [ ] Client provides social media URLs and links
- [ ] Client tests contact form (set up email backend)
- [ ] Client tests store/membership flow (Stripe/payment integration)
- [ ] Client approves color palette (review in Figma or browser)
- [ ] Deployment and hosting configured (Vercel recommended)

---

## Database & Backend

### Supabase (PostgreSQL Database)
- **Purpose:** Store teaching metadata (title, description, duration, audio URL, pricing, etc.)
- **Tables:**
  - `teaching_categories` — Category taxonomy (Sonship, Authority, Perfection, etc.)
  - `teachings` — Teaching records with Cloudflare R2 audio URLs
  - `audio_files` — Optional, for detailed audio file tracking
- **Access:** `useTeachings()`, `useTeachingCategories()`, `useTeachingById()` hooks in `/lib/hooks.ts`
- **RLS:** Row-level security policies control admin vs. public access
- **Cost:** Free tier supports your scale; $25/month if you exceed limits

### Cloudflare R2 (Object Storage & CDN)
- **Purpose:** Host and stream audio files globally
- **Setup:** R2 bucket `teleiosis-audio` with public CDN URL
- **Audio URL Format:** `https://cdn.teleiosis.org/teachings/{filename}.mp3`
- **Cost:** Free tier: 10GB/month; $0.015/GB beyond

### Environment Variables Required
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxx...
NEXT_PUBLIC_CLOUDFLARE_CDN_URL=https://cdn.teleiosis.org
CLOUDFLARE_R2_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_SECRET_KEY=xxxxx
```

See `SETUP_GUIDE.md` for complete setup instructions.

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.0.0",
  "lucide-react": "^0.263.1",
  "@supabase/supabase-js": "^2.38.0",
  "zustand": "^4.4.1"
}
```

**Minimal stack:** Next.js + Tailwind CSS + Supabase + Cloudflare. Fast, scalable, cost-effective.

## Styling

### Tailwind CSS
- **Config:** `tailwind.config.ts` extends with design tokens
- **Colors:** All brand colors mapped to Tailwind utilities
- **Fonts:** Cinzel, Montserrat available via `font-serif`, `font-sans`
- **Spacing:** All custom spacing vars available
- **Utilities:** Full Tailwind utility set + custom brand utilities

### CSS Variables
- **Design Tokens:** All defined in `/app/globals.css` `:root {}`
- **Usage:** `color: var(--accent-primary)` or Tailwind classes
- **Hybrid Approach:** Prefer Tailwind for layout, CSS vars for brand colors

### Examples
```tsx
// Tailwind classes (layout, typography scale)
<h1 className="text-hero font-serif font-bold text-heading mb-8">Heading</h1>

// CSS variables (brand colors)
<button className="bg-accent-primary text-deep-text hover:bg-accent-hover">
  Button
</button>

// Mixed (recommended)
<div className="container py-24 mx-auto px-6">
  <h2 className="text-5xl font-serif font-bold text-heading mb-8">
    Section Title
  </h2>
  <p className="text-base text-text-body leading-relaxed max-w-2xl">
    Body copy stays legible with proper spacing.
  </p>
</div>
```

---

## Deployment

**Recommended:** Vercel (native Next.js, instant deployment, environment variables)

1. Push to GitHub
2. Connect repo to Vercel
3. Configure environment variables (if any)
4. Deploy on push

---

## Support & Future Work

### Known Limitations
- Placeholder images (no real photos of events or Rhema yet)
- Dummy product data (real teachings/bundles TBD)
- No payment backend (Stripe integration needed for store)
- No email backend (contact form logs to console only)
- No CMS (all content hardcoded — migrate to CMS if content changes frequently)

### Suggested Enhancements
1. **CMS Integration** (Sanity, Contentful) — manage events, teachings, blog posts without code
2. **Payment Processing** (Stripe) — real store and membership checkout
3. **Email Service** (SendGrid, Resend) — contact form, newsletters
4. **Analytics** (Google Analytics, Posthog) — track user behavior
5. **Search** (Algolia) — search teachings library
6. **Blog/News** — content section for articles and updates
7. **Community** (Discord bot integration) — streamline membership onboarding

---

## Code Style & Standards

### Formatting
- **Prettier:** Not configured (use defaults)
- **ESLint:** Enabled (next lint)
- **Tabs:** 2 spaces

### Git Commits
```
Type: Short description

Longer explanation if needed.

Co-Authored-By: Claude <claude@anthropic.com>
```

Types: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`

### Code Quality
- No console.log (except during development)
- All components typed (TypeScript)
- Props interfaces defined before component
- No prop drilling (use context if needed)

---

## Questions & Escalations

**For questions about:**
- **Design:** Review `/app/globals.css` and current pages
- **Copy/Content:** Contact Rhema (client)
- **Technical Issues:** Check git history and error logs
- **Next Steps:** See "Client Handoff Checklist" above

---

**Last Updated:** April 5, 2026
**Project Lead:** Claude Code
**Client Contact:** Rhema Nyambe, Teleiosis Mandate
