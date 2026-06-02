# IndieAuth

IndieAuth is an identity layer on top of OAuth 2.0. Users are identified by their URL.

## Flow

1. User enters their URL
2. Client discovers the IndieAuth server via `rel="indieauth-metadata"`
3. Client redirects to authorization endpoint
4. User authenticates and approves
5. Client exchanges authorization code for access token

## Discovery

### In HTML
```html
<link rel="indieauth-metadata" href="/.well-known/oauth-authorization-server">
<link rel="authorization_endpoint" href="/auth">
```

### In HTTP Header
```http
Link: <https://example.com/.well-known/oauth-authorization-server>; rel="indieauth-metadata"
```

## Authorization Request

```
https://example.com/auth?
  response_type=code&
  client_id=https://myapp.example.com/&
  redirect_uri=https://myapp.example.com/callback&
  state=abc123&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  scope=profile create&
  me=https://user.example.com/
```

## Token Exchange

```http
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=xxxxx&
client_id=https://myapp.example.com/&
redirect_uri=https://myapp.example.com/callback&
code_verifier=a6128783714cfda1d388e2e98b6ae8221ac31aca31959e59512c59f5
```

## Response

```json
{
  "access_token": "xxxxx",
  "token_type": "Bearer",
  "scope": "profile create",
  "me": "https://user.example.com/"
}
```

## Client Metadata

Your app should serve a JSON document at the client_id URL:

```json
{
  "client_id": "https://myapp.example.com/",
  "client_name": "My App",
  "client_uri": "https://myapp.example.com/",
  "redirect_uris": ["https://myapp.example.com/callback"]
}
```

## Server Metadata

```json
{
  "issuer": "https://example.com/",
  "authorization_endpoint": "https://example.com/auth",
  "token_endpoint": "https://example.com/token",
  "code_challenge_methods_supported": ["S256"]
}
```

## Reference

- https://indieauth.spec.indieweb.org/
- https://indieweb.org/IndieAuth-spec
- Test suite: https://indieauth.rocks/