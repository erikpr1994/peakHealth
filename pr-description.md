# Fix language maintenance across apps

## Problem

Currently, when redirecting between the landing, auth, and web apps, the language/locale is not properly maintained. This results in users being redirected to the default language (English) regardless of their current language preference.

## Current Issues

1. **Web app middleware** redirects to landing app without preserving locale
2. **Auth app** redirects to apps without considering current locale
3. **Landing app** redirects to auth without preserving locale
4. **Cross-app navigation** doesn't maintain language preferences
5. **Direct access** to auth/web app roots always defaults to English

## Solution

Implement proper locale preservation in all cross-app redirects by:

1. **Extract current locale** from URL or headers before redirecting
2. **Pass locale as parameter** in redirect URLs
3. **Update redirect utilities** to handle locale preservation
4. **Add locale detection** in middleware for better UX
5. **Add browser language detection** for direct access scenarios

## Changes

### Auth Types Package

- **`packages/auth/auth-types/src/index.ts`**: Added `locale` support to `RedirectOptions` interface

### Auth Utils Package

- **`packages/auth/auth-utils/src/index.ts`**:
  - Updated `buildAppRedirectUrl` to preserve locale in redirects
  - Added locale extraction utilities:
    - `extractLocaleFromUrl()` - Extract locale from URLs
    - `extractLocaleFromPathname()` - Extract locale from pathnames
    - `extractLocaleFromPathnameWithFallback()` - Extract with fallback to 'en'
    - `parseAcceptLanguage()` - Parse browser language headers
- **`packages/auth/auth-utils/src/index.test.ts`**: Added comprehensive tests for locale utilities (29 new tests)

### Web App

- **`apps/web/package.json`**: Added dependency on `@peakhealth/auth-utils`
- **`apps/web/src/middleware.ts`**:
  - Updated to preserve locale when redirecting to landing app
  - Added browser language detection for authenticated users landing on root
- **`apps/web/src/features/auth/context/AuthContext.tsx`**: Updated to preserve locale when redirecting to landing

### Auth App

- **`apps/auth/src/app/page.tsx`**: Added browser language detection for direct access to auth app root
- **`apps/auth/src/features/auth/components/LoginForm.tsx`**: Updated to preserve locale when redirecting to apps
- **`apps/auth/src/features/auth/components/AppSelector.tsx`**: Updated to preserve locale during app selection

## Testing

- Added 29 new test cases for locale utilities
- Added 5 test cases for locale-aware redirect functionality
- All tests pass (34/34 in auth-utils package)
- E2E tests pass (12/12)

## Benefits

- **Language preservation**: User's current locale is maintained across all redirects
- **Browser language detection**: Accept-Language headers are properly parsed for initial locale detection
- **Consistent UX**: Users stay in their preferred language throughout the entire authentication flow
- **Fallback handling**: Graceful fallback to English when locale cannot be determined
- **Direct access support**: Users landing directly on app roots get proper language detection
