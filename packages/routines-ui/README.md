# @peakhealth/routines-ui

A shared package for domain-specific UI components and hooks related to the Routines feature. This package consumes atomic components from `@peakhealth/ui` and types from `@peakhealth/routines-types`.

## Purpose

This package serves as a bridge between the atomic UI components and the application-specific implementations. It provides reusable, domain-specific components that can be used across different applications (web, trainers, etc.) that need to interact with the Routines domain.

## Installation

```bash
pnpm add @peakhealth/routines-ui
```

## Usage

```tsx
import { RoutineBuilder } from '@peakhealth/routines-ui';
import { useRoutineBuilder } from '@peakhealth/routines-ui/hooks';

function MyComponent() {
  const { routine, updateRoutine } = useRoutineBuilder();
  
  return (
    <RoutineBuilder 
      routine={routine}
      onChange={updateRoutine}
    />
  );
}
```

## Structure

- `/components` - Domain-specific UI components
- `/hooks` - Custom hooks for managing routine state and interactions
- `/context` - Context providers for routine-related state
- `/utils` - Utility functions for routine data manipulation
- `/types` - TypeScript types specific to the UI components

## Development

```bash
# Install dependencies
pnpm install

# Start development build with watch mode
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Dependencies

- `@peakhealth/ui` - Atomic UI components
- `@peakhealth/routines-types` - Domain types for routines

