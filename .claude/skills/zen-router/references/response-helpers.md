# Response Helpers

Built-in helpers for JSON, HTML, streaming, and more.

Handlers can return a plain object and Zen Router will serialize it as JSON with status `200` automatically. For other response types, use these helpers.

## json

`json(value, status?, headers?)` - Returns a JSON response with the correct content type.

```typescript
import { json } from "@liveblocks/zenrouter";

zen.route(
  "POST /api/posts",
  schema,
  async ({ auth, body }) => {
    const post = await db.createPost(body);
    return json({ id: post.id }, 201);
  }
);
```

## html

`html(content, status?, headers?)` - Returns an HTML response.

```typescript
import { html } from "@liveblocks/zenrouter";

zen.route("GET /health", () => {
  return html("<h1>OK</h1>");
});
```

## abort

`abort(status, headers?)` - Throws an error response. Never returns.

```typescript
import { abort } from "@liveblocks/zenrouter";

abort(404); // never returns
```

## textStream

`textStream(iterable, headers?, options?)` - Returns a streaming text response from a string generator. Chunks are buffered to reduce per-chunk overhead (default buffer size: 64 KB).

```typescript
import { textStream } from "@liveblocks/zenrouter";

zen.route("GET /api/stream", () => {
  function* generate() {
    yield "Hello ";
    yield "world!";
  }
  return textStream(generate());
});
```

## ndjsonStream

`ndjsonStream(iterable, headers?)` - Returns a streaming [NDJSON](https://github.com/ndjson/ndjson-spec) (Newline Delimited JSON) response. Each value is serialized as a single line.

```typescript
import { ndjsonStream } from "@liveblocks/zenrouter";

zen.route("GET /api/events", () => {
  function* events() {
    yield { type: "start" };
    yield { type: "data", value: 42 };
    yield { type: "end" };
  }
  return ndjsonStream(events());
});
```
