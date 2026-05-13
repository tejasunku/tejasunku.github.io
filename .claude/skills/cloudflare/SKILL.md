---
name: cloudflare
description: |
  Cloudflare Workers development skill for building full-stack applications
  on Cloudflare's edge platform. Covers Workers, Static Assets, routing,
  bindings, and deployment workflows.
license: MIT
compatibility: cf-workers
---

# Cloudflare Workers

Skill for building applications on Cloudflare Workers with Static Assets,
SPA routing, and Worker API integration.

## Key Concepts

### Static Assets
- Build output goes to `dist/` directory
- Configure in `wrangler.jsonc` with `assets.directory` and `assets.not_found_handling`
- Assets served from edge before Worker script runs (unless `run_worker_first` configured)

### SPA Routing
- Set `assets.not_found_handling: "single-page-application"` to serve `/index.html` for all unmatched routes
- Navigation requests (browser navigations) don't invoke Worker script by default (reduces billable invocations)
- Use `assets.run_worker_first: ["/api/*", "!/api/docs/*"]` for selective Worker-first routing

### Worker Script
- Worker runs when no matching static asset found (or when `run_worker_first` matches)
- Use `WorkerEntrypoint` class for module-worker syntax with `this.env.ASSETS.fetch()`
- Can authenticate requests before serving assets, transform assets with HTMLRewriter

## Common Patterns

### SPA with API Routes
```json
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application"
  },
  "main": "./worker/index.ts"
}
```

### Run Worker First for Auth
```json
{
  "assets": {
    "directory": "./dist/",
    "binding": "ASSETS",
    "run_worker_first": true
  }
}
```

### Selective Routes (OAuth callbacks, API endpoints)
```json
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/oauth/callback", "/api/*"]
  }
}
```

## Commands

- `npm run dev` - Start Vite dev server with Cloudflare runtime
- `npm run build` - Build SPA to `dist/`
- `npm run deploy` - Deploy Worker + SPA to Cloudflare

## References

- [Single Page Application (SPA)](references/single-page-application.md)
- [Worker Script](references/worker-script.md)
- [Static Assets Routing Overview](references/routing-overview.md)