# IDPFlare Client

OAuth 2.0 / OpenID Connect client library for [IDPFlare](https://idpflare.com). Provides a simple, MSAL-like API for authenticating users with your IDPFlare identity provider.

## Features

- OAuth 2.0 Authorization Code + PKCE - Secure authentication for SPAs
- React Hooks - First-class React integration with hooks and context
- TypeScript - Full type definitions included
- Automatic Token Refresh - Seamlessly refreshes tokens before expiry
- Flexible Storage - localStorage, sessionStorage, or in-memory
- Event System - Subscribe to authentication events
- Zero Dependencies - Core library has no runtime dependencies

## Installation

```bash
npm install @idpflare/client
```

## Quick Start

### Vanilla JavaScript/TypeScript

```typescript
import { createIdPFlareClient } from '@idpflare/client';

const client = createIdPFlareClient({
  authority: 'https://auth.example.com',
  clientId: 'my-spa-app',
  redirectUri: 'https://myapp.com/callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
});

// Start login
document.getElementById('loginBtn').onclick = () => client.login();

// Handle callback (on your /callback page)
if (window.location.search.includes('code=')) {
  const result = await client.handleCallback();
  if (result.success) {
    window.location.href = '/dashboard';
  }
}

// Check if authenticated
if (client.isAuthenticated()) {
  const userInfo = await client.getUserInfo();
  console.log('Logged in as:', userInfo.email);
}

// Make authenticated API calls
const response = await client.fetch('/api/protected-resource');

// Logout
document.getElementById('logoutBtn').onclick = () => client.logout();
```

### React

```typescript
import { IdPFlareProvider, useIdPFlare, useAuth, useUserInfo } from '@idpflare/client/react';

// Wrap your app with the provider
function App() {
  return (
    <IdPFlareProvider
      config={{
        authority: 'https://auth.example.com',
        clientId: 'my-spa-app',
        redirectUri: window.location.origin + '/callback',
      }}
      onLoginSuccess={(account) => console.log('Logged in:', account.email)}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </IdPFlareProvider>
  );
}

// Use hooks in your components
function HomePage() {
  const { login, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <a href="/dashboard">Go to Dashboard</a>
      ) : (
        <button onClick={() => login()}>Sign In</button>
      )}
    </div>
  );
}

function DashboardPage() {
  const { logout, account } = useIdPFlare();
  const { userInfo, loading } = useUserInfo();

  if (loading) return <div>Loading user info...</div>;

  return (
    <div>
      <h1>Welcome, {userInfo?.name || account?.email}</h1>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
```

## Configuration

```typescript
interface IdPFlareConfig {
  // Required
  authority: string;      // IDPFlare base URL (e.g., 'https://auth.example.com')
  clientId: string;      // Your OAuth client ID
  redirectUri: string;    // OAuth callback URL

  // Optional
  postLogoutRedirectUri?: string;  // Where to redirect after logout
  scopes?: string[];               // OAuth scopes (default: ['openid', 'profile', 'email'])
  autoRefresh?: boolean;           // Auto-refresh tokens (default: true)
  refreshBuffer?: number;          // Seconds before expiry to refresh (default: 60)
  storage?: 'localStorage' | 'sessionStorage' | 'memory';  // Token storage (default: 'localStorage')
  storageKeyPrefix?: string;       // Storage key prefix (default: 'idpflare')
}
```
