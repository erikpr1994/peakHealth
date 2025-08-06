# Fix: Auth Infinite Loop on 401 USER_NOT_FOUND

## Problem

When a user was manually deleted from the database but still had valid JWT cookies, the application would enter an infinite loop of page refreshes. This happened because:

1. The user had valid JWT cookies but the user no longer existed in the database
2. The `/api/auth/user` endpoint returned a 401 with `USER_NOT_FOUND` code
3. The `userFetcher` in `AuthContext` would try to redirect to `/login` but didn't properly clear the Supabase session
4. SWR would revalidate and hit the same 401 error again, creating an infinite loop

## Solution

The fix involved several changes:

### 1. Enhanced `userFetcher` in `AuthContext.tsx`

- Added proper Supabase session clearing when `USER_NOT_FOUND` error is detected
- Changed error handling to return `null` instead of throwing errors for 401 responses to prevent SWR retries
- Added proper cleanup of localStorage and sessionStorage

### 2. Improved Logout Endpoint

- Enhanced `/api/auth/logout` to explicitly clear all Supabase auth cookies
- Added proper cookie deletion for `sb-access-token`, `sb-refresh-token`, and `supabase-auth-token`

### 3. SWR Configuration

- Added `onError` handler to prevent retries on 401 errors
- Maintained `shouldRetryOnError: false` to prevent automatic retries

## Files Changed

- `apps/web/src/features/auth/context/AuthContext.tsx`
- `apps/web/src/app/api/auth/logout/route.ts`

## Testing

The fix ensures that when a user is deleted from the database:

1. The application detects the `USER_NOT_FOUND` error
2. Properly clears all authentication state (cookies, localStorage, sessionStorage)
3. Redirects to the login page
4. Prevents infinite loops by not retrying failed requests

## Prevention

To prevent this issue in the future:

- Always use the proper logout flow instead of manually deleting users
- Consider implementing a cleanup job that removes orphaned sessions
- Monitor for 401 errors in production logs
