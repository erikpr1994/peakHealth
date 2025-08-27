# Shared Component: ExerciseLibraryModal

This modal provides a rich interface for users to browse, search, and select exercises from the main library to add to their workout routine.

## 1. Responsibilities

-   Display a paginated list or grid of all available exercises.
-   Provide robust searching and filtering capabilities.
-   Allow the user to select one or more exercises.
-   Return the selected exercise(s) to the parent component (the `useRoutineBuilder` hook).

## 2. Filtering Logic

The modal's filtering capabilities will be key to providing a guided experience.

### A. `initialFilter` Prop

The modal will accept an `initialFilter` prop to determine its default view.

```typescript
interface ExerciseLibraryModalProps {
  onSelect: (selectedExercises: Exercise[]) => void;
  initialFilter?: {
    category?: 'Warm-up' | 'Mobility' | 'Strength' | 'Cardio';
    muscleGroup?: 'Chest' | 'Back' | 'Legs';
    // ... other filterable properties
  };
}
```
-   **Functionality**: When the modal opens, it will automatically apply the `initialFilter`. For example, if `initialFilter.category` is `'Warm-up'`, only warm-up exercises will be shown initially. The user can then clear this filter to see all exercises.

### B. User-Facing Filters

The modal will also have a standard set of UI controls for the user to refine their search:
-   `SearchInput`
-   `CategoryTabs` (Strength, Cardio, Flexibility, etc.)
-   `MuscleGroupFilter` (Dropdown or multi-select)

## 3. User Interaction Flow

1.  User clicks an "Add Exercise" button within a specific section (e.g., the Warm-up section).
2.  The `ExerciseLibraryModal` is opened, receiving an `initialFilter` prop (e.g., `{ category: 'Warm-up' }`).
3.  The modal automatically filters the exercise list based on the prop.
4.  The user can further refine the search or select one or more exercises.
5.  Upon confirming their selection, the `onSelect` callback is fired, returning the chosen exercises. The modal closes.
6.  The `useRoutineBuilder` hook receives the exercises and dispatches an action to add them to the correct section in its state.
