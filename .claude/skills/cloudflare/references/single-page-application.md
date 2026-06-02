# Single Page Application (SPA)

Configure your Worker to serve a Single Page Application where all navigation requests fall back to `/index.html`.

## Configuration

In `wrangler.jsonc`:

```jsonc
{
  "name": "my-worker",
  "compatibility_date": "2026-05-13",
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application"
  }
}
```

When an incoming request does not match a file in `assets.directory`, Workers will serve the contents of `/index.html` with a `200 OK` status.

## Navigation Requests

With the `assets_navigation_prefers_asset_serving` compatibility flag (or compatibility date `2025-04-01`+), navigation requests (those with `Sec-Fetch-Mode: navigate` header) will NOT invoke the Worker script. This reduces billable invocations for client-heavy SPAs.

**Note:** If you navigate to `/api/date` in the browser, you'll get HTML instead of your API response. Use client-side `fetch()` calls for API requests.

## Client-Side Callbacks (OAuth)

If you need to handle OAuth callbacks at a path like `/oauth/callback`, create a slim HTML file at that route:

```html
<!DOCTYPE html>
<html>
  <body>
    <p>Loading...</p>
    <script>
      (async () => {
        const response = await fetch("/api/oauth/callback" + window.location.search);
        if (response.ok) {
          window.location.href = '/';
        } else {
          document.querySelector('p').textContent = 'Error: ' + (await response.json()).error;
        }
      })();
    </script>
  </body>
</html>
```

## Advanced Routing Control

For explicit control over which requests hit the Worker vs. static assets:

```jsonc
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application",
    "binding": "ASSETS",
    "run_worker_first": ["/api/*", "!/api/docs/*"]
  }
}
```

This disables automatic `Sec-Fetch-Mode: navigate` detection and gives explicit control.

## Routing Decision Flow

1. Does request match `run_worker_first` path? → Run Worker first
2. Does request match a static asset? → Serve asset
3. Is navigation request? → Serve `/index.html` (SPA mode)
4. Otherwise → Invoke Worker script

Requests are only billable if a Worker script is invoked.

**Source:** https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/