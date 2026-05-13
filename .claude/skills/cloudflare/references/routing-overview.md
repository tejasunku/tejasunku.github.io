# Static Assets Routing Overview

Complete routing decision flow for Cloudflare Workers with Static Assets.

## Decision Flow

```
Incoming request
       │
       ▼
┌─────────────────────────────────┐
│ Run Worker first?               │
│ (run_worker_first config)       │
└─────────────────────────────────┘
       │
   ┌───┴───┐
   │       │
  YES     NO
   │       │
   ▼       ▼
Worker  ┌─────────────────────────┐
runs    │ Request matches asset?  │
 first  └─────────────────────────┘
         │           │
        YES         NO
         │           │
         ▼           ▼
    Serve      ┌─────────────────┐
    asset      │ Worker script   │
               │ present?        │
               └─────────────────┘
                     │      │
                    YES     NO
                     │      │
                     ▼      ▼
                Worker   Serve
                runs     index.html
                         (SPA mode)
```

## Configuration Options

### SPA Mode
```jsonc
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application"
  }
}
```

### Run Worker First (always)
```jsonc
{
  "assets": {
    "directory": "./dist/",
    "binding": "ASSETS",
    "run_worker_first": true
  }
}
```

### Selective Paths
```jsonc
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/api/*", "!/api/docs/*"]
  }
}
```

## Billable Invocations

Requests are **only billable** if a Worker script is invoked. Static asset serving does not incur Worker charges.

## Navigation Request Behavior

With `assets_navigation_prefers_asset_serving` flag (compatibility date 2025-04-01+):
- Browser navigation requests (`Sec-Fetch-Mode: navigate`) bypass Worker script
- Client-side `fetch()` calls still invoke Worker
- Reduces billable invocations for SPAs

## See Also

- [Single Page Application](single-page-application.md)
- [Worker Script](worker-script.md)
- [Advanced Routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/)