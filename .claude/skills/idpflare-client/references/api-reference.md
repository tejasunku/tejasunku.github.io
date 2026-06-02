# API Reference

## IdPFlareClient Methods

### Authentication Methods

| Method | Description |
|--------|-------------|
| `login(request?)` | Start the login flow (redirects to IdP) |
| `handleCallback(url?)` | Handle the OAuth callback |
| `logout(options?)` | Log out the user |
| `isAuthenticated()` | Check if user is authenticated |

### Token Methods

| Method | Description |
|--------|-------------|
| `getAccessToken()` | Get current access token (null if expired) |
| `getAccessTokenSilent()` | Get token, refreshing if needed |
| `getTokens()` | Get all stored tokens |
| `refreshAccessToken()` | Manually refresh the access token |
| `revokeToken()` | Revoke the current access token |

### User Info Methods

| Method | Description |
|--------|-------------|
| `getAccount()` | Get current account info |
| `getUserInfo()` | Fetch user info from userinfo endpoint |
| `getIdTokenClaims()` | Parse and return ID token claims |

### Utility Methods

| Method | Description |
|--------|-------------|
| `fetch(input, init?)` | Make authenticated fetch request |
| `getAuthorizationHeader()` | Get `Bearer <token>` header value |
| `getDiscoveryDocument()` | Fetch OIDC discovery document |

## Events

```typescript
client.on('loginStart', (event) => { /* ... */ });
client.on('loginSuccess', (event) => { /* ... */ });
client.on('loginError', (event) => { /* ... */ });
client.on('logoutStart', (event) => { /* ... */ });
client.on('logoutComplete', (event) => { /* ... */ });
client.on('tokenRefresh', (event) => { /* ... */ });
client.on('tokenRefreshError', (event) => { /* ... */ });
client.on('sessionExpired', (event) => { /* ... */ });
```

## Storage Options

```typescript
// localStorage (default) - persists across tabs and browser restarts
createIdPFlareClient({ storage: 'localStorage', ... });

// sessionStorage - cleared when tab closes
createIdPFlareClient({ storage: 'sessionStorage', ... });

// Memory - cleared on page refresh (useful for high-security scenarios)
createIdPFlareClient({ storage: 'memory', ... });
```

## Silent Token Refresh

Tokens are automatically refreshed when using `getAccessTokenSilent()` or the `fetch()` helper. You can also manually refresh:

```typescript
const refreshed = await client.refreshAccessToken();
if (!refreshed) {
  // Refresh failed, user needs to log in again
  client.login();
}
```

## Making API Calls

```typescript
// Using the client directly
const response = await client.fetch('/api/resource');

// Or get the token manually
const token = await client.getAccessTokenSilent();
const response = await fetch('/api/resource', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Event Handling

```typescript
// Subscribe to events
const unsubscribe = client.on('sessionExpired', () => {
  showNotification('Your session has expired. Please log in again.');
  client.login();
});

// Later: unsubscribe
unsubscribe();
```

## Login Options

```typescript
await client.login({
  // Additional scopes to request
  scopes: ['custom:scope'],

  // Force re-authentication
  prompt: 'login',

  // Hint for which account to use
  loginHint: 'user@example.com',

  // Custom state parameter
  state: 'custom-state',

  // Extra query parameters
  extraQueryParams: {
    custom_param: 'value',
  },
});
```
