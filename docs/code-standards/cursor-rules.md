# PeakHealth Cursor Rules

This document outlines the standard cursor behavior rules for the PeakHealth application. Consistent cursor behavior improves user experience by providing clear visual feedback about interactive elements.

## General Cursor Rules

### Interactive Elements

- **Buttons**: Use `cursor: pointer` for all button elements
  - Primary buttons
  - Secondary buttons
  - Tertiary buttons
  - Icon buttons
  - Toggle buttons

- **Links**: Use `cursor: pointer` for all link elements
  - Text links
  - Navigation links
  - Breadcrumb links
  - Card links
  - Icon links

- **Form Controls**: Use appropriate cursors for form elements:
  - Text inputs: `cursor: text`
  - Checkboxes and radio buttons: `cursor: pointer`
  - Select dropdowns: `cursor: pointer`
  - Range sliders: `cursor: grab` (when not active), `cursor: grabbing` (when active)
  - File inputs: `cursor: pointer`
  - Date pickers: `cursor: pointer`
  - Color pickers: `cursor: pointer`

- **Interactive Cards**: Use `cursor: pointer` for interactive cards
  - Clickable cards
  - Expandable cards
  - Selectable cards

- **Tabs**: Use `cursor: pointer` for tab elements

- **Accordion Headers**: Use `cursor: pointer` for accordion headers

- **Dropdown Triggers**: Use `cursor: pointer` for dropdown triggers

- **Menu Items**: Use `cursor: pointer` for menu items

- **Tooltips Triggers**: Use `cursor: help` for tooltip triggers

- **Draggable Elements**: Use `cursor: grab` (when not active), `cursor: grabbing` (when active)
  - Draggable cards
  - Draggable list items
  - Resizable elements

- **Resizable Elements**: Use `cursor: ew-resize` (east-west), `cursor: ns-resize` (north-south), or `cursor: nwse-resize` (diagonal) for resizable elements
  - Resizable panels
  - Resizable columns
  - Resizable images

### Non-Interactive Elements

- **Text Content**: Use default cursor (`cursor: auto`)
  - Paragraphs
  - Headings
  - Labels
  - Static text

- **Images** (non-clickable): Use default cursor (`cursor: auto`)

- **Containers**: Use default cursor (`cursor: auto`)
  - Sections
  - Divs
  - Panels
  - Cards (non-interactive)

- **Disabled Elements**: Use `cursor: not-allowed` for disabled interactive elements
  - Disabled buttons
  - Disabled inputs
  - Disabled links
  - Disabled menu items
  - Disabled tabs

### Loading States

- **Loading Elements**: Use `cursor: wait` or `cursor: progress` for elements in a loading state
  - Loading buttons
  - Loading pages
  - Loading sections

- **Processing Buttons**: Use `cursor: progress` for buttons that are processing an action
  - Submit buttons during form submission
  - Save buttons during save operation
  - Delete buttons during delete operation

### Selection States

- **Selectable Text**: Use `cursor: text` for selectable text
  - Paragraphs
  - Input fields
  - Textarea fields
  - Code blocks

- **Selectable Items**: Use `cursor: pointer` for selectable items
  - Checkboxes
  - Radio buttons
  - List items in a selection list
  - Chips/tags

## Hover States

Interactive elements should provide visual feedback on hover in addition to cursor changes:

- **Color Changes**: Change background or text color on hover
- **Subtle Animations**: Add subtle animations on hover (scale, fade, etc.)
- **Shadow Effects**: Add or modify shadow effects on hover
- **Border Changes**: Change border color or width on hover
- **Underline Effects**: Add or animate underlines for links on hover

## Specific Component Cursor Rules

### Buttons

```css
.button {
  cursor: pointer;
}

.button:disabled {
  cursor: not-allowed;
}

.button--loading {
  cursor: progress;
}
```

### Links

```css
.link {
  cursor: pointer;
}

.link:disabled,
.link--disabled {
  cursor: not-allowed;
}

.link--external::after {
  content: "↗";
  display: inline-block;
  margin-left: 0.25rem;
}
```

### Form Inputs

```css
.input,
.textarea {
  cursor: text;
}

.input:disabled,
.textarea:disabled {
  cursor: not-allowed;
}

.checkbox,
.radio,
.select {
  cursor: pointer;
}

.checkbox:disabled,
.radio:disabled,
.select:disabled {
  cursor: not-allowed;
}

.range {
  cursor: grab;
}

.range:active {
  cursor: grabbing;
}

.range:disabled {
  cursor: not-allowed;
}
```

### Cards

```css
.card--interactive {
  cursor: pointer;
}

.card--draggable {
  cursor: grab;
}

.card--draggable:active {
  cursor: grabbing;
}
```

### Tabs

```css
.tab {
  cursor: pointer;
}

.tab--active {
  cursor: default;
}

.tab:disabled {
  cursor: not-allowed;
}
```

### Tooltips

```css
.tooltip-trigger {
  cursor: help;
}
```

### Draggable Elements

```css
.draggable {
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}

.draggable:disabled {
  cursor: not-allowed;
}
```

### Resizable Elements

```css
.resizable-horizontal {
  cursor: ew-resize;
}

.resizable-vertical {
  cursor: ns-resize;
}

.resizable-corner {
  cursor: nwse-resize;
}
```

## Implementation Guidelines

### CSS Implementation

```css
/* Primary Button Example */
.button {
  /* Other styles */
  cursor: pointer;
}

.button:disabled {
  /* Other disabled styles */
  cursor: not-allowed;
}

.button--loading {
  /* Other loading styles */
  cursor: progress;
}

/* Text Input Example */
.input {
  /* Other styles */
  cursor: text;
}

.input:disabled {
  /* Other disabled styles */
  cursor: not-allowed;
}

/* Draggable Element Example */
.draggable {
  /* Other styles */
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}

.draggable:disabled {
  cursor: not-allowed;
}
```

### React Component Implementation

```tsx
// Button component example
const Button = ({ disabled, isLoading, children, ...props }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''} ${isLoading ? 'button--loading' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

// Draggable component example
const DraggableItem = ({ children, disabled, ...props }) => {
  return (
    <div
      className={`draggable ${disabled ? 'draggable--disabled' : ''}`}
      draggable={!disabled}
      {...props}
    >
      {children}
    </div>
  );
};

// Tooltip component example
const Tooltip = ({ content, children }) => {
  return (
    <div className="tooltip">
      <div className="tooltip-trigger" aria-describedby="tooltip">
        {children}
      </div>
      <div className="tooltip-content" id="tooltip" role="tooltip">
        {content}
      </div>
    </div>
  );
};
```

## Accessibility Considerations

- Ensure that elements with `cursor: pointer` are actually interactive and can be activated via keyboard
  - Add appropriate keyboard event handlers (e.g., `onKeyDown`, `onKeyUp`)
  - Ensure proper focus management
  - Implement keyboard shortcuts where appropriate

- Use ARIA attributes appropriately to indicate the state and role of interactive elements
  - `aria-disabled`: Indicate that an element is disabled
  - `aria-busy`: Indicate that an element is loading
  - `aria-grabbed`: Indicate that an element is being dragged
  - `aria-haspopup`: Indicate that an element has a popup

- Test cursor behavior with screen readers and keyboard navigation to ensure accessibility
  - VoiceOver (macOS)
  - NVDA (Windows)
  - JAWS (Windows)
  - TalkBack (Android)
  - VoiceOver (iOS)

- Ensure sufficient color contrast for all interactive elements
  - Use a contrast ratio of at least 4.5:1 for normal text
  - Use a contrast ratio of at least 3:1 for large text
  - Use a contrast ratio of at least 3:1 for UI components and graphical objects

## Browser Compatibility

All modern browsers support the cursor properties outlined in this document. For older browsers, ensure that fallbacks are in place and that the application remains functional even if cursor styles are not applied.

| Cursor Value | Chrome | Firefox | Safari | Edge | IE |
|--------------|--------|---------|--------|------|-----|
| `auto` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `default` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `pointer` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `text` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `wait` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `progress` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `not-allowed` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `grab` | ✅ | ✅ | ✅ | ✅ | ❌ |
| `grabbing` | ✅ | ✅ | ✅ | ✅ | ❌ |
| `help` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ew-resize` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ns-resize` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `nwse-resize` | ✅ | ✅ | ✅ | ✅ | ✅ |

## Custom Cursors

Custom cursors should be used sparingly and only when they significantly enhance the user experience:

- Keep custom cursors simple and recognizable
- Ensure they are appropriately sized (32x32 pixels maximum)
- Provide fallbacks for browsers that don't support custom cursors
- Test custom cursors across different devices and screen resolutions

```css
/* Custom cursor example */
.custom-element {
  cursor: url('path/to/custom-cursor.png'), auto;
}
```

### Custom Cursor Use Cases

- **Drawing Tools**: Use custom cursors for drawing tools (pen, brush, eraser, etc.)
- **Games**: Use custom cursors for game elements (crosshair, sword, etc.)
- **Special Interactions**: Use custom cursors for special interactions (magnifying glass, eyedropper, etc.)

## Testing Cursor Behavior

- Test cursor behavior across different browsers and devices
- Test cursor behavior with different input devices (mouse, trackpad, touch)
- Test cursor behavior with keyboard navigation
- Test cursor behavior with screen readers
- Test cursor behavior with high contrast mode

## Common Cursor Issues and Solutions

### Issue: Cursor not changing on hover

**Solution**: Ensure that the element has the correct cursor property and that it's not being overridden by a more specific CSS rule.

```css
/* Check for specificity issues */
.button {
  cursor: pointer !important; /* Use with caution */
}
```

### Issue: Cursor changing but element not interactive

**Solution**: Ensure that the element has appropriate event handlers and ARIA attributes.

```tsx
// Add appropriate event handlers
<div
  className="interactive-element"
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  role="button"
  tabIndex={0}
  aria-pressed={isPressed}
>
  Click me
</div>
```

### Issue: Custom cursor not showing

**Solution**: Ensure that the custom cursor file path is correct and that the file exists.

```css
/* Use absolute path */
.custom-element {
  cursor: url('/path/to/custom-cursor.png'), auto;
}
```

### Issue: Cursor flickering on hover

**Solution**: Ensure that there are no conflicting hover states or animations.

```css
/* Simplify hover state */
.element {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.element:hover {
  background-color: #f0f0f0;
}
```

## Best Practices Summary

- Use appropriate cursors for interactive elements
- Ensure consistency across similar elements
- Provide visual feedback on hover
- Ensure accessibility for keyboard and screen reader users
- Test cursor behavior across different browsers and devices
- Use custom cursors sparingly and only when they enhance the user experience
- Document cursor behavior for developers

