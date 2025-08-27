# Routine Selectors

**File Path**: `apps/web/src/features/routines/utils/routine-selectors.ts`

## 1. Summary

This file contains a collection of pure, memoized utility functions for querying and selecting specific slices of data from the main `RoutineBuilder` state object. These selectors are the core logic used by our "Selector Hooks" (`useExercise`, `useSection`, etc.).

Separating this logic from the hooks and components makes it highly testable, reusable, and easy to optimize.

## 2. Core Functions

These functions are designed to safely traverse the nested state object.

### `findWorkoutById(state, workoutId)`
-   **Purpose**: Finds a specific workout within the `state.workouts` array.
-   **Returns**: The workout object or `undefined`.

### `findSectionById(state, workoutId, sectionId)`
-   **Purpose**: Finds a specific section within a given workout.
-   **Returns**: The section object or `undefined`.

### `findExerciseById(state, workoutId, sectionId, exerciseId)`
-   **Purpose**: Finds a specific exercise within a given section.
-   **Returns**: The exercise object or `undefined`.

## 3. Example Usage (in a Selector Hook)

```typescript
// features/routines/hooks/useExercise.ts
import { useMemo } from 'react';
import { useRoutineBuilderContext } from './use-routine-builder';
import { findExerciseById } from '../utils/routine-selectors';

export function useExercise(workoutId, sectionId, exerciseId) {
  const { state } = useRoutineBuilderContext();

  const exercise = useMemo(() => {
    // The component-facing hook uses the pure selector function.
    return findExerciseById(state, workoutId, sectionId, exerciseId);
  }, [state, workoutId, sectionId, exerciseId]);

  // ... rest of the hook
}
```
