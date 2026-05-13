# Zen Router

An opinionated HTTP router compatible with Cloudflare Workers, Node.js, Bun, Deno.

**npm:** `npm install @liveblocks/zenrouter`

## Features

- **Type-safe everywhere** - Route handlers receive `{ p, q, body }`, all fully typed
- **Body validation** - With any [Standard Schema](https://standardschema.dev/) compatible library
- **Authorization** - Mandatory by design, opt-out for public routes
- **Composing routers** - Isolate routers by auth strategy with `ZenRelay`
- **CORS** - Built-in, not bolted on
- **Error handling** - `abort(404)` from any handler, customizable error shapes
- **Response helpers** - `json()`, `html()`, `textStream()`, and more
- **OpenTelemetry** - Automatic span attributes for matched routes
- **Runs anywhere** - Cloudflare Workers, Bun, Node.js, and any runtime with Web `Request`/`Response`

## Quick Example

```typescript
import { ZenRouter } from "@liveblocks/zenrouter";
import { z } from "zod";

const zen = new ZenRouter({
  authorize: async ({ req }) => {
    const token = req.headers.get("Authorization");
    const currentUser = await db.getUserByToken(token);
    if (!currentUser) return false;
    return { currentUser };
  },
});

// Get a specific post
zen.route(
  "GET /api/posts/<postId>",
  async ({ p, auth }) => {
    const post = await db.getPost(auth.currentUser.id, p.postId);
    return { id: post.id, title: post.title };
  }
);

// Create a new post for the current user
zen.route(
  "POST /api/posts",
  z.object({ title: z.string() }),
  async ({ auth, body }) => {
    const post = await db.createPost({
      title: body.title,
      authorId: auth.currentUser.id,
    });
    return { id: post.id, title: post.title };
  }
);

export default zen;
```
