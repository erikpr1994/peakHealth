# PeakHealth UI

A comprehensive design system and UI component library for the PeakHealth platform.

## 🚀 Features

- **Tree-shakable imports** - Import only what you need
- **TypeScript support** - Full type safety and IntelliSense
- **CSS Modules** - Scoped styling with CSS custom properties
- **Storybook integration** - Interactive component documentation
- **Dynamic build system** - Automatically handles new components

## 📦 Installation

```bash
pnpm add @peakhealth/ui
```

## 🎯 Usage

### Tree-shakable imports (Recommended)

```tsx
import { Button } from '@peakhealth/ui/button';
// CSS is automatically included with the component

// Or import multiple components
import { Button, Input } from '@peakhealth/ui';
// CSS is automatically included with each component
```

### Bundle import

```tsx
import { Button, Input } from '@peakhealth/ui';
// CSS is automatically included with each component
```

## 🧩 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@peakhealth/ui/button';

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

## 🎨 Design System

### CSS Custom Properties

The design system uses CSS custom properties for consistent theming:

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220 9% 46%;
  --secondary: 220 14% 96%;
  --secondary-foreground: 220 9% 46%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 8% 46%;
  --accent: 220 14% 96%;
  --accent-foreground: 220 9% 46%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 220 9% 46%;
  --background: 0 0% 100%;
  --foreground: 220 9% 46%;
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Start Storybook
pnpm storybook

# Type checking
pnpm type-check
```

### Adding New Components

1. Create component directory: `src/components/component-name/`
2. Add component files:
   - `component-name.tsx` - Component implementation
   - `component-name.css` - Component styles
   - `index.ts` - Component exports
   - `ComponentName.stories.ts` - Storybook stories (co-located)
3. Update `src/index.ts` to export the component
4. Run `pnpm build` - exports are generated automatically

### Build System

The build system automatically:

- Discovers all components in `src/components/`
- Generates TypeScript declarations
- Creates tree-shakable exports
- Copies CSS files to the correct locations
- Builds with Vite for optimal performance

## 📚 Storybook

Storybook provides interactive documentation for all components:

```bash
pnpm storybook
```

Visit `http://localhost:6006` to explore:

- Component variants and states
- Interactive controls
- Usage examples
- Design tokens

**Note:** Stories are co-located with their components in `src/components/component-name/ComponentName.stories.ts` for better organization.

## 🏗️ Architecture

```
packages/ui/
├── src/
│   ├── components/          # Component implementations
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.css
│   │   │   ├── Button.stories.ts
│   │   │   └── index.ts
│   │   └── input/
│   │       ├── input.tsx
│   │       ├── input.css
│   │       ├── Input.stories.ts
│   │       └── index.ts
│   ├── utils.ts           # Shared utilities
│   └── index.ts           # Main exports
├── dist/                  # Built output
├── .storybook/           # Storybook configuration
└── scripts/              # Build scripts
```

## 🤝 Contributing

1. Create a feature branch
2. Add your component following the structure above
3. Write comprehensive stories
4. Update this README if needed
5. Submit a pull request

## 📄 License

MIT - see LICENSE file for details
