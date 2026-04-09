# Teleiosis Mandate — UI/UX Overhaul Guidelines

This file serves as the system instruction set for Gemini (and other AI agents) specifically focused on modernizing the aesthetics, styling, typography, and layout of the Teleiosis web application. 

The previous design system (documented in `CLAUDE.md`) relied on absolute minimalist, "sharp-mode", stark-white aesthetics with extreme whitespace. The user explicitly **does not like the current aesthetics** and wants to recreate the site with **better styles, better fonts, and better sizing/positioning**.

When modifying the UI, you MUST follow these updated principles to ensure a visually stunning, premium, and highly engaging user experience.

---

## 1. Prime Directive: Premium Aesthetics 
If the web app looks simple, rigid, or basic, it is considered a failure. You are required to design interfaces that elicit a "WOW" factor.
- **Depth & Dimension:** Abandon flat UI. Use subtle drop shadows (use `shadow-sm` or at max `shadow-md`), overlays, and visual layering to establish hierarchy.
- **Modern Softness:** Remove `rounded-none`. Embrace modern radiuses (`rounded-xl`, `rounded-2xl`, etc.) on cards, buttons, dialogs, and inputs to make the interface feel organic and premium.
- **Glassmorphism:** Use translucent backgrounds with backdrop blur (`backdrop-blur-md`, `bg-white/70`, `bg-black/50`) for sticky headers, floating action bars, and overlapping elements.
- **Avoid Heavy Gradients:** Only use gradients where absolutely necessary, but try to avoid them in general. Keep them very subtle if used at all.
- **Icons:** Use proper SVG icon libraries (like Lucide). Avoid using emojis for icons entirely.

## 2. Dynamic Interactions & Micro-Animations
The site must feel "alive" and responsive to user input.
- **Hover Effects:** Every interactive element must have a hover state. Use transform and opacity transitions. (e.g., `transition-all duration-300 hover:-translate-y-1 hover:shadow-md`).
- **Smooth Transitions:** Ensure changes in state (hover, focus, active) transition smoothly rather than snapping instantly.
- **Image Interactions:** Product and event cards should feature subtle image zooms on hover (`group-hover:scale-105 transition-transform duration-500`).

## 3. Typography Overhaul
The old typographic scale (e.g., 160px for everything) was too rigid and disproportionate. We are replacing it with a fluid, modern type system.
- **Fonts:** Replace basic system fonts. Use high-end typography like **Inter**, **Outfit**, **Plus Jakarta Sans**, or **DM Sans** for all UI/body text. If keeping a Serif for branding, use modern elevated serifs like **Playfair Display**, and pair them properly.
- **Sizing & Scaling:** Use standard Tailwind fluid typography sizing (`text-4xl md:text-6xl font-extrabold tracking-tight`). Eliminate jarring, oversized text that breaks layout composition.
- **Readability:** Use proper line heights (`leading-relaxed`, `leading-tight` on headers) and text colors (avoid pure black; use off-blacks like `text-slate-900` or `text-gray-800` for better contrast).

## 4. Spacing, Sizing, and Layout Positioning
The layout must be tightened, organized, and structurally sound.
- **Cure the "Extreme Whitespace":** Bring elements closer where they relate logically. Use proportionate padding (e.g., `py-16 md:py-24` instead of a minimum of `880px` height).
- **Modern Grids:** Use CSS Grid with appropriate gaps (`gap-6`, `gap-8`) for program cards, event listings, and store items. Consider masonry layouts where images have varying heights.
- **Sticky & Floating Elements:** Enhance positioning by making filters, sidebars, or navigation bars sticky (`sticky top-20`) so users don't lose context when scrolling.
- **Containers:** Constrain content to readable widths (`max-w-7xl mx-auto px-4 sm:px-6`). Never let body copy stretch across the entire screen.

## 5. Color Palette Evolution
Move beyond the strict white background limitations.
- **Immersive Sections:** Allow for dark mode sections or softly colored sections (using washed-out versions of the brand purple) to break the monotony of continuous white scrolling.
- **Brand Colors:** Use the brand Purple (`#4a2c9c`) and Gold (`#d4af37`), but integrate them into shadows, soft glows, and interactive states rather than just flat borders and text.

---

## 6. Execution Workflow for AI Agents
When the user asks you to update a page or component:
1. **Analyze the Current Code:** Identify old constraints (e.g., `rounded-none`, flat backgrounds, excessive padding, oversized fonts).
2. **Refactor & Modernize:** Inject the new design system classes. Think about how the component should look in modern 2026 application design.
3. **Add Interactivity:** Ensure the element reacts beautifully to the user cursor.
4. **Self-Correct:** Before returning the result, ask yourself: *"Does this look like a premium, state-of-the-art web app?"* If not, elevate the styling further.
