# React Hooks

First-class React integration with hooks and context.

## Core Hooks

| Hook | Description |
|------|-------------|
| `useIdPFlare()` | Full context with state and actions |
| `useAuth()` | Login, logout, and auth state |
| `useIsAuthenticated()` | Just `isLoading` and `isAuthenticated` |
| `useAccount()` | Current account info |
| `useUserInfo()` | Fetch and cache user info |
| `useIdTokenClaims()` | Parsed ID token claims |
| `useTokens()` | All stored tokens |
| `useAccessToken()` | Get token function (with auto-refresh) |
| `useAuthenticatedFetch()` | Fetch function with auth headers |
| `useRequireAuth(options?)` | Redirect to login if not authenticated |

## API Hooks (for Custom UIs)

| Hook | Description |
|------|-------------|
| `useRegister()` | Register new users |
| `useLoginWithCredentials()` | Login with email/password + MFA |
| `useForgotPassword()` | Request password reset email |
| `useResetPassword()` | Reset password with token |
| `useChangePassword()` | Change password (authenticated) |
| `useSsoProviders()` | Get enabled SSO providers |
| `useStartSso()` | Start SSO authentication flow |

## With React

```typescript
function MyComponent() {
  const authFetch = useAuthenticatedFetch();

  const loadData = async () => {
    const response = await authFetch('/api/resource');
    const data = await response.json();
    // ...
  };
}
```

## Protected Routes

```typescript
function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useRequireAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; // Will redirect to login

  return children;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## Custom UI API

### Registration

```typescript
// React
const { register, isLoading, error, result } = useRegister();
await register({ email, password, name });

// Result
if (result.requiresVerification) {
  // Show "check your email" message
}
```

### Login with Credentials

```typescript
const { login, verifyMfa, mfaRequired, availableMethods } = useLoginWithCredentials();
await login({ email, password });

if (mfaRequired) {
  await verifyMfa({ mfaSessionId, code, method: 'totp' });
}
```

### Password Reset

```typescript
// Request reset email
await client.api.forgotPassword({ email: 'user@example.com' });

// Reset with token (from email link)
await client.api.resetPassword({
  token: urlParams.get('token'),
  password: 'newPassword123',
});
```

### SSO (Social Login)

```typescript
// React - show SSO buttons
function SsoButtons() {
  const { providers } = useSsoProviders();
  const { startSso, isLoading } = useStartSso();

  return (
    <div>
      {providers.map(provider => (
        <button key={provider} onClick={() => startSso(provider)}>
          Sign in with {provider}
        </button>
      ))}
    </div>
  );
}

// Vanilla JS
const { providers } = await client.api.getSsoProviders();
const { authUrl } = await client.api.startSsoFlow({ provider: 'google' });
window.location.href = authUrl; // Redirect to Google
```

## TypeScript

Full TypeScript support is included:

```typescript
import type {
  IdPFlareConfig,
  UserInfo,
  IdTokenClaims,
  AuthenticationResult,
  AccountInfo,
} from '@idpflare/client';
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Requires Web Crypto API (for PKCE)
