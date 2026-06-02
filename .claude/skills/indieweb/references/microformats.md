# Microformats2

Microformats are a simple way to add structured data to HTML by using class names.

## Root Classes

| Format | Root Class | Description |
|--------|------------|-------------|
| h-entry | `h-entry` | Blog posts, articles, notes |
| h-card | `h-card` | People, organizations |
| h-feed | `h-feed` | List of h-entry items |
| h-event | `h-event` | Events |
| h-adr | `h-adr` | Address/location |
| h-geo | `h-geo` | Geographic coordinates |

## Property Prefixes

- `p-` - Plain text (p-name, p-summary)
- `e-` - Embedded HTML (e-content)
- `u-` - URL (u-url, u-photo)
- `dt-` - Date/time (dt-published, dt-updated)

## Example: h-entry

```html
<article class="h-entry">
  <h1 class="p-name">My Blog Post</h1>
  <time class="dt-published" datetime="2026-05-13T12:00:00Z">
    May 13, 2026
  </time>
  <div class="e-content">
    <p>Full content with <strong>HTML</strong></p>
  </div>
  <p class="p-summary">Short summary</p>
  <div class="p-author h-card">
    <img class="u-photo" src="/me.jpg" alt="">
    <a class="p-name u-url" href="/">Author Name</a>
  </div>
  <a class="u-url" href="/blog/post">Permalink</a>
  <a class="u-like-of" href="https://other.site/post">Like of</a>
  <a class="u-in-reply-to" href="https://other.site/post">In reply to</a>
</article>
```

## Example: h-card (Person)

```html
<div class="h-card">
  <img class="u-photo" src="photo.jpg" alt="Photo">
  <a class="p-name u-url" href="https://example.com/">Name</a>
  <span class="p-nickname">nickname</span>
  <span class="p-email">email@example.com</span>
  <a class="u-email" href="mailto:email@example.com">Email</a>
</div>
```

## Parsed JSON Structure

```json
{
  "type": ["h-entry"],
  "properties": {
    "name": ["Post Title"],
    "content": [{"value": "text", "html": "<p>HTML</p>"}],
    "published": ["2026-05-13T12:00:00Z"],
    "author": [{
      "value": "Author Name",
      "type": ["h-card"],
      "properties": {
        "name": ["Author Name"],
        "url": ["https://example.com/"]
      }
    }]
  }
}
```

## Reference

- https://microformats.org/wiki/h-entry
- https://microformats.org/wiki/h-card
- https://microformats.org/wiki/microformats2