# PeakHealth Code Organization Standards

This document outlines the standard code organization patterns for the PeakHealth codebase. Following these standards ensures consistency and improves code readability and maintainability.

## Project Structure

### Monorepo Structure

The PeakHealth project follows a monorepo structure using Turborepo:

```
peakHealth/
├── apps/
│   ├── web/           # Main user-facing application
│   ├── admin/         # Admin panel
│   ├── auth/          # Authentication service
│   └── landing/       # Marketing website
├── packages/
│   ├── ui/            # Shared UI components
│   ├── auth/          # Shared authentication utilities
│   └── config/        # Shared configuration
├── docs/              # Documentation
└── package.json       # Root package.json
```

### Application Structure

Each application follows a feature-based organization pattern:

```
app/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Shared components specific to this app
│   ├── contexts/      # React contexts
│   ├── features/      # Feature modules
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── package.json       # App-specific package.json
```

### Feature Module Structure

Feature modules are organized as follows:

```
features/
├── feature-name/
│   ├── components/    # Feature-specific components
│   ├── context/       # Feature-specific context
│   ├── hooks/         # Feature-specific hooks
│   ├── lib/           # Feature-specific utilities
│   ├── types/         # Feature-specific types
│   ├── api/           # API integration for the feature
│   ├── constants.ts   # Feature-specific constants
│   └── index.ts       # Public API for the feature
```

## Component Organization

### Component Structure

Components should be organized as follows:

```
components/
├── component-name/
│   ├── ComponentName.tsx        # Component implementation
│   ├── ComponentName.module.css # Component styles
│   ├── ComponentName.test.tsx   # Component tests
│   ├── ComponentName.stories.tsx # Component stories
│   └── index.ts                 # Re-export the component
```

### Component Implementation

Components should follow this structure:

```tsx
// Import statements
import React from 'react';
import styles from './ComponentName.module.css';

// Types
interface ComponentNameProps {
  // Props definition
}

// Component implementation
export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props
}) => {
  // Hooks

  // Event handlers

  // Render helpers

  // Component render
  return (
    // JSX
  );
};

// Default export
export default ComponentName;
```

## Code Organization Within Files

### Import Order

Imports should be organized in the following order:

1. React and Next.js imports
2. Third-party library imports
3. Absolute imports from the project
4. Relative imports from the same feature
5. Style imports

Example:

```tsx
// React and Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Third-party library imports
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Absolute imports from the project
import { Button } from '@/components/ui';
import { useAuth } from '@/features/auth';

// Relative imports from the same feature
import { useFeatureContext } from '../context';
import { FeatureItem } from './FeatureItem';

// Style imports
import styles from './FeatureName.module.css';
```

### Code Order Within Components

The code within a component should be organized in the following order:

1. State declarations
2. Context hooks
3. Other hooks
4. Effect hooks
5. Event handlers
6. Render helpers
7. Return statement

Example:

```tsx
const MyComponent = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state1, setState1] = useState(initialState1);
  const [state2, setState2] = useState(initialState2);

  // 2. Context hooks
  const { contextValue1, contextValue2 } = useMyContext();

  // 3. Other hooks
  const result = useMyCustomHook();

  // 4. Effect hooks
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 6. Render helpers
  const renderItem = item => {
    return <div>{item.name}</div>;
  };

  // 7. Return statement
  return <div>{/* JSX */}</div>;
};
```

## Type Definitions

### Type Organization

Types should be organized as follows:

1. Interface definitions
2. Type alias definitions
3. Enum definitions
4. Constant type definitions

Example:

```tsx
// Interface definitions
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

// Type alias definitions
type UserRole = 'admin' | 'user' | 'guest';
type UserId = string;

// Enum definitions
enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

// Constant type definitions
const USER_TYPES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
```

## CSS Organization

### CSS Module Structure

CSS modules should be organized as follows:

1. Component-specific variables
2. Base component styles
3. Variant styles
4. State styles
5. Media queries

Example:

```css
/* 1. Component-specific variables */
.component {
  --component-padding: 1rem;
  --component-border-radius: 0.5rem;
}

/* 2. Base component styles */
.component {
  padding: var(--component-padding);
  border-radius: var(--component-border-radius);
  background-color: white;
}

/* 3. Variant styles */
.primary {
  background-color: var(--primary-color);
  color: white;
}

.secondary {
  background-color: var(--secondary-color);
  color: black;
}

/* 4. State styles */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  cursor: wait;
}

/* 5. Media queries */
@media (max-width: 768px) {
  .component {
    padding: calc(var(--component-padding) / 2);
  }
}
```

## Best Practices

### Code Splitting

- Use dynamic imports for route-based code splitting
- Use React.lazy and Suspense for component-level code splitting
- Split large third-party dependencies

### Performance Optimization

- Use React.memo for pure components
- Use useMemo and useCallback for expensive computations and callbacks
- Implement virtualization for long lists
- Optimize images and assets

### Error Handling

- Implement error boundaries for component-level error handling
- Use try/catch blocks for async operations
- Provide meaningful error messages and fallback UI

### Accessibility

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works correctly
- Test with screen readers

## Documentation

### Code Comments

- Use JSDoc comments for functions, components, and types
- Document complex logic and algorithms
- Explain non-obvious code

### README Files

- Create README files for each feature explaining its purpose and usage
- Document API endpoints and data structures
- Provide usage examples

### Architecture Decision Records (ADRs)

- Document major design decisions
- Explain the context, decision, and consequences
- Keep ADRs in the docs/architecture directory
