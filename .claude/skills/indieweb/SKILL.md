---
name: indieweb
description: IndieWeb standards for personal websites. Covers microformats (h-card, h-entry), Webmention, IndieAuth, Micropub. Use when implementing user identity, blog posts, comments via Webmention, or post authoring via Micropub.
license: CC0-1.0
compatibility: "*"
---

# IndieWeb Skill

The IndieWeb is a people-focused alternative to the corporate web. This skill covers the key standards for personal websites.

## Core Standards

| Standard | Purpose |
|----------|---------|
| **Microformats** | HTML markup for structured data (h-card, h-entry, h-feed) |
| **Webmention** | Notify other sites when you link to them |
| **IndieAuth** | OAuth-based authentication using your own URL |
| **Micropub** | API for creating/editing posts from third-party clients |

## Quick Reference

### h-entry (Blog posts)
```html
<article class="h-entry">
  <h1 class="p-name">Post Title</h1>
  <time class="dt-published" datetime="2026-05-13">May 13, 2026</time>
  <div class="e-content">
    Post content here...
  </div>
  <p class="p-author h-card">
    <a href="/">Your Name</a>
  </p>
</article>
```

### h-card (Person/Profile)
```html
<div class="h-card">
  <img class="u-photo" src="/photo.jpg" alt="">
  <a class="p-name u-url" href="/">Your Name</a>
  <a class="u-email" href="mailto:you@example.com">Email</a>
</div>
```

### Webmention Endpoint Discovery
```html
<link rel="webmention" href="/webmention">
<link rel="authorization_endpoint" href="/auth">
<link rel="indieauth-metadata" href="/.well-known/oauth-authorization-server">
```

### Micropub Create Post
```json
{
  "type": ["h-entry"],
  "properties": {
    "content": ["Hello world!"],
    "category": ["indieweb"]
  }
}
```

## Key Concepts

- **rel-me** - Used for IndieAuth verification (linked identity)
- **syndication** - Share posts to external platforms
- **reply-context** - Show what post you're replying to

## When to Use

Use this skill when:
- Marking up blog posts with h-entry
- Adding author/profile markup with h-card
- Implementing Webmention sending/receiving
- Setting up IndieAuth for login
- Building Micropub endpoint for post authoring