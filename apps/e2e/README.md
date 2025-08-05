# End-to-End Testing

This directory contains end-to-end tests for the Peak Health application using Playwright.

## Prerequisites

1. **Supabase CLI**: Make sure you have the Supabase CLI installed

   ```bash
   npm install -g supabase
   ```

2. **Playwright**: The Playwright dependencies are already installed in the project

## Test Structure

```
e2e/
├── auth/                    # Authentication flow tests
│   └── auth-flows.spec.ts   # Login, signup, logout tests
├── setup/                   # Test setup utilities
│   └── supabase-setup.ts    # Supabase local instance management
├── utils/                   # Test utilities
│   └── auth-helpers.ts      # Authentication helper functions
└── README.md               # This file
```

## Running Tests

### All E2E Tests

```bash
pnpm test:e2e
```

### E2E Tests with UI

```bash
pnpm test:e2e:ui
```

### E2E Tests in Debug Mode

```bash
pnpm test:e2e:debug
```

### E2E Tests in Headed Mode (visible browser)

```bash
pnpm test:e2e:headed
```

## Test Features

### Authentication Flows

- **Sign Up**: Tests user registration with validation
- **Login**: Tests user authentication with various scenarios
- **Logout**: Tests user logout and session cleanup
- **Navigation**: Tests redirects for authenticated/unauthenticated users
- **Session Persistence**: Tests session maintenance across page refreshes

### Supabase Integration

- Automatically starts local Supabase instance before tests
- Automatically stops local Supabase instance after tests
- Uses isolated test data for each test run

## Test Data

Tests use generated test users with unique email addresses to avoid conflicts:

- Email format: `test-{timestamp}@example.com`
- Password: `TestPassword123!`
- Name: `Test User`

## Writing New Tests

### Adding Test IDs

When adding new components that need to be tested, add `data-testid` attributes:

```tsx
<Button data-testid="my-button">Click me</Button>
<input data-testid="my-input" />
```

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Using Helper Functions

```typescript
import { generateTestUser, loginUser } from '../utils/auth-helpers';

test('should work with authenticated user', async ({ page }) => {
  const user = generateTestUser();
  await loginUser(page, user);
  // Continue with test...
});
```

## CI/CD Integration

E2E tests are automatically run as part of the pre-commit hook and should be included in your CI/CD pipeline.

## Troubleshooting

### Supabase Issues

- Ensure Supabase CLI is installed: `supabase --version`
- Check if you're in a Supabase project: `ls supabase/config.toml`
- Reset local Supabase: `supabase stop && supabase start`

### Playwright Issues

- Install browsers: `npx playwright install`
- Update browsers: `npx playwright install --with-deps`

### Test Failures

- Check browser console for errors
- Use `pnpm test:e2e:debug` for step-by-step debugging
- Use `pnpm test:e2e:headed` to see the browser in action
