---
name: zen-router
description: |
  Opinionated HTTP router for Cloudflare Workers, Node.js, Bun, and Deno. Use when:
  - Building HTTP APIs or REST endpoints
  - Handling typed path parameters and route validation
  - Implementing authorization and authentication middleware
  - Composing multiple routers with ZenRelay
  - Setting up CORS for browser APIs
  - Streaming responses (text, JSON lines, HTML)
  - Error handling with abort() and custom handlers
---

# Zen Router

An opinionated HTTP router for Cloudflare Workers, Node.js, Bun, and Deno.

## Installation
```bash
npm install @liveblocks/zenrouter
```

## Key Patterns
- Routes: `zen.route("METHOD /path/<param>", handler)`
- Authorization: Mandatory `authorize` function, opt-out with `authorize: () => true`
- Body validation: Pass schema as 2nd argument (Standard Schema compatible)
- Handler args: `{ req, url, ctx, auth, p, q, body }`
- Return: JSON objects auto-serialized, use helpers for other types

See [references/overview.md](references/overview.md) for full documentation.