# PROFORMA INVOICE

**Invoice Number:** TELEIOS-PI-11  
**Date:** April 26, 2026  
**Currency:** ZMW (Zambian Kwacha)  

**Bill To:**  
Rhema Nyambe  
Founder & Leader, Teleiosis Mandate  
Lusaka, Zambia  

---

## Scope of Work — Teleiosis Mandate Web Platform (End-to-End Delivery)

Full design and development of the Teleiosis Mandate website: a premium, modern ministry platform featuring a public-facing site, an advanced audio teaching library, dynamic event and FAQ management, a robust partnership/payment system, and a comprehensive custom Content Management System (CMS).

### A. Project Foundation, Architecture & Security
*Core infrastructure, backend services, and platform security.*
- **System Architecture:** Next.js App Router setup, strict TypeScript configuration, Vercel deployment pipeline, and Cloudflare R2 storage integration.
- **Database Engineering:** Scalable PostgreSQL database schema (Supabase) complete with Row Level Security (RLS) policies, indexes, and complex relational tables (events, teachings, profiles, programs, FAQs).
- **Authentication & Security:** Implementation of Supabase Auth, protected admin routes, secure session middleware, standardized password policies, and a fully re-engineered password recovery workflow.
**Subtotal:** ZMW 21,800.00

### B. Premium Public Website & UI/UX Overhaul
*A visually stunning, dynamic, and fully responsive frontend experience.*
- **Design System Overhaul:** Implementation of a fluid, "glassmorphic" design system (GEMINI Mandate) featuring premium typography, subtle depth hierarchies, modern radiuses, and interactive micro-animations.
- **Core Pages:** Development of the Homepage (dynamic Hero, interactive Quotes band, active event tracking), About page (timeline, team cards), responsive Blog, and dynamic Event pages.
- **Dynamic Workflows:** Implementation of seamless user flows, including auto-scroll-to-top behaviors, dynamic map re-centering, and live Server-Component fetching for public FAQ displays.
**Subtotal:** ZMW 44,800.00

### C. Audio Teaching Library
*A robust media hosting and persistent playback experience.*
- **Upload Architecture:** Cloudflare R2 presigned-URL upload flows ensuring fast, reliable CDN delivery for large media files.
- **Global Playback System:** Engineered a persistent, cross-page audio player (`AudioContext`) to ensure uninterrupted teaching/series playback while users navigate the platform.
- **Library Organization:** Categorized program groups, series folders, debounced instant search, and automated metadata generation tools for efficient media cataloging.
**Subtotal:** ZMW 19,300.00

### D. Full-Scale Admin Content Management System (CMS)
*A secure, centralized dashboard for full platform control.*
- **Dashboard Interface:** A dedicated, mobile-responsive Admin layout featuring real-time statistical summaries and R2 storage usage metrics.
- **Comprehensive CRUD Modules:** Full Creation, Read, Update, and Deletion suites for Events, Teachings, Series, Blog Posts, Team/Co-Labourers, Store Products, and Site Settings.
- **Dynamic FAQ Management:** Built robust `FAQsTable` and `FAQForm` interfaces with sorting, status toggling, and secure Next.js 15 API routes.
- **Data Automation:** Programmatic data inheritance (e.g., auto-assigning series to teachings) to eliminate manual entry errors.
**Subtotal:** ZMW 37,300.00

### E. Payment Infrastructure & Validation
*Secure and seamless financial contribution pipelines.*
- **LencoPay Integration:** Full integration of the Lenco Payment SDK for the Partnership modal, Event-level giving, and Store checkouts.
- **Checkout Polish:** Intelligent validation systems, preset ZMW amounts, recurring donor caching (`localStorage`), and elegant error/loading states.
- **Backend Verification:** Secure server-side webhook handlers and payment verification endpoints to permanently record successful transactions in the database.
**Subtotal:** ZMW 13,900.00

### F. SEO, Automation & Deployment Reliability
*Search engine visibility, automated tasks, and final production polish.*
- **Technical SEO:** Dynamic XML sitemaps, JSON-LD rich snippet schemas, Open Graph metadata for social sharing, and properly structured canonical URLs.
- **Automations:** API endpoints returning rotating quotes and scheduled database cron jobs (e.g., auto-generating recurring events).
- **Production Hardening:** Exhaustive resolution of build-time type errors, safe environment variable initialization, and rigorous cross-device responsiveness testing.
**Subtotal:** ZMW 16,800.00

---

## SUMMARY

| Category | Amount (ZMW) |
| :--- | :--- |
| A. Project Foundation, Architecture & Security | 21,800.00 |
| B. Premium Public Website & UI/UX Overhaul | 44,800.00 |
| C. Audio Teaching Library | 19,300.00 |
| D. Full-Scale Admin CMS & Dynamic Features | 37,300.00 |
| E. Payment Infrastructure & Validation | 13,900.00 |
| F. SEO, Automation & Deployment Reliability | 16,800.00 |
| **TOTAL DUE** | **ZMW 153,900.00** |

---

## Payment Terms & Notes
- **50% Deposit:** ZMW 76,950.00 — due on acceptance
- **50% Balance:** ZMW 76,950.00 — due on project handover / domain go-live
- *Hosting (Vercel), database (Supabase), and storage (Cloudflare R2) are third-party services billed separately to the client.*
- *This is a proforma invoice and does not constitute a demand for immediate payment.*
