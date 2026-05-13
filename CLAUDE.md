# Website Architecture

## Stack
- **React** - UI framework (client-side SPA)
- **Vite** - Build tool with Cloudflare Vite plugin
- **Cloudflare Workers** - Backend API
- **TypeScript** - Throughout
- **UnoCSS** - Atomic CSS engine (configured in `uno.config.ts`)
- **IndieWeb** - Standards for personal websites (h-entry, Webmention, IndieAuth, Micropub)

## Project Structure

```
src/
  App.tsx             → Main React app
  main.tsx            → Entry point
  routes/             → React Router pages
  components/         → Reusable components
worker/
  index.ts            → Worker API (fetch handler)
uno.config.ts         → UnoCSS configuration
vite.config.ts        → Vite + Cloudflare + UnoCSS config
wrangler.toml         → Worker configuration
```

## How It Works

1. Vite dev server runs React + Worker in Cloudflare runtime
2. React app calls Worker API endpoints (e.g., `/api/auth/login`)
3. On deploy: Vite builds SPA to `dist/`, Wrangler deploys Worker
4. Cloudflare serves static assets from `dist/`
5. `assets.not_found_handling = "single-page-application"` handles client-side routing

## SPA Routing

Cloudflare handles 404s for SPA routes. Set in `wrangler.toml`:

```toml
[assets]
directory = "./dist/"
not_found_handling = "single-page-application"
```

## Development

```bash
npm run dev          # Start Vite dev server with Cloudflare runtime
npm run build        # Build SPA to dist/
npm run deploy       # Deploy Worker + SPA to Cloudflare
```

## Authentication

Use idpflare-client in the Worker API for OAuth/OIDC flows.

## Important

- Worker and React SPA are separate - React calls Worker via fetch()
- No database needed - content is in the repo
- Use standard Web APIs only (no nodejs_compat needed)
- Wrangler handles TypeScript compilation for the Worker
- Vite handles JSX/TypeScript for the React SPA

## UnoCSS

 UnoCSS is configured via `uno.config.ts` with presetUno and presetWebFonts.
 Shortcuts are defined for common patterns (btn, btn-primary, btn-ghost).
 Import in entry point: `import "virtual:uno.css"` or use Vite plugin auto-import.

## IndieWeb Standards

Personal website content should follow IndieWeb standards:

- **h-entry** - Mark up blog posts, notes, articles with h-entry microformat
- **h-card** - Author/profile markup on pages
- **Webmention** - Enable receiving Webmentions for comments/likes
- **IndieAuth** - Allow login via your own URL (rel-me auth)
- **Micropub** - Support post creation via Micropub API

See `.claude/skills/indieweb/` for detailed implementation reference.

## Documentation Order

When researching documentation, follow this order:

1. **Skill files** (`.claude/skills/`) - Check for relevant SKILL.md and references first
2. **llms.txt** - Many Cloudflare docs pages have an `llms.txt` version at the same URL path (e.g., `https://developers.cloudflare.com/workers/llms.txt`)
3. **Context7** - Use the `context7_resolve-library-id` and `context7_query-docs` tools for library documentation
4. **Raw webpage scrape** - Only if the above options are unavailable or insufficient

Example for Cloudflare docs: `https://developers.cloudflare.com/workers/llms.txt` contains the full Workers documentation index.