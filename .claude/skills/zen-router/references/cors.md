# CORS

Built-in CORS support with sensible defaults.

## When You Need CORS

You only need to enable CORS if your routes are going to be called from a browser with JavaScript running on a different origin (e.g., your frontend at `app.example.com` calls your API at `api.example.com`).

You do NOT need CORS if:
- Your routes are only called from other backend servers
- Your routes are on the same origin as your frontend

## How It Works

When you enable CORS on a router, Zen Router:

1. Handles `OPTIONS` preflight requests automatically (responds with `204` and correct `Access-Control-*` headers)
2. Adds CORS headers to all responses so browser JavaScript can read the response

## Enabling CORS

Pass `cors: true` to enable CORS with sensible defaults across all routes:

```typescript
const zen = new ZenRouter({
  authorize: () => { /* ... */ },
  cors: true,
});
```

CORS is configured per-router, not per-route. Typically only your public API router needs CORS since it's the only one browsers talk to directly.

## Custom Configuration

```typescript
const zen = new ZenRouter({
  authorize: () => { /* ... */ },
  cors: {
    allowedOrigins: ["https://example.com", "https://app.example.com"],
    allowCredentials: true,
    exposeHeaders: ["X-Request-Id"],
    maxAge: 86400,
  },
});
```

### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `allowedOrigins` | `"*"` | Which origins are allowed. `"*"` allows any origin. |
| `allowedMethods` | All | Which methods to allow, e.g. `["GET", "POST"]` |
| `allowedHeaders` | `"*"` | Which headers browsers may include in requests |
| `allowCredentials` | `false` | Whether to allow cookies and TLS client certificates |
| `exposeHeaders` | `[]` | Which response headers browser scripts can access |
| `maxAge` | — | How long (in seconds) browsers may cache preflight responses |
| `sendWildcard` | `false` | Send `*` instead of echoing back the Origin (cannot use with `allowCredentials`) |
| `alwaysSend` | `true` | Send CORS headers even if the request has no `Origin` header |
| `varyHeader` | `true` | Add `Vary: Origin` header to responses |
