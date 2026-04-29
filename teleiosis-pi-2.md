# PROFORMA INVOICE

---

**Invoice No.:** TEL-PI-002  
**Date:** 26 April 2026  
**Valid Until:** 26 May 2026

---

**Billed To:**  
Rhema Nyambe  
Founder & Leader, Teleiosis Mandate  
Lusaka, Zambia

**Prepared By:**  
Kondwani Muwowo  
Full-Stack Web Developer  
kondwanimuwowo90@gmail.com

---

## Scope of Work — Teleiosis Mandate Web Platform

Full design and development of the Teleiosis Mandate website: a ministry platform with a public-facing site, audio teaching library, event management, payment/partnership system, and a complete content management system (CMS).

---

## A. Project Foundation

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Project architecture | Next.js 14 App Router setup, TypeScript config, Supabase integration, Cloudflare R2 storage, deployment pipeline (Vercel) | 6 | 700 | 4,200 |
| Design system | Tailwind CSS tokens, brand colours (gold/purple), Cinzel/Inter/Montserrat fonts, global CSS, reusable component base | 8 | 700 | 5,600 |
| Authentication | Supabase Auth, admin login/logout, protected routes, session middleware | 4 | 700 | 2,800 |
| Database schema | PostgreSQL tables: events, teachings, series, blog_posts, quotes, co_labourers, categories, site_stats, products, payments, program_groups — with RLS policies and indexes | 6 | 700 | 4,200 |

**Subtotal A: ZMW 16,800**

---

## B. Public Website

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Navigation | Sticky nav, desktop active-link highlighting, mobile slide-in menu, dual CTA pill (Join Us / Partner), social links | 5 | 700 | 3,500 |
| Homepage | Hero with typewriter animation, pillars bar, Who We Are with DB-driven stats, QuoteBand (parallax + auto-rotation), Programs, dynamic next event, News & Updates, CTA | 10 | 700 | 7,000 |
| About page | Tabbed layout (Who We Are / Our Mandate / Co-Labourers), Rhema bio, leadership stats, ministry timeline, Three Pillars, team cards | 6 | 700 | 4,200 |
| Events pages | Events list with search & type filter, individual event detail pages with partner giving section | 6 | 700 | 4,200 |
| Blog pages | Blog listing grid, individual post detail with scripture pull-quote, related posts, share buttons | 5 | 700 | 3,500 |
| Teachings pages | Program group cards (expandable), series folders, standalone teachings, debounced search, series detail player | 10 | 700 | 7,000 |
| Store page | Searchable/filterable/sortable product grid, elegant "Coming Soon" empty state with notify-me capture | 4 | 700 | 2,800 |
| Partnership page | Full-page giving form, impact cards, preset + custom ZMW amounts, Lenco payment integration | 4 | 700 | 2,800 |
| Contact page | Contact form with field validation | 2 | 700 | 1,400 |
| Footer | Multi-column layout, newsletter capture, social links | 2 | 700 | 1,400 |

**Subtotal B: ZMW 37,800**

---

## C. Audio Teaching Library

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| R2 audio upload | Presigned URL upload flow, progress bar, Cloudflare R2 storage, CDN delivery | 5 | 700 | 3,500 |
| Global audio player | Persistent cross-page audio player (AudioContext), play/pause/progress controls | 6 | 700 | 4,200 |
| Series teaching player | Track listing, animated playing indicator, sequential playback | 5 | 700 | 3,500 |
| Audio gallery | Browse and select existing uploaded files from R2 | 3 | 700 | 2,100 |

**Subtotal C: ZMW 13,300**

---

## D. Admin Content Management System

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Admin layout | Sidebar navigation (screen-height, scrollable), mobile menu, responsive layout, sign-out | 4 | 700 | 2,800 |
| Dashboard | Stat cards, R2 storage widget (usage vs 10 GB free tier), quick actions, section links | 4 | 700 | 2,800 |
| Events admin | Create/edit/delete events with image upload, recurrence frequency settings (daily/weekly/fortnightly/monthly/custom), day-of-week | 6 | 700 | 4,200 |
| Teachings admin | Upload with progress, gallery picker, program group + series assignment (with auto-fill), category, pricing, membership flag | 8 | 700 | 5,600 |
| Series admin | Create/edit series with cover art upload, program group assignment | 4 | 700 | 2,800 |
| Blog admin | Create/edit/delete posts with image, scripture, body paragraphs, category | 4 | 700 | 2,800 |
| Quotes admin | Manage devotional quotes with scripture references | 2 | 700 | 1,400 |
| Team admin | Manage co-labourers / team member profiles | 2 | 700 | 1,400 |
| Categories admin | Manage teaching categories | 1 | 700 | 700 |
| Products admin | Store product CRUD with image, price, category, stock status | 3 | 700 | 2,100 |
| Payments dashboard | View all Lenco payments (partnerships, events, store) with summary stats | 2 | 700 | 1,400 |
| Site settings | Inline-editable homepage/about stats (add, edit, reorder, delete) | 3 | 700 | 2,100 |
| Program groups admin | View and manage the 3 teaching program groups | 1 | 700 | 700 |

**Subtotal D: ZMW 30,800**

---

## E. Payment System (Lenco)

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| LencoPayButton | Client component loading sandbox/live Lenco script, reference generation, success/close callbacks | 3 | 700 | 2,100 |
| PartnershipModal | Preset amounts + custom input, name/email fields, validation, success state, localStorage caching | 4 | 700 | 2,800 |
| Payment verify API | Server-side Lenco verification endpoint, Supabase payment record storage | 2 | 700 | 1,400 |
| Lenco webhook | Webhook handler for collection.successful events | 1 | 700 | 700 |
| Event-level giving | Inline partner section on each event detail page | 2 | 700 | 1,400 |

**Subtotal E: ZMW 8,400**

---

## F. SEO & Social Sharing

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Base SEO | Open Graph, Twitter card, canonical URLs, keywords, robots meta in root layout | 2 | 700 | 1,400 |
| Dynamic metadata | Per-page OG metadata for blog posts, events, series (title, description, image) | 3 | 700 | 2,100 |
| JSON-LD schemas | Organization, Event, Article structured data for Google rich results | 3 | 700 | 2,100 |
| Sitemap | Dynamic XML sitemap covering all static routes + all blog/event/series URLs | 2 | 700 | 1,400 |
| Robots.txt | Search engine crawl rules, sitemap pointer | 1 | 700 | 700 |
| Share buttons | Facebook, WhatsApp, X/Twitter, copy-link buttons on blog posts, events, series | 3 | 700 | 2,100 |
| SEO guide | Written guide (guide-two.md) for Google Search Console, Bing, GA4, Facebook verification, Vercel env setup, Lenco production switch | 2 | 700 | 1,400 |

**Subtotal F: ZMW 11,200**

---

## G. Automation & Integrations

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Quote rotation | API endpoint returning random quotes, auto-rotate every 8s with hover-pause | 2 | 700 | 1,400 |
| Manifested Sons auto-events | Utility to compute fortnightly dates from seed, cron API to auto-insert upcoming classes, Vercel cron schedule | 4 | 700 | 2,800 |
| Dynamic homepage event | Next upcoming event fetched live from DB (replaces hardcoded poster) | 2 | 700 | 1,400 |

**Subtotal G: ZMW 5,600**

---

## H. Fixes, Polish & Refinements

| Item | Description | Hrs | Rate (ZMW) | Amount (ZMW) |
|------|-------------|----:|----------:|-------------:|
| Mobile responsiveness | Full mobile QA and fixes across all pages and admin | 4 | 700 | 2,800 |
| Teachings search | Debounce fix, persistent input to prevent focus loss, 2-char threshold | 3 | 700 | 2,100 |
| Layout & animation fixes | FlipText ghost-text to prevent hero layout shift, QuoteBand parallax fix | 2 | 700 | 1,400 |
| Navigation polish | Active link gold highlighting, mobile menu UX, bio corrections | 3 | 700 | 2,100 |
| Content corrections | Program names, descriptions, bio updates, scripture styling | 2 | 700 | 1,400 |
| Data integrity fixes | program_group_id saving for series/teachings, Lenco amount/URL fix, admin validations | 3 | 700 | 2,100 |

**Subtotal H: ZMW 11,900**

---

## Invoice Summary

| Category | Amount (ZMW) |
|----------|-------------:|
| A. Project Foundation | 16,800 |
| B. Public Website | 37,800 |
| C. Audio Teaching Library | 13,300 |
| D. Admin CMS | 30,800 |
| E. Payment System (Lenco) | 8,400 |
| F. SEO & Social Sharing | 11,200 |
| G. Automation & Integrations | 5,600 |
| H. Fixes, Polish & Refinements | 11,900 |
| **TOTAL** | **135,800** |

---

**Total: ZMW 135,800.00**  
*(One Hundred and Thirty-Five Thousand, Eight Hundred Kwacha)*

---

## Payment Terms

- 50% deposit: **ZMW 67,900** — due on acceptance
- 50% balance: **ZMW 67,900** — due on project handover / domain go-live

## Notes

1. This invoice covers all development work completed to date on the Teleiosis Mandate platform.
2. Hosting (Vercel), database (Supabase), and storage (Cloudflare R2) are third-party services billed separately to the client.
3. Lenco payment gateway is currently in **sandbox mode** — switching to production requires no code changes, only credential swap.
4. Domain registration (`teleiosis.org`) is not included.
5. Future enhancements (Stripe, email service, CMS migration, mobile app) are outside this scope and will be quoted separately.

---

*This is a proforma invoice and does not constitute a demand for immediate payment.*  
*All amounts are in Zambian Kwacha (ZMW).*
