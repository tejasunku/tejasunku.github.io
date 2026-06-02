# Webmention

Webmention is a simple way to notify any URL when you mention it from your site.

## Protocol Flow

1. Alice posts content on her site
2. Bob writes a response on his site linking to Alice
3. Bob's server sends a Webmention to Alice's endpoint
4. Alice's server verifies the link exists and stores the mention

## Sending Webmentions

### Discovery
First, discover the target's Webmention endpoint:

```html
<!-- In the HTML of the target page -->
<link rel="webmention" href="https://example.com/webmention">

<!-- Or via HTTP Header -->
Link: <https://example.com/webmention>; rel="webmention"
```

### Sending the notification

```http
POST /webmention HTTP/1.1
Host: target.example.com
Content-Type: application/x-www-form-urlencoded

source=https://yoursite.com/post&target=https://target.example.com/page
```

### Response codes
- `202 Accepted` - Queued for processing
- `201 Created` - Location header with status URL
- Any `2xx` - Success

## Receiving Webmentions

### Verify the request

1. Validate `source` and `target` are valid URLs
2. Reject if `source === target`
3. Verify `target` is a valid resource you accept mentions for

### Verify the mention

1. GET the `source` URL
2. Confirm it contains a link to your `target`
3. If source returns `410 Gone`, delete existing mention

### Example endpoint (Express/Zen Router)

```typescript
import { ZenRouter, json, abort } from "zen-router";

const router = new ZenRouter({
  authorize: () => true,
});

router.post("/webmention", async (req, ctx) => {
  const { source, target } = await req.formData();
  
  if (!source || !target) {
    return abort(400, "missing source or target");
  }
  
  // Queue verification asynchronously
  ctx.waitUntil(verifyWebmention(source, target));
  
  return json({ success: true });
});

async function verifyWebmention(source: string, target: string) {
  const response = await fetch(source);
  const html = await response.text();
  
  if (!html.includes(target)) {
    // Source doesn't link to target
    return;
  }
  
  // Store the mention...
}
```

## Security

- Verify all mentions before displaying
- Queue verification asynchronously (prevent DoS)
- Limit fetch size (1MB max)
- Limit redirects (20 max)
- Don't send to localhost/loopback

## Reference

- https://webmention.net/draft/
- https://indieweb.org/webmention
- Test suite: https://webmention.rocks/