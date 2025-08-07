# Peak Health Design System

A comprehensive design system for Peak Health applications, providing consistent, accessible, and reusable UI components.

## 🎨 Design Philosophy

- **Consistency**: All components follow the same design principles and patterns
- **Accessibility**: Built with accessibility in mind, following WCAG guidelines
- **Flexibility**: Components are highly customizable while maintaining design consistency
- **Performance**: Lightweight and optimized for production use
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## 📦 Installation

```bash
pnpm add @peakhealth/ui
```

## 🚀 Usage

```tsx
import { Button } from '@peakhealth/ui';

function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

## 🧩 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@peakhealth/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// With asChild for rendering as different elements
<Button asChild variant="primary">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

## 🎨 Theming

The design system uses CSS custom properties for theming. Define these in your global CSS:

```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
}
```

## 🔧 Development

### Adding New Components

1. Create a new folder in `src/components/`
2. Add the component file (e.g., `input.tsx`)
3. Add the CSS file (e.g., `input.css`)
4. Create an `index.ts` file to export the component
5. Update the main `src/index.ts` to export the new component

### Component Structure

```
src/components/
├── button/
│   ├── button.tsx
│   ├── button.css
│   └── index.ts
├── input/
│   ├── input.tsx
│   ├── input.css
│   └── index.ts
└── ...
```

## 📋 Roadmap

- [ ] Input component
- [ ] Card component
- [ ] Badge component
- [ ] Dialog component
- [ ] Select component
- [ ] Textarea component
- [ ] Checkbox component
- [ ] Radio component
- [ ] Switch component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Alert component
- [ ] Toast component
- [ ] Tooltip component
- [ ] Popover component
- [ ] Dropdown component
- [ ] Modal component
- [ ] Sheet component
- [ ] Separator component
- [ ] Avatar component
- [ ] Progress component
- [ ] Slider component
- [ ] Calendar component
- [ ] Date picker component
- [ ] Time picker component
- [ ] Combobox component
- [ ] Multi-select component
- [ ] Autocomplete component
- [ ] Command component
- [ ] Context menu component
- [ ] Hover card component
- [ ] Menubar component
- [ ] Navigation menu component
- [ ] Pagination component
- [ ] Resizable component
- [ ] Scroll area component
- [ ] Toggle component
- [ ] Toggle group component

## 🤝 Contributing

1. Follow the existing component patterns
2. Ensure all components are accessible
3. Add proper TypeScript types
4. Include CSS custom properties for theming
5. Test across different applications

## 📄 License

MIT License - see LICENSE file for details
