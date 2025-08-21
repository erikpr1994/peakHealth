# Peak Health UI Library

A standardized UI component library for Peak Health applications.

## Features

- Native HTML components with CSS styling
- Consistent design system with CSS variables
- Accessible components following best practices
- TypeScript support with comprehensive type definitions
- Storybook documentation for all components

## Installation

```bash
# From the root of the monorepo
npm install
```

## Usage

Import components from the UI library:

```tsx
import { Button, Input, Card } from '@peakhealth/ui';

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>My Form</Card.Title>
        <Card.Description>Fill out the form below</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Enter your name" />
      </Card.Content>
      <Card.Footer>
        <Button>Submit</Button>
      </Card.Footer>
    </Card>
  );
}
```

## Available Components

### Form Components

- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Select` - Dropdown select field
- `Checkbox` - Checkbox input
- `Radio` - Radio button input
- `Label` - Form label

### Layout Components

- `Card` - Container with header, content, and footer sections

### Feedback Components

- `Badge` - Status indicator

### Action Components

- `Button` - Action button with multiple variants

## Design System

The UI library uses CSS variables for consistent theming across components. These variables are defined in `src/design-system.css`.

## Development

### Running Storybook

```bash
# From the root of the monorepo
npm run storybook
```

### Adding New Components

1. Create a new directory in `src/components/[component-name]`
2. Create the following files:
   - `[component-name].tsx` - Component implementation
   - `[component-name].css` - Component styles
   - `index.ts` - Export file
   - `[ComponentName].stories.ts` - Storybook documentation
3. Export the component from `src/index.ts`

### Component Structure

Each component should follow this structure:

```tsx
import * as React from 'react';
import './component-name.css';
import { cn } from '../../utils';

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Component-specific props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn('peakhealth-component', className)}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';

export { Component };
```

## CSS Guidelines

- Use the `.peakhealth-` prefix for all CSS classes
- Use CSS variables for colors, spacing, etc.
- Follow BEM naming convention for component variants and states

