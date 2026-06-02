# Composing Routers

Composing multiple routers with different auth requirements using Zen Relay.

## The Problem

A typical backend serves endpoints to different audiences, each with its own requirements:
- Main API might need token auth
- Admin routes require stricter access
- Webhook receivers verify request signatures
- Some routes need no auth at all

Different audiences may also need different error responses.

## ZenRelay

`ZenRelay` is a thin dispatch layer that selects which router handles a request based on URL prefix.

```typescript
import { ZenRelay } from "@liveblocks/zenrouter";

import { zen as authRoutes } from "./routes/auth";
import { zen as apiRoutes } from "./routes/api";
import { zen as adminRoutes } from "./routes/admin";
import { zen as webhookRoutes } from "./routes/webhooks";

const app = new ZenRelay();
app.relay("/auth/*", authRoutes);
app.relay("/api/admin/*", adminRoutes);
app.relay("/api/*", apiRoutes);
app.relay("/webhooks/*", webhookRoutes);

export default app;
```

Routes inside each router are still fully qualified. The relay prefix is only used for dispatch - it does not strip or rewrite the URL.

```typescript
// src/routes/api.ts
const zen = new ZenRouter({ authorize });

zen.route("GET /api/posts", handler);
zen.route("GET /api/posts/<postId>", handler);
// Always the full path, never relative to the relay prefix

export { zen };
```

## Key Principles

### No Base Prefixes

There is no way to set a "base" prefix on a `ZenRouter` or `ZenRelay` that gets prepended to your route definitions. Every route pattern is always the complete, greppable URL path.

If you want to find the handler for `/api/posts`, you grep for `/api/posts`. No indirection, no prefix math.

### No Fall-Through

There is no implicit fall-through between routers. For example, if a request is made to `/api/admin/users/123`, only the `/api/admin/*` router will ever see it. Each router has its own auth and error handling behavior, so routers are fully isolated.

### Keep It Flat

The encouraged pattern is a single `ZenRelay` layer at the top level, dispatching to one set of `ZenRouter` instances. Don't nest relays or routers.

If you only need a single auth strategy, a single `ZenRouter` is enough. No `ZenRelay` needed.
