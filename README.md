# Teleiosis Mandate — Web Application

A professional, production-grade Next.js web application for the Teleiosis Mandate ministry community.

## Features

- **Responsive Design:** Mobile-first, fully optimized for all devices
- **Fast Performance:** Built with Next.js 14 App Router for speed
- **Professional UI:** Minimal, elegant design with brand-driven typography
- **Multiple Pages:** Home, Events, Teachings, Store, Programs, About, Contact
- **Sticky Navigation:** Always-accessible main menu with mobile support
- **Dark & Light Sections:** Carefully designed section hierarchy
- **Accessible:** Semantic HTML, WCAG-compliant
- **SEO-Ready:** Next.js metadata, OpenGraph support

## Project Structure

```
teleiosis/
├── app/
│   ├── page.tsx              # Home
│   ├── events/page.tsx       # Events listing
│   ├── teachings/page.tsx    # Teachings & bundles
│   ├── store/page.tsx        # Store
│   ├── programs/page.tsx     # Programs detail
│   ├── about/page.tsx        # About ministry
│   ├── contact/page.tsx      # Contact form
│   ├── components/           # Reusable components
│   └── globals.css           # Design tokens
├── public/                   # Static assets
├── CLAUDE.md                 # Comprehensive project brief
└── package.json
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or download the project
cd teleiosis

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will auto-reload as you edit.

### Build for Production

```bash
npm run build
npm start
```

## Pages & Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page with ministry overview |
| `/events` | Events | Upcoming conferences & gatherings |
| `/teachings` | Teachings | Audio teaching library & bundles |
| `/store` | Store | E-commerce for products & memberships |
| `/programs` | Programs | Detailed program descriptions |
| `/about` | About | Ministry mission & leadership |
| `/contact` | Contact | Contact form & business info |

## Design System

### Colors
All brand colors are defined in `/app/globals.css`:
- **Primary:** Royal Purple (#4a2c9c)
- **Accent:** Luxury Gold (#d4af37)
- **Text:** Deep Text (#2a1a5e), Muted (#7b7094)
- **Background:** White, Off-white (#f8f7ff)
- **Dark:** Dark Background (#14082b)

### Typography
- **Headings:** Cinzel (serif) — ancient, distinguished
- **Body:** Montserrat (sans) — modern, readable
- **Quotes:** EB Garamond (serif) — editorial

### Principles
- Sharp corners (no border-radius)
- Generous whitespace
- Minimal gold accents (one per section)
- No gradients or decorative elements
- Typography-driven design

## Development Guidelines

### Adding a New Page

1. Create `/app/newpage/page.tsx`
2. Import Nav and Footer components
3. Use semantic HTML and CSS variables
4. Follow the existing structure

Example:
```tsx
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Page Title | Teleiosis Mandate',
  description: 'Page description',
}

export default function NewPage() {
  return (
    <>
      <Nav />
      {/* Your page content */}
      <Footer />
    </>
  )
}
```

### Using Design Tokens

Instead of hardcoding colors:

```tsx
// ❌ Don't
<div style={{ color: '#4a2c9c' }}>Text</div>

// ✅ Do
<div className="text-heading">Text</div>
```

CSS variables are defined in `/app/globals.css`:
```css
--color-royal-purple: #4a2c9c;
--text-heading: var(--color-deep-text);
```

## Customization

### Changing Colors
Edit `/app/globals.css`:
```css
:root {
  --color-royal-purple: #4a2c9c; /* Change this */
  --color-luxury-gold: #d4af37;   /* And this */
}
```

### Adding New Fonts
Update fonts in `/app/layout.tsx`:
```tsx
<link href="https://fonts.googleapis.com/css2?family=YourFont..." rel="stylesheet" />
```

Then add to `/app/globals.css`:
```css
--font-custom: 'Your Font', serif;
```

### Modifying Spacing
All spacing is in `/app/globals.css`:
```css
--space-4: 16px;
--space-6: 24px;
/* etc. */
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Vercel will automatically build and deploy

### Other Hosting

The app is a standard Next.js application. You can deploy to:
- AWS (Amplify, EC2)
- Google Cloud (Cloud Run)
- Netlify
- Any Node.js hosting

See [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for details.

## Performance Optimization

### Images
Replace placeholder divs with Next.js Image:
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
/>
```

### Code Splitting
Next.js automatically code-splits at the route level. Large components can be lazy-loaded:
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

## Adding Backend Functionality

### Contact Form
Currently logs to console. To send emails:

1. Set up a service (Resend, SendGrid, Nodemailer)
2. Create an API route (`/app/api/contact/route.ts`)
3. Update the contact form to POST to your API

### E-Commerce
To enable store functionality:

1. Integrate Stripe or PayPal
2. Create product database (Sanity, Contentful, Firebase)
3. Set up checkout flow
4. Configure payment webhooks

### Newsletter
To enable newsletter signup:

1. Connect to Mailchimp, ConvertKit, or Resend
2. Create API route for subscriptions
3. Update footer form submission

## SEO Optimization

### Metadata
Update page metadata in `layout.tsx` or each page:
```tsx
export const metadata = {
  title: 'Page Title | Teleiosis Mandate',
  description: 'Short description for search results',
  openGraph: {
    title: 'Page Title',
    description: 'Open Graph description',
    images: ['/og-image.jpg'],
  },
}
```

### Sitemap & Robots
Add `public/sitemap.xml` and `public/robots.txt` for search engines.

## Troubleshooting

### Port 3000 Already In Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Styling Issues
1. Check that CSS variables are defined in `/app/globals.css`
2. Verify imports in your component
3. Clear browser cache (Ctrl+Shift+Delete)

## Support & Documentation

- **Project Brief:** See `/CLAUDE.md` for comprehensive development guide
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com) (for layout utilities)
- **Lucide Icons:** [lucide.dev](https://lucide.dev) (for icon options)

## License

Teleiosis Mandate © 2026. All rights reserved.

---

**For technical questions or feature requests, contact the development team.**
