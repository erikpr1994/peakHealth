# Shared Component: RoutineFilterControls

**File Path**: `packages/ui/src/components/routines/RoutineFilterControls.tsx`

## 1. Summary

This is a shared component that provides a standardized set of UI controls for searching, filtering, and changing the view of a list of routines. It is designed to be completely controlled by a parent hook, making it highly reusable across different pages like the Dashboard and the Explore page.

## 2. Props

The component is designed to be a "dumb" component. It receives all its state and handler functions from its parent, typically via the `useRoutineFilters` hook.

```typescript
interface RoutineFilterControlsProps {
  filters: {
    searchQuery: string;
    level: string;
    goal: string;
    favoritesOnly: boolean;
  };
  viewMode: 'grid' | 'list';
  handlers: {
    setSearchQuery: (query: string) => void;
    handleFilterChange: (filterName: 'level' | 'goal', value: string) => void;
    toggleFavorites: () => void;
    setViewMode: (mode: 'grid' | 'list') => void;
  };
}
```

## 3. UI and Interaction

The component will render the following controls:

- **`SearchInput`**: A text field for `searchQuery`.
- **`FilterDropdowns`**: Two `<select>` elements for "Levels" and "Goals".
- **`FavoritesToggle`**: A switch or checkbox for `favoritesOnly`.
- **`ViewSwitcher`**: A segmented control with two options ("Grid", "List") to control the `viewMode`.

All state changes are managed by calling the appropriate handler from the `handlers` prop on user interaction (e.g., `onChange`, `onClick`).

## 4. State Management

This component is stateless. It is a pure, presentational component that reflects the state passed in via props and communicates user actions via the callback functions in the `handlers` prop.

The parent component is responsible for using the `useRoutineFilters` hook to manage the state and passing the required props to this component.
