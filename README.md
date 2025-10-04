# Threshold

A personal site that behaves like a **threshold** — non-linear navigation, subtle ephemerality, and room for future experiments.

---

## Goals

* **Markdown-first** content (fast to write).
* **Zero-JS by default**; add tiny islands only when needed.
* **Weird, path-dependent pages** (non-euclidean “rooms”).
* **Cheap to run, easy to move** (no lock-in).

---

## Stack

* **Astro** (static by default)
* **Styling:** **UnoCSS** (`preset-wind`, `preset-icons`, `preset-attributify`)
* **Optional later:** Cloudflare Pages + Pages Functions (per-user ephemerality, small APIs)

---

## Quick Start (pnpm)

```bash
# 0) prerequisites
# Enable pnpm via Corepack (Node 18+)
corepack enable

# 1) scaffold (if not already)
pnpm create astro@latest

# 2) install deps
pnpm i

# 3) add UnoCSS
pnpm add -D unocss @unocss/preset-wind @unocss/preset-icons @unocss/preset-attributify

# 4) dev
pnpm dev

# 5) build
pnpm build
```

---

## Project Structure

```
.
├─ src/
│  ├─ pages/        # /, /rooms/[slug]
│  ├─ layouts/      # Room.astro, Base.astro
│  ├─ components/   # (optional) interactive islands
│  ├─ content/
│  │  └─ rooms/     # markdown "rooms"
│  └─ utils/        # seeded.ts (variant picker), helpers
├─ public/          # static assets
├─ docs/
│  ├─ decisions/    # ADRs (architecture decision records)
│  ├─ runbooks/     # "do X when it breaks"
│  ├─ apis/         # OpenAPI for any endpoints
│  └─ routing.md    # single routing table (source of truth)
├─ .github/         # CI, PR templates
└─ README.md
```

---

## Content Model (Rooms)

**`src/content/config.ts`**

```ts
import { defineCollection, z } from "astro:content";

export const collections = {
  rooms: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      exits: z.array(z.string()).default([]),
      variants: z.array(z.object({
        tone: z.enum(["gentle","neutral","sharp"]).default("neutral"),
        line: z.string(),
      })).default([]),
    }),
  }),
};
```

**Example room**

```md
---
title: The Atrium
exits: ["mirror","stairs"]
variants:
  - { tone: "neutral", line: "You are here—unless you were." }
  - { tone: "sharp",   line: "You expected arrival. You arrived." }
---
Welcome, or something near it.
```

---

## 🎨 Website Color Palette

| Role                     | Hex Code  | Preview                                                                       |
| ------------------------ | --------- | ----------------------------------------------------------------------------- |
| **Primary**              | `#c36f09` | 🟧 Burnt amber / deep orange — strong brand anchor, buttons, highlights       |
| **Secondary**            | `#296600` | 🟩 Earthy green — balances the warmth, good for secondary CTAs or links       |
| **Accent 1**             | `#de5489` | 🩷 Vivid pink-rose — eye-catching accent for highlights, tags, small elements |
| **Accent 2**             | `#562446` | 🟪 Plum / deep wine — rich supporting color for headers or overlays           |
| **Background / Neutral** | `#ecedd4` | 🟨 Soft parchment beige — light, neutral background for readability           |

### Suggested Usage

* **Backgrounds:** `#ecedd4` keeps things clean and readable.
* **Text:** Dark text (`#562446` or black) on parchment background.
* **Primary buttons/links:** `#c36f09` (hover: deepen to `#a25908`).
* **Secondary buttons/links:** `#296600` for emphasis without overwhelming.
* **Highlights/tags/alerts:** `#de5489` sparingly, for quick attention.
* **Headers/Accents:** `#562446` for a grounding, sophisticated feel.

---

## Styling (UnoCSS)

A **complete UnoCSS setup** with your palette fully wired in, semantic naming, and accessible defaults.

**`uno.config.ts` (core theme)**

```ts
import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  theme: {
    colors: {
      primary: '#c36f09',
      secondary: '#296600',
      accent: '#de5489',
      plum: '#562446',
      neutral: '#ecedd4',

      surface: {
        DEFAULT: '#ecedd4',
        alt: '#ffffff',
        dark: '#562446',
      },

      text: {
        DEFAULT: '#562446',
        onPrimary: '#ffffff',
        onSecondary: '#ffffff',
        onAccent: '#ffffff',
        onNeutral: '#562446',
        onSurface: '#562446',
        onSurfaceAlt: '#562446',
        onSurfaceDark: '#ecedd4',
      },
    },
  },
})
```

**Usage examples**

```html
<div class="bg-surface text-text p-6">Default surface</div>
<div class="bg-surface-dark text-text-onSurfaceDark p-6">Dark surface</div>

<button class="bg-primary text-text-onPrimary px-4 py-2 rounded">Primary</button>
<button class="bg-secondary text-text-onSecondary px-4 py-2 rounded">Secondary</button>
<button class="bg-accent text-text-onAccent px-4 py-2 rounded">Accent</button>
```

---

## “Weird” Without JS (CSS-only)

* Use `:target`, `:focus-within`, or hidden radios for non-linear reveals.
* Duplicate near-identical destinations with tiny differences → feels **non-euclidean**.
* Keep a11y intact: focus outlines, escape hatches, contrast.

---

## Ephemerality (Daily Variant Drift)

At build time, pick a variant per page using a seed (date or env).
Example: `src/utils/seeded.ts`

```ts
export default function seeded(s: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
```

---

## Deploy

* **Start:** any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages).
* **Grow:** add edge functions for per-user seeds or small APIs.
* **Escape hatch:** a container/VM later for long jobs.

---

## FAQ

**Why UnoCSS?**
Customizable, atomic utilities, Tailwind-like syntax, and effortless arbitrary values. Perfect for “weird,” path-dependent styling with minimal JS.

**Where’s the JS?**
Astro ships none by default. Add islands with `client:*` only where interaction matters.

**How do I make it feel alive?**
Daily `SEED` + (later) per-user seeds at the edge + tiny content/visual variants per room.

