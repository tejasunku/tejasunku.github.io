# Worker Script

The Worker script runs when no matching static asset is found (or when `run_worker_first` is configured).

## Run Worker Before Each Request

Set `run_worker_first: true` to always run the Worker before serving assets. Useful for:
- Logging requests
- Authentication checks
- HTMLRewriter transformations
- Injecting data into pages

```jsonc
{
  "assets": {
    "directory": "./dist/",
    "binding": "ASSETS",
    "run_worker_first": true
  }
}
```

```typescript
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    const user = await checkIfRequestIsAuthenticated(request);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    const assetResponse = await this.env.ASSETS.fetch(request);
    return new HTMLRewriter()
      .on("#user", {
        element(element) {
          element.setInnerContent(JSON.stringify({ name: user.name }));
        },
      })
      .transform(assetResponse);
  }
}
```

## Run Worker First for Selective Paths

Use an array of route patterns for selective Worker-first routing:

```jsonc
{
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/oauth/callback"]
  }
}
```

```typescript
export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const accessToken = await exchangeCodeForToken(code, state);
    const sessionIdentifier = await storeTokenAndGenerateSession(accessToken);

    return new Response(null, {
      headers: {
        Location: "/",
        "Set-Cookie": `session_token=${sessionIdentifier}; HttpOnly; Secure; SameSite=Lax; Path=/`,
      },
    });
  }
}
```

## Key Points

- Worker script only runs when: no matching asset found OR request matches `run_worker_first` pattern
- Use `this.env.ASSETS.fetch(request)` to serve assets after processing
- Navigation requests bypass Worker with `assets_navigation_prefers_asset_serving` flag

**Source:** https://developers.cloudflare.com/workers/static-assets/routing/worker-script/