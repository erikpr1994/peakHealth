# PeakHealth UI

A comprehensive design system and UI component library for the PeakHealth platform.

## 🚀 Features

- **Tree-shakable imports** - Import only what you need
- **TypeScript support** - Full type safety and IntelliSense
- **CSS Modules** - Scoped styling with CSS custom properties
- **Storybook integration** - Interactive component documentation
- **Dynamic build system** - Automatically handles new components
- **Co-located CSS** - Each component includes its own styles
- **Convenience imports** - Components automatically include their CSS

## 📦 Installation

```bash
pnpm add @peakhealth/ui
```

## 🎯 Usage

### Convenience imports (Recommended)

Components automatically include their own CSS - no separate CSS imports needed!

```tsx
import { Button } from '@peakhealth/ui/button';
// CSS is automatically included - no need for separate CSS import!

// Or import multiple components
import { Button, Input, Toast } from '@peakhealth/ui';
// All components include their own CSS automatically
```

### CSS Import Options

#### Option 1: Convenience imports (Recommended)

```tsx
// Components automatically include their own CSS
import { Button } from '@peakhealth/ui/button';
import { Input } from '@peakhealth/ui/input';
// No additional CSS imports needed!
```

#### Option 2: Import all styles at once

```tsx
// Import all component styles at once
import '@peakhealth/ui/styles';
```

#### Option 3: Import design system only

```tsx
// Import only the design system CSS variables
import '@peakhealth/ui/design-system';
```

#### Option 4: Manual CSS imports (Legacy)

```tsx
// If you prefer explicit control over CSS loading
import { Button } from '@peakhealth/ui/button';
import '@peakhealth/ui/button.css';
```

## 🧩 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@peakhealth/ui/button';
// CSS is automatically included!

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// States
<Button disabled>Disabled</Button>
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

### Input

A flexible input component with validation states.

```tsx
import { Input } from '@peakhealth/ui/input';
// CSS is automatically included!

// Basic usage
<Input placeholder="Enter text..." />

// Types
<Input type="email" placeholder="Enter email..." />
<Input type="password" placeholder="Enter password..." />
<Input type="number" placeholder="Enter number..." />

// States
<Input variant="error" placeholder="Error state" />
<Input disabled placeholder="Disabled" />
```

### Modal

A reusable modal component with backdrop blur and accessibility features.

```tsx
import { Modal } from '@peakhealth/ui/modal';
// CSS is automatically included!

// Basic usage
<Modal isOpen={isOpen} onClose={handleClose}>
  <p>Modal content goes here</p>
</Modal>

// With title
<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
  <p>Modal content goes here</p>
</Modal>

// Without close button
<Modal isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
  <p>Modal without close button</p>
</Modal>

// Custom styling
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  className="custom-modal"
  contentClassName="custom-content"
>
  <p>Custom styled modal</p>
</Modal>
```

**Features:**

- Blurry backdrop with backdrop-filter
- Fixed dimensions (90vw × 90vh)
- Body scroll prevention
- Escape key support
- Click outside to close
- Accessible close button
- Responsive design
- Customizable styling

### Toast

A flexible toast notification component with multiple variants.

```tsx
import { Toast, ToastProvider, useToast } from '@peakhealth/ui/toast';
// CSS is automatically included!

// Wrap your app with ToastProvider
<ToastProvider>
  <App />
</ToastProvider>;

// Use the hook to show toasts
const { showToast } = useToast();
showToast({ message: 'Success!', variant: 'success' });

// Or use the standalone component
<Toast variant="success">Success message</Toast>;
```

**Features:**

- Multiple variants: default, success, error, warning, info
- Auto-dismiss with configurable duration
- Manual close button option
- Responsive design with mobile optimization
- Dark theme support
- Accessibility features (ARIA labels, keyboard navigation)

### Tooltip

A flexible tooltip component with multiple positions.

```tsx
import { Tooltip } from '@peakhealth/ui/tooltip';
// CSS is automatically included!

// Basic usage
<Tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</Tooltip>

// With custom position
<Tooltip content="Tooltip on the right" position="right">
  <button>Hover me</button>
</Tooltip>

// Available positions: top, bottom, left, right
```

**Features:**

- Multiple positions: top, bottom, left, right
- Smooth animations
- Responsive design
- Accessibility support
- Customizable styling

## 🏗️ Build System

- **Vite-based build** - Fast and efficient bundling
- **TypeScript compilation** - Full type safety
- **CSS processing** - Scoped styles with CSS custom properties
- **Tree-shaking** - Only include what you use
- **Co-located assets** - CSS files alongside components
- **Automatic CSS inclusion** - Components include their own styles

## 📁 Architecture

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx      # Component with auto CSS import
│   │   │   └── button.css      # Component styles
│   │   ├── input/
│   │   │   ├── input.tsx       # Component with auto CSS import
│   │   │   └── input.css       # Component styles
│   │   └── ...
│   ├── design-system.css       # Global design tokens
│   └── index.ts                # Main exports
├── dist/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.js       # Built component
│   │   │   └── button.css      # Co-located styles
│   │   └── ...
│   ├── design-system.css       # Global styles
│   └── ui.css                  # All styles bundle
└── package.json                # Exports configuration
```

## 🎨 Design System

The design system is built on CSS custom properties for easy theming:

```css
:root {
  /* Colors */
  --peakhealth-primary: #000000;
  --peakhealth-secondary: #6b7280;
  --peakhealth-success: #10b981;
  --peakhealth-error: #ef4444;
  --peakhealth-warning: #f59e0b;
  --peakhealth-info: #3b82f6;

  /* Typography */
  --peakhealth-font-family: system-ui, -apple-system, sans-serif;
  --peakhealth-font-size-sm: 0.875rem;
  --peakhealth-font-size-base: 1rem;
  --peakhealth-font-size-lg: 1.125rem;

  /* Spacing */
  --peakhealth-spacing-1: 0.25rem;
  --peakhealth-spacing-2: 0.5rem;
  --peakhealth-spacing-3: 0.75rem;
  --peakhealth-spacing-4: 1rem;

  /* Border radius */
  --peakhealth-radius-sm: 0.25rem;
  --peakhealth-radius-md: 0.375rem;
  --peakhealth-radius-lg: 0.5rem;
}
```

## 🔧 Development

### Building the package

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Generate exports
pnpm generate-exports
```

### Adding new components

1. Create component directory: `src/components/component-name/`
2. Add component file: `component-name.tsx`
3. Add styles file: `component-name.css`
4. Import CSS in component: `import './component-name.css';`
5. Export from `src/index.ts`
6. Run `pnpm generate-exports` to update exports

The build system will automatically:

- Copy CSS files to be co-located with components
- Generate TypeScript declarations
- Update package exports
- Ensure components include their own CSS

## 📚 Storybook

Interactive component documentation and testing:

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 🤝 Contributing

1. Follow the component structure pattern
2. Include CSS imports in components for convenience
3. Use CSS custom properties for theming
4. Add comprehensive TypeScript types
5. Include accessibility features
6. Test in Storybook before submitting

## 📄 License

MIT License - see LICENSE file for details.
