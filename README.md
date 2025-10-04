# Threshold

A personal site that behaves like a **threshold** — non-linear navigation, subtle ephemerality, and room for future experiments.

## Goals

* **Markdown-first** content (fast to write).
* **Zero-JS by default**; add tiny islands only when needed.
* **Weird, path-dependent pages** (non-euclidean “rooms”).
* **Cheap to run, easy to move** (no lock-in).

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
pnpm create astro@latestc

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
│  ├─ pages/                # /, /rooms/[slug]
│  ├─ layouts/              # Room.astro, Base.astro
│  ├─ components/           # (optional) interactive islands
│  ├─ content/
│  │  └─ rooms/             # markdown "rooms"
│  └─ utils/                # seeded.ts (variant picker), helpers
├─ public/                  # static assets
├─ docs/
│  ├─ decisions/            # ADRs (architecture decision records)
│  ├─ runbooks/             # "do X when it breaks"
│  ├─ apis/                 # OpenAPI for any endpoints
│  └─ routing.md            # single routing table (source of truth)
├─ .github/                 # CI, PR templates
└─ README.md
```

---

## Content Model (Rooms)

`src/content/config.ts`

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
        line: z.string()
      })).default([])
    })
  })
};
```

**Create a room (example)**

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

## Styling (UnoCSS)

**astro.config.mjs**

```js
import UnoCSS from 'unocss/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [UnoCSS()]
});
```

**uno.config.ts**

```ts
import { defineConfig, presetWind, presetIcons, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetIcons(), presetAttributify()],
  shortcuts: {
    // Example: soft vignette “veil” + light blur
    'veil-mask': '[mask-image:radial-gradient(circle_at_60%_40%,black_28%,transparent_30%)] backdrop-blur-sm'
  },
  rules: [
    // e.g. mood-15 => subtle hue shift
    [/^mood-(\d+)$/, ([, d]) => ({ filter: `hue-rotate(${d}deg) saturate(1.05)` })]
  ]
});
```

**Usage examples (in .astro / .mdx / .md via HTML):**

```html
<div class="prose mx-auto p-6 veil-mask mood-15">
  <h1 class="text-3xl font-600 tracking-tight">The Atrium</h1>
  <p class="opacity-85">You are here—unless you were.</p>
</div>
```

* `preset-wind` gives Tailwind-like utilities.
* Use **arbitrary values** freely, e.g. `clip-path-[circle(42%_at_30%_50%)]`.

---

## “Weird” Without JS (CSS-only)

* Use `:target`, `:focus-within`, and (optionally) hidden radios to create non-linear reveals.
* Duplicate near-identical destinations with tiny differences → back/forward feels **non-euclidean**.
* Keep a11y intact: focus outlines, escape hatches, contrast.

---

## Ephemerality (Daily Variant Drift)

At build time, pick a variant per page using a seed (date or env).

`src/utils/seeded.ts`

```ts
export default function seeded(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
```

In layouts, use `process.env.SEED ?? new Date().toISOString().slice(0,10)` to choose a variant.

---

## Optional GitHub Action (nightly rebuild)

```yaml
name: Nightly Ephemeral Build
on:
  schedule: [{ cron: "0 9 * * *" }]  # 09:00 UTC
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - run: SEED=$(date -u +%F) pnpm build
      - run: pnpm dlx wrangler pages deploy dist  # or your host's deploy cmd
```

---

## Edge Functions (Add Later)

* **Per-user ephemerality:** set a seed cookie at the edge; choose among prebuilt variants.
* Keep edge endpoints minimal: auth, rate-limit, streaming proxy for third-party APIs. No heavy compute.

---

## Security Basics (minimums)

* No secrets in the browser. Use edge/server proxies for APIs (LLM, storage).
* Cookies (if used): `Secure`, `HttpOnly`, `SameSite=Lax/Strict`.
* **CSP:** use a nonce-based CSP; avoid inline scripts unless nonced.
* **CORS:** allow only your origins.
* **CSRF:** if using cookie auth, add CSRF protection (framework/IdP middleware).
* Rotate env secrets via CI; never commit them.

---

## Environment Variables (examples)

Create `.env` (and commit a `.env.production.example`):

```
SEED=2025-10-03
# EDGE / API (later)
OPENAI_API_KEY=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

---

## Docs as Code (keep it tiny but alive)

* `docs/decisions/` — ADRs (one file per big choice: Astro, **UnoCSS**, host, edge).
* `docs/routing.md` — single table:

| Host                                      | Path     | Handler           | Notes               |
| ----------------------------------------- | -------- | ----------------- | ------------------- |
| [www.example.com](http://www.example.com) | /        | Astro (static)    | veil                |
| [www.example.com](http://www.example.com) | /rooms/* | Astro (static)    | rooms from markdown |
| [www.example.com](http://www.example.com) | /api/*   | (later) Edge func | streaming proxy     |

* `docs/runbooks/` — brief “what to do when it breaks.”
* `docs/apis/` — OpenAPI for any endpoints you own.

**PR checklist** (`.github/pull_request_template.md`)

* [ ] Updated `docs/routing.md` if paths/hosts changed
* [ ] Added ADR for new services/stack choices
* [ ] Updated OpenAPI if API behavior changed

---

## Deploy

* **Start:** any static host (Cloudflare Pages / Netlify / Vercel / GitHub Pages).
* **Grow:** add an edge function (Cloudflare Pages Functions) for per-user seeds or tiny APIs.
* **Escape hatch:** one small container/VM later for long jobs.

---

## FAQ

**Why UnoCSS?**
Maximum customizability, instant atomic utilities, Tailwind-like syntax via `preset-wind`, and effortless arbitrary values — perfect for “weird,” path-dependent styling with minimal JS.

**Where’s the JS?**
Astro ships none by default. Add islands with `client:*` only where interaction matters.

**How do I make it “feel alive”?**
Daily `SEED` + (later) per-user seed at the edge + tiny content/visual variants per room.
