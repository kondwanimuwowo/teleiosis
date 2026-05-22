import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-serif)"],
      },
      colors: {
        // Teleiosis brand palette (from color-palette.svg)
        teleiosis: {
          purple:  "#4a0e68",   // deep violet — primary brand, headers, navbar
          gold:    "#e4ac05",   // amber gold — CTAs, accents
          magenta: "#941494",   // vibrant magenta — secondary accent, badges
          pink:    "#941474",   // deep pink — hover states, tints
          deep:    "#2c0e68",   // dark navy purple — footer, dark sections
        },
        // Semantic aliases wired to palette
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "var(--radius)",          // default card / container rounding (12px)
        input: "calc(var(--radius) / 2)", // input field rounding (6px)
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-section": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "hero-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "fade-in-up":      "fade-in-up 0.4s ease-out both",
        "fade-in-section": "fade-in-section 0.5s ease-out both",
        "hero-zoom":       "hero-zoom 30s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
