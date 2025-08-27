# Shared Hook: `useRoutineFilters`

This hook encapsulates all the state management and logic required for filtering and sorting a list of routines. It is designed to be used by any page that features the `RoutineFilterControls` component, such as the Dashboard and the Explore page.

## 1. Arguments

```typescript
interface RoutineFiltersInitialState {
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  goal?: 'Strength' | 'Hypertrophy' | 'Endurance';
  // ... any other filterable properties
}

function useRoutineFilters(
  initialState?: RoutineFiltersInitialState
): UseRoutineFiltersReturn {
  // ...
}
```
-   **`initialState` (optional)**: An object that can be used to set the default state of the filters. This is useful for pre-filtering the list based on URL search parameters.

## 2. Responsibilities

-   Initializes its state, overriding defaults with any values provided in the `initialState` object.
-   Manages the state for all filter inputs:
    -   Search query (text input)
    -   Difficulty level (dropdown)
    -   Goal (dropdown)
    -   Favorites (toggle)
    -   View mode (grid/list toggle)
-   Provides handler functions to update each of these state variables.
-   Optionally, it could contain logic to memoize the final filtered list of routines if the raw routine list is passed into it.

## 2. Returned API

The hook will return an object with a clean, easy-to-use API for the consuming component.

```typescript
interface UseRoutineFiltersReturn {
  // State Values
  searchQuery: string;
  filters: {
    level: 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'All' | 'Strength' | 'Hypertrophy' | 'Endurance';
    favoritesOnly: boolean;
  };
  viewMode: 'grid' | 'list';

  // State Setters / Handlers
  setSearchQuery: (query: string) => void;
  handleFilterChange: (filterName: 'level' | 'goal', value: string) => void;
  toggleFavorites: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;

  // Optional: The filtered data
  // filteredRoutines: Routine[];
}
```

## 3. Usage Example

A parent hook (like `useRoutinesDashboard`) would use this hook to manage the filtering part of its state.

```typescript
// Example inside useRoutinesDashboard.ts
import { useRoutineFilters } from './useRoutineFilters';
import { useRoutinesQuery } from './useRoutinesQuery';

export const useRoutinesDashboard = () => {
  const { routines } = useRoutinesQuery(); // Fetches all routines
  const { filteredRoutines, ...filterControls } = useRoutineFilters(routines);

  return {
    routines: filteredRoutines,
    filters: filterControls,
    // ... other dashboard-specific logic
  };
};
```
