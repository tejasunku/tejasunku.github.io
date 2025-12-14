# Threshold

A personal site that behaves like a **threshold** — non-linear navigation, subtle ephemerality, and room for future experiments.

---

## Goals

* **SvelteKit** for modern development with great DX
* **Cloudflare Pages/Workers** for global edge deployment
* **Weird, path-dependent pages** (non-euclidean "rooms")
* **Daily ephemerality** through seeded variants
* **Easy to extend** with edge functions and APIs

---

## Stack

* **SvelteKit** (with TypeScript)
* **Cloudflare Pages** + **Workers** (edge functions)
* **Styling:** Custom CSS with your established color palette
* **Routing:** Dynamic room-based navigation
* **Features:** Daily variants, seeded randomness, edge APIs

---

## Quick Start (npm)

```bash
# 1) install deps
npm install

# 2) dev
npm run dev

# 3) build
npm run build

# 4) preview
npm run preview
```

---

## Project Structure

```
.
├─ src/
│  ├─ routes/           # /, /rooms/[slug]
│  ├─ lib/              # Utilities, types, room data
│  │  ├─ rooms.ts       # Room definitions and logic
│  │  └─ seeded.ts      # Daily variant generation
├─ public/              # Static assets
├─ wrangler.toml        # Cloudflare configuration
└─ .github/workflows/   # CI/CD for deployment
```

---

## Content Model (Rooms)

**`src/lib/rooms.ts`**

```ts
export interface Room {
  title: string
  slug: string
  exits: string[]
  variants: RoomVariant[]
  content: string
}

export interface RoomVariant {
  tone: 'gentle' | 'neutral' | 'sharp'
  line: string
}
```

Each room has:
- **Title and slug** for routing
- **Exits** defining connections to other rooms
- **Variants** that change daily based on seeded randomness
- **Content** describing the space

---

## 🎨 Website Color Palette

| Role                     | Hex Code  | Usage |
| ------------------------ | --------- | ----- |
| **Primary**              | `#c36f09` | Links, buttons, highlights |
| **Secondary**            | `#296600` | Secondary actions, exits |
| **Accent 1**             | `#de5489` | Special highlights |
| **Accent 2**             | `#562446` | Headers, text |
| **Background / Neutral** | `#ecedd4` | Main background |

---

## Ephemerality (Daily Variants)

At build time and runtime, each room displays a different variant based on the current date:

```ts
import getDailyVariant from '$lib/seeded.js';

const variant = getDailyVariant(roomSlug, room.variants);
// Shows different text/tone each day
```

---

## Edge Functions

**`/api/seed`** - Returns daily ephemeral data for rooms:

```js
GET /api/seed?room=atrium&date=2024-01-15
{
  "seed": 12345,
  "variantIndex": 1,
  "tone": "neutral",
  "mood": "contemplative",
  "lighting": "dim"
}
```

---

## Deploy

### Local Development
```bash
npm run dev
```

### Build & Preview
```bash
npm run build
npm run preview
```

### Cloudflare Pages
1. Connect your repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `build`
4. Deploy automatically on push to main

### Required Environment Variables
- `CLOUDFLARE_API_TOKEN` - For GitHub Actions deployment
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

---

## Features

- **🌀 Non-linear navigation** between interconnected rooms
- **📅 Daily variants** that make the site feel alive
- **⚡ Edge functions** for dynamic, personalized experiences
- **🎨 Consistent design** with your established color palette
- **📱 Responsive design** that works everywhere
- **🔧 Easy to extend** with new rooms and features
