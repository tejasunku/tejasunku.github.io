# Micropub

Micropub is an API for creating, updating, and deleting posts on your website from third-party clients.

## Endpoint Discovery

```html
<link rel="micropub" href="/micropub">
```

## Authentication

All requests require a Bearer token:

```http
Authorization: Bearer xxxxxxxx
```

Or via form parameter:
```http
access_token=xxxxxxx
```

## Create Post

### Form-encoded
```http
POST /micropub HTTP/1.1
Content-Type: application/x-www-form-urlencoded

h=entry&content=Hello+World&category[]=indieweb&category[]=web
```

### JSON
```http
POST /micropub HTTP/1.1
Content-Type: application/json

{
  "type": ["h-entry"],
  "properties": {
    "content": ["Hello world!"],
    "category": ["indieweb", "web"]
  }
}
```

## Response

```http
HTTP/1.1 201 Created
Location: https://example.com/post/123
```

## Update Post

```json
{
  "action": "update",
  "url": "https://example.com/post/123",
  "replace": {
    "content": ["Updated content"]
  }
}
```

### Add property
```json
{
  "action": "update",
  "url": "https://example.com/post/123",
  "add": {
    "category": ["newtag"]
  }
}
```

### Remove property
```json
{
  "action": "update",
  "url": "https://example.com/post/123",
  "delete": ["category"]
}
```

## Delete Post

```json
{
  "action": "delete",
  "url": "https://example.com/post/123"
}
```

## Query

### Configuration
```http
GET /micropub?q=config
Authorization: Bearer xxxxxxxx

{
  "media-endpoint": "https://example.com/media",
  "syndicate-to": []
}
```

### Source content
```http
GET /micropub?q=source&url=https://example.com/post/123
Authorization: Bearer xxxxxxxx

{
  "type": ["h-entry"],
  "properties": {
    "content": ["Hello"],
    "published": ["2026-05-13"]
  }
}
```

## Media Endpoint

Upload files separately, get URL back:

```http
POST /media HTTP/1.1
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

[binary data]
--boundary

HTTP/1.1 201 Created
Location: https://example.com/media/abc.jpg
```

## Vocabulary

Use h-entry for posts. Properties:
- `name` - Title
- `content` - Body text (or object with `html`)
- `summary` - Short description
- `published` - Publication date
- `category` - Tags
- `location` - Geo URI or h-card
- `in-reply-to` - URL being replied to
- `like-of` - URL being liked
- `repost-of` - URL being reposted

## Reference

- https://micropub.spec.indieweb.org/
- https://indieweb.org/micropub
- Test suite: https://micropub.rocks/