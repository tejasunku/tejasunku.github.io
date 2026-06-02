# Defining Routes

Route patterns, path params, body validation, and query strings.

## Route Patterns

Routes are defined with a single string containing the HTTP method and the full path:

```typescript
zen.route("GET /hello/<name>", ({ p }) => `Hello, ${p.name}!`);
```

## Path Params

Route params are enclosed in angle brackets. They are automatically URI-decoded and cannot be empty or optional.

```typescript
zen.route(
  "GET /api/rooms/<roomId>/users/<userId>",
  async ({ p }) => {
    // p.roomId and p.userId are both typed strings
  }
);
```

All route paths are fully qualified and greppable. There are no base prefixes.

If a request is made to a URL that doesn't match any route, Zen Router returns `404 Not Found`. If a request is made to a path that exists but with a method that isn't defined, Zen Router will automatically return `405 Method Not Allowed`.

### Route Param Schema

By default, all path params will get exposed as strings in `p`. You can limit their allowed inputs or convert them to other types using Standard Schema compatible libraries:

```typescript
import { z } from "zod";

const zen = new ZenRouter({
  authorize,
  params: {
    index: z.coerce.number(),
    color: z.enum(["red", "green", "blue"]),
  },
});

zen.route(
  "GET /api/posts/<postId>/authors/<index>",
  //               ^^^^^^           ^^^^^
  //               string           number
  ({ p }) => ...
);

zen.route(
  "POST /api/posts/<postId>/tag/<color>",
  //                ^^^^^^       ^^^^^
  //                string       'red' | 'green' | 'blue'
  ({ p }) => ...
);
```

If any param fails validation, a `400 Bad Request` will be returned.

## Body Validation

To validate a request body, pass a schema as the second argument to `.route()`:

```typescript
import { z } from "zod";

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
```

Zen Router supports any validation library that implements the Standard Schema spec. For Cloudflare Workers, we recommend [decoders](https://decoders.cc/).

If the body doesn't match the schema, Zen Router returns `422 Unprocessable Entity` with a human-readable error message.

## Query Strings

Query string parameters are available via `q`. They are always optional strings.

```typescript
// GET /api/posts?sort=newest&limit=10
zen.route("GET /api/posts", ({ q }) => {
  // q.sort  = "newest"
  // q.limit = "10"
  // q.other = undefined
});
```

## Handler Arguments

Every route handler receives a single object with the following properties:

| Property | Description |
|----------|-------------|
| `req` | The original, unmodified Request |
| `url` | Parsed URL (equivalent to `new URL(req.url)`) |
| `ctx` | Value returned by your `getContext` function |
| `auth` | Value returned by your `authorize` function |
| `p` | Typed route params |
| `q` | Query string params |
| `body` | Validated request body (if schema is provided) |

## Return Values

Handlers can return a JSON object and Zen Router will serialize it with a `200` status automatically. It must be an object, not an array or scalar.

```typescript
zen.route("GET /example", () => {
  // Returning a simple object → JSON response
  return { items: [1, 2, 3] };
});
```
