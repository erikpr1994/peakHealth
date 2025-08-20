# PeakHealth Cursor Rules

This document outlines the standard cursor behavior rules for the PeakHealth application. Consistent cursor behavior improves user experience by providing clear visual feedback about interactive elements.

## General Cursor Rules

### Interactive Elements

- **Buttons**: Use `cursor: pointer` for all button elements
- **Links**: Use `cursor: pointer` for all link elements
- **Form Controls**: Use appropriate cursors for form elements:
  - Text inputs: `cursor: text`
  - Checkboxes and radio buttons: `cursor: pointer`
  - Select dropdowns: `cursor: pointer`
  - Range sliders: `cursor: grab` (when not active), `cursor: grabbing` (when active)
- **Draggable Elements**: Use `cursor: grab` (when not active), `cursor: grabbing` (when active)

### Non-Interactive Elements

- **Text Content**: Use default cursor (`cursor: auto`)
- **Images** (non-clickable): Use default cursor (`cursor: auto`)
- **Disabled Elements**: Use `cursor: not-allowed` for disabled interactive elements

### Loading States

- **Loading Elements**: Use `cursor: wait` or `cursor: progress` for elements in a loading state
- **Processing Buttons**: Use `cursor: progress` for buttons that are processing an action

## Hover States

Interactive elements should provide visual feedback on hover in addition to cursor changes:

- Color changes
- Subtle animations
- Shadow effects
- Scale transformations

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
```

### React Component Implementation

```tsx
// Button component example
const Button = ({ disabled, children, ...props }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Draggable component example
const DraggableItem = ({ children, ...props }) => {
  return (
    <div className="draggable" draggable={true} {...props}>
      {children}
    </div>
  );
};
```

## Accessibility Considerations

- Ensure that elements with `cursor: pointer` are actually interactive and can be activated via keyboard
- Use ARIA attributes appropriately to indicate the state and role of interactive elements
- Test cursor behavior with screen readers and keyboard navigation to ensure accessibility

## Browser Compatibility

All modern browsers support the cursor properties outlined in this document. For older browsers, ensure that fallbacks are in place and that the application remains functional even if cursor styles are not applied.

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
