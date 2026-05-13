# Supported Runtimes

How to run Zen Router on Cloudflare Workers, Bun, and other runtimes.

Both `ZenRouter` and `ZenRelay` expose a `.fetch` method that is a standard `(request: Request) => Promise<Response>` handler. This makes them compatible with any runtime that supports the Web `Request`/`Response` API.

## Cloudflare Workers

Export the router as the default export:

```typescript
// src/worker.ts
import { ZenRouter } from "@liveblocks/zenrouter";

const zen = new ZenRouter({ ... });

zen.route("GET /api/health", () => ({ status: "ok" }));
zen.route("GET /api/posts/<postId>", async ({ p }) => { ... });
zen.route("POST /api/posts", bodySchema, async ({ body }) => { ... });

// Just use a default export in your worker file
export default zen;
```

## Bun

Pass `.fetch` to `Bun.serve()`:

```typescript
// src/index.ts
import { ZenRouter } from "@liveblocks/zenrouter";

const zen = new ZenRouter({ ... });

zen.route("GET /api/health", () => ({ status: "ok" }));
zen.route("GET /api/posts/<postId>", async ({ p }) => { ... });
zen.route("POST /api/posts", bodySchema, async ({ body }) => { ... });

// Pass zen.fetch to Bun.serve()
Bun.serve({ fetch: zen.fetch, port: 8000 });
```

## Node.js

Node.js uses `IncomingMessage`/`ServerResponse` instead of the Web API, so you need an adapter. We recommend `@whatwg-node/server`:

```typescript
// src/index.ts
import { createServer } from "node:http";
import { createServerAdapter } from "@whatwg-node/server";
import { ZenRouter } from "@liveblocks/zenrouter";

const zen = new ZenRouter({ ... });

zen.route("GET /api/health", () => ({ status: "ok" }));
zen.route("GET /api/posts/<postId>", async ({ p }) => { ... });
zen.route("POST /api/posts", bodySchema, async ({ body }) => { ... });

const server = createServer(createServerAdapter(zen.fetch));
server.listen(8000);
```

## Other Runtimes

Any runtime with Web `Request`/`Response` API support will work. The `.fetch` method is the interface:
```typescript
const response = await zen.fetch(request);
```
