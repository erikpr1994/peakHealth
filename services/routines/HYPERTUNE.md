# Hypertune Integration for Routine Service

This document provides information on how Hypertune is integrated into the Routine Service for feature flags, A/B testing, and configuration management.

## Overview

Hypertune is a platform for feature flags, A/B testing, analytics, and app configuration. It's integrated into the Routine Service to enable:

- Feature flags for gradual rollouts and instant rollbacks
- User-specific feature targeting
- Configuration management
- A/B testing capabilities

## Setup

1. Install the Hypertune package:

   ```bash
   pnpm add hypertune
   ```

2. Configure environment variables:
   - Add `HYPERTUNE_API_KEY` to your `.env` file (see `.env.example`)
   - Get your API key from the Hypertune dashboard

3. Initialize Hypertune in your application:
   - The service automatically initializes Hypertune on startup
   - Graceful shutdown is handled when the service stops

## Usage

### Feature Flags

Feature flags are defined in `src/features/feature-flags.ts`. Current flags include:

- `ENABLE_ADVANCED_FILTERING`: Enables advanced filtering capabilities for routines
- `ENABLE_ROUTINE_SHARING`: Enables sharing routines with other users
- `ENABLE_ROUTINE_ANALYTICS`: Enables analytics tracking for routines
- `MAX_ROUTINES_PER_USER`: Sets the maximum number of routines a user can create

### Using Feature Flags in Code

To use a feature flag in your code:

```typescript
import {
  isAdvancedFilteringEnabled,
  TargetingAttributes,
} from '../features/feature-flags';

// Create targeting attributes for the current user
const attributes: TargetingAttributes = {
  userId: 'user-123',
  userRole: 'premium',
  environment: 'production',
};

// Check if a feature is enabled
if (isAdvancedFilteringEnabled(attributes)) {
  // Implement advanced filtering logic
}
```

### Targeting Attributes

You can target features based on:

- `userId`: The ID of the current user
- `userRole`: The role of the user (e.g., 'free', 'premium')
- `environment`: The environment (e.g., 'development', 'production')

## Hypertune Dashboard

To manage feature flags:

1. Log in to the [Hypertune Dashboard](https://app.hypertune.com)
2. Navigate to your project
3. Create or modify feature flags
4. Set targeting rules for each flag
5. Deploy changes instantly without code updates

## Advanced Configuration

### Auto-Generated Type-Safe Client

For improved type safety, you can generate a type-safe client:

1. Create a schema in the Hypertune dashboard
2. Run the code generation command:
   ```bash
   npx hypertune
   ```
3. Use the generated client for type-safe flag evaluation

### Local-Only Mode

For testing or development, you can use Hypertune in local-only mode:

```typescript
import { Hypertune } from 'hypertune';

const hypertune = new Hypertune({
  localOnly: true,
  // Provide local flag values
  localFlags: {
    'enable-advanced-filtering': true,
    'max-routines-per-user': 20,
  },
});
```

## Troubleshooting

- If feature flags aren't working, check that `HYPERTUNE_API_KEY` is set correctly
- Verify that Hypertune is properly initialized in the application
- Check the logs for any Hypertune-related errors
- Ensure targeting attributes are correctly passed to the flag evaluation functions

## Resources

- [Hypertune Documentation](https://docs.hypertune.com/)
- [Hypertune Dashboard](https://app.hypertune.com)
- [Hypertune Node.js SDK](https://www.npmjs.com/package/hypertune)
