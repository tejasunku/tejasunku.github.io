---
name: idpflare-client
description: |
  OAuth 2.0 / OpenID Connect client for IDPFlare identity provider. Use when:
  - Implementing user authentication with OAuth 2.0 or OIDC
  - Adding login, logout, and registration flows
  - Protecting routes or pages requiring authentication
  - Managing access tokens with automatic refresh
  - Using React hooks for auth state (useAuth, useIsAuthenticated, useAccessToken)
  - Integrating social login (SSO)
  - Fetching authenticated API requests
---

# IDPFlare Client

OAuth 2.0 / OpenID Connect client library for IDPFlare identity provider.

## Installation
```bash
npm install @idpflare/client
```

## Key Components
- `IdPFlareProvider` - Wrap app with provider
- `useAuth()` - Login, logout, auth state
- `useIsAuthenticated()` - Quick auth check
- `useAccessToken()` - Get token with auto-refresh
- `useAuthenticatedFetch()` - Fetch with auth headers
- `useRequireAuth()` - Protected routes

## Key Patterns
- Configure with authority, clientId, redirectUri
- Storage: localStorage (default), sessionStorage, or memory
- Events: loginStart, loginSuccess, tokenRefresh, sessionExpired
- Silent token refresh happens automatically

See [references/README.md](references/README.md) for full documentation.