# Peak Health E2E Testing

This directory contains end-to-end tests for the Peak Health application using Playwright.

## Architecture

The tests are organized using the Page Object Model pattern to improve maintainability and reduce duplication.

### Directory Structure

```
apps/e2e/
├── pages/                  # Page objects
│   ├── base/               # Base page classes
│   ├── components/         # Reusable component objects
│   ├── regular/            # Regular user page objects
│   ├── admin/              # Admin user page objects
│   └── trainer/            # Trainer user page objects
├── tests/                  # Test files
│   ├── 00.setup.ts         # Setup tests
│   ├── 01.setup.admin.web.ts
│   ├── 02.setup.admin.admin.ts
│   ├── 03.setup.regular.web.ts
│   ├── 04.setup.trainer.web.ts
│   ├── admin.flow.spec.ts  # Admin user tests
│   ├── landing.redirect.spec.ts # Landing page tests
│   ├── regular.flow.spec.ts # Regular user tests
│   └── trainer.flow.spec.ts # Trainer user tests
├── utils/                  # Utility functions
│   ├── ErrorHandler.ts     # Error handling utilities
│   ├── ScreenshotHelper.ts # Screenshot utilities
│   └── TestDataHelper.ts   # Test data generation
└── playwright.config.ts    # Playwright configuration
```

## Page Object Model

The Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. Each page in the application is represented by a corresponding page class that encapsulates the page's functionality.

### Base Page

The `Page` class in `pages/base/Page.ts` provides common functionality for all page objects:

- Navigation
- Waiting for elements
- Taking screenshots
- Interacting with elements (click, fill, etc.)

### User-Specific Base Pages

Each user type has a base page class that extends the `Page` class:

- `RegularUserBasePage`: Base page for regular users
- `AdminBasePage`: Base page for admin users
- `TrainerBasePage`: Base page for trainer users

These base pages provide functionality specific to each user type.

### Specific Page Objects

Each page in the application has a corresponding page object that extends the appropriate base page:

- `DashboardPage`: Dashboard page for each user type
- `RoutinesPage`: Routines page for regular users
- `RoutineCreatePage`: Routine creation page for regular users

### Component Objects

Reusable UI components are represented by component objects:

- `Toast`: Toast notifications
- `Navbar`: Navigation bar

## Utilities

### ScreenshotHelper

The `ScreenshotHelper` class provides methods for taking screenshots:

- `takeFullPageScreenshot`: Take a screenshot of the entire page
- `takeElementScreenshot`: Take a screenshot of a specific element
- `takeScreenshotWithMask`: Take a screenshot with masked elements

### ErrorHandler

The `ErrorHandler` class provides error handling and reporting:

- Captures console logs and errors
- Takes screenshots on errors
- Attaches logs and screenshots to test results

### TestDataHelper

The `TestDataHelper` class provides methods for generating test data:

- `generateRoutineData`: Generate data for a routine
- `generateUserData`: Generate data for a user
- `generateTrainerData`: Generate data for a trainer
- `generateAdminData`: Generate data for an admin

## Best Practices

### Wait Strategies

Instead of using arbitrary timeouts, use proper wait strategies:

- Wait for elements to be visible/enabled
- Wait for network requests to complete
- Wait for page load states

```typescript
// Bad
await page.waitForTimeout(1000);

// Good
await page.waitForSelector('.my-element');
await page.waitForLoadState('networkidle');
```

### Selectors

Use reliable selectors:

- Prefer data-testid attributes: `[data-testid="my-element"]`
- Use role-based selectors: `getByRole('button', { name: /submit/i })`
- Avoid using CSS classes that might change

### Test Structure

Use `test.step` to organize tests:

```typescript
await test.step('Step description', async () => {
  // Test steps
});
```

### Screenshot Testing

Use screenshot testing to verify UI consistency:

```typescript
await screenshotHelper.takeFullPageScreenshot('page-name');
```

## Running Tests

To run the tests:

```bash
pnpm test:e2e
```

To run a specific test file:

```bash
pnpm test:e2e tests/regular.flow.spec.ts
```

To run tests with UI:

```bash
pnpm test:e2e --ui
```
