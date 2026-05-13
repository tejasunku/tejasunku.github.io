# Error Handling

Aborting from handlers, and customizing error responses.

## Aborting from Handlers

Use `abort()` to short-circuit a handler and return an error response:

```typescript
import { abort } from "@liveblocks/zenrouter";

zen.route(
  "GET /api/posts/<postId>",
  async ({ p }) => {
    const post = await db.getPostById(p.postId);
    if (!post) {
      abort(404);
    }
    return { id: post.id, title: post.title };
  }
);
```

`abort()` throws internally and never returns. By default, it produces a JSON response like `{ "error": "Not Found" }`.

## Default Error Shape

By default, all error responses are JSON with at least an `error` key:

```json
{ "error": "Not Found" }
```

For validation errors (422), a `reason` field is included with details:

```json
{
  "error": "Unprocessable Entity",
  "reason": "Value at key 'title': expected string"
}
```

## Custom Error Handling

Use `onError` to customize the error response shape for all HTTP errors:

```typescript
zen.onError((error, { req, ctx }) => {
  // error.status  — the HTTP status code
  // error.message — the error message
  return json(
    {
      code: error.status,
      message: error.message,
      path: new URL(req.url).pathname,
    },
    error.status
  );
});
```

Use `onUncaughtError` to handle unexpected errors (bugs, unhandled exceptions):

```typescript
zen.onUncaughtError((error, { req, ctx }) => {
  console.error("Uncaught error:", error);
  return json({ error: "Something went wrong" }, 500);
});
```

Both handlers can only be registered once per router.

## Shared Error Handler

If you use `ZenRelay` with multiple routers, you can share an `ErrorHandler` instance across them:

```typescript
import { ErrorHandler, ZenRouter, ZenRelay } from "@liveblocks/zenrouter";

const errorHandler = new ErrorHandler();
errorHandler.onError((error) => {
  return json({ code: error.status, message: error.message }, error.status);
});

const api = new ZenRouter({ authorize: myAuth, errorHandler });
const admin = new ZenRouter({ authorize: adminAuth, errorHandler });
const app = new ZenRelay({ errorHandler });
```

## Built-in Error Responses

Zen Router automatically aborts under these conditions:

| Status | When |
|--------|------|
| 400 Bad Request | Path params are malformed or fail validation |
| 403 Forbidden | `authorize` returns a falsy value |
| 404 Not Found | No route matches the URL |
| 405 Method Not Allowed | URL matches but HTTP method doesn't |
| 422 Unprocessable Entity | Request body fails schema validation |
| 500 Internal Server Error | Uncaught error in a handler |
