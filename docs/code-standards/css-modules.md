# PeakHealth CSS Modules Standards

This document outlines the standard patterns for using CSS Modules in the PeakHealth codebase. Following these standards ensures consistency and improves code readability and maintainability.

## CSS Modules Overview

CSS Modules are a way to scope CSS to a specific component, preventing style leakage and naming conflicts. In PeakHealth, we use CSS Modules for component styling to ensure encapsulation and maintainability.

## File Naming Conventions

- CSS Module files should be named after the component they style
- Use `.module.css` extension for CSS Module files
- Follow the same casing as the component file (PascalCase)

Example:

```
Button.tsx
Button.module.css
```

## Class Naming Conventions

### Base Component Class

- Use the component name in camelCase as the base class name
- For compound components, use the parent component name as a prefix

Example:

```css
/* Button.module.css */
.button {
  /* Base button styles */
}

/* Dropdown.module.css */
.dropdown {
  /* Base dropdown styles */
}
.dropdownItem {
  /* Dropdown item styles */
}
```

### Variant Classes

- Use descriptive names for variant classes
- Avoid abbreviations unless they are widely understood

Example:

```css
/* Button.module.css */
.primary {
  /* Primary button styles */
}
.secondary {
  /* Secondary button styles */
}
.large {
  /* Large button styles */
}
.small {
  /* Small button styles */
}
```

### State Classes

- Use descriptive names for state classes
- Prefer positive naming over negative (e.g., `isActive` instead of `notActive`)

Example:

```css
/* Button.module.css */
.isDisabled {
  /* Disabled button styles */
}
.isActive {
  /* Active button styles */
}
.isLoading {
  /* Loading button styles */
}
```

## CSS Organization

### Order of Properties

Properties should be organized in the following order:

1. Positioning properties (`position`, `top`, `right`, `bottom`, `left`, `z-index`)
2. Box model properties (`display`, `width`, `height`, `margin`, `padding`, `border`)
3. Typography properties (`font-family`, `font-size`, `line-height`, `text-align`)
4. Visual properties (`color`, `background`, `box-shadow`, `opacity`)
5. Animation properties (`transition`, `animation`)
6. Miscellaneous properties (`cursor`, `pointer-events`)

Example:

```css
.button {
  /* Positioning */
  position: relative;
  z-index: 1;

  /* Box model */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 40px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 4px;

  /* Typography */
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;

  /* Visual */
  color: white;
  background-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Animation */
  transition: all 0.2s ease;

  /* Miscellaneous */
  cursor: pointer;
  user-select: none;
}
```

### Nesting

- Avoid deep nesting (more than 3 levels)
- Use nesting for state and pseudo-classes
- Use nesting for child components that are tightly coupled with the parent

Example:

```css
.button {
  /* Base button styles */

  &:hover {
    /* Hover styles */
  }

  &:focus {
    /* Focus styles */
  }

  &.isDisabled {
    /* Disabled styles */
  }
}

.buttonIcon {
  /* Button icon styles */

  .button:hover & {
    /* Button icon styles when button is hovered */
  }
}
```

## Using CSS Modules in React Components

### Importing CSS Modules

Import CSS Modules at the top of the component file, after other imports:

```tsx
import React from 'react';
import styles from './Button.module.css';
```

### Applying Classes

Use the imported `styles` object to apply classes:

```tsx
const Button = ({
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button className={buttonClasses} {...props} />;
};
```

### Using with Class Utilities

When using a class utility like `clsx` or `classnames`:

```tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({
  variant = 'primary',
  size = 'medium',
  isDisabled,
  className,
  ...props
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    isDisabled && styles.isDisabled,
    className
  );

  return <button className={buttonClasses} disabled={isDisabled} {...props} />;
};
```

## CSS Variables

### Global CSS Variables

Global CSS variables should be defined in a central location (e.g., `design-system.css`) and imported globally:

```css
/* design-system.css */
:root {
  --primary-color: #0070f3;
  --secondary-color: #f5f5f5;
  --font-family: 'Inter', sans-serif;
  --border-radius: 4px;
}
```

### Component-Specific CSS Variables

Component-specific CSS variables should be defined within the component's CSS Module:

```css
/* Button.module.css */
.button {
  --button-height: 40px;
  --button-padding: 0 16px;

  height: var(--button-height);
  padding: var(--button-padding);
}

.small {
  --button-height: 32px;
  --button-padding: 0 12px;
}

.large {
  --button-height: 48px;
  --button-padding: 0 24px;
}
```

## Responsive Design

### Media Queries

Media queries should be defined at the end of the CSS Module file:

```css
/* Button.module.css */
.button {
  /* Base button styles */
}

@media (max-width: 768px) {
  .button {
    /* Mobile button styles */
  }
}
```

### Responsive Variables

Use CSS variables for responsive values:

```css
/* design-system.css */
:root {
  --spacing-unit: 8px;

  @media (max-width: 768px) {
    --spacing-unit: 4px;
  }
}
```

## Best Practices

### Keep Selectors Simple

- Avoid complex selectors
- Prefer class selectors over element selectors
- Avoid using `!important`

### Reuse Common Patterns

- Create utility classes for common patterns
- Use composition over inheritance

### Performance Considerations

- Avoid expensive properties (e.g., `box-shadow`, `filter`)
- Use hardware-accelerated properties when possible (e.g., `transform`, `opacity`)
- Minimize the number of unique styles

### Accessibility

- Ensure sufficient color contrast
- Provide focus styles for interactive elements
- Test with screen readers and keyboard navigation

## Example Component with CSS Module

### Button.module.css

```css
.button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* Variants */
.primary {
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
}

.secondary {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

/* Sizes */
.small {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
}

.large {
  height: 48px;
  padding: 0 24px;
  font-size: 16px;
}

/* States */
.isDisabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Media queries */
@media (max-width: 768px) {
  .button {
    height: 36px;
    padding: 0 12px;
  }

  .large {
    height: 44px;
    padding: 0 20px;
  }

  .small {
    height: 28px;
    padding: 0 8px;
  }
}
```

### Button.tsx

```tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  className,
  children,
  ...props
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    isDisabled && styles.isDisabled,
    className
  );

  return (
    <button className={buttonClasses} disabled={isDisabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
```
