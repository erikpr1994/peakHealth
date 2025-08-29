# Routine Builder Context

**File Path**: `apps/web/src/features/routines/hooks/use-routine-builder.ts`

## 1. Summary

To solve the problem of prop drilling across the deeply nested components of the Routine Builder, we will use a dedicated, feature-scoped React Context: `RoutineBuilderContext`.

This approach adheres to our architectural principle of having a single source of truth while providing a clean and efficient way for any component in the builder tree to access state and dispatch actions.

## 2. Architecture

### A. `useRoutineBuilder` Hook (The Source of Truth)

- This is the main hook, which will be called **once** at the page level (e.g., in `04-create-edit-routine.md`).
- It will use a `useReducer` to manage the entire complex state of the routine object being built.
- It is the **only place where state logic is defined**.
- It returns the current `state` and the `dispatch` function.

### B. State Mutation Utilities (The Logic)

While the `useRoutineBuilder` hook is the source of truth, the complex logic for immutably updating the nested state tree is encapsulated in a dedicated set of utility functions. This keeps the reducer clean and focused.

- **File Path**: `features/routines/utils/routine-mutations.ts` (and similar files).
- **Purpose**: Contains pure, exported functions (e.g., `addExerciseToSection`, `updateSetRepetitions`) that take the current `state` and a `payload` and return a new, updated `state`.
- **Benefits**: This isolates complex logic, making it easier to test, type, and maintain.

### C. The Reducer (The Dispatcher)

The reducer inside `useRoutineBuilder` becomes a simple "traffic cop." Its primary role is to delegate actions to the appropriate state mutation utility.

- It contains a `switch` statement that maps action types to the corresponding mutation functions.
- This keeps the reducer highly readable and free of complex, inline logic.

### D. `RoutineBuilderProvider` Component

- This is a simple wrapper component.
- The page will render this provider at the top of the component tree, wrapping the entire `<WorkoutBuilder />`.
- It takes the `state` and `dispatch` from the `useRoutineBuilder` hook and passes them into the context's value.

### E. `useRoutineBuilderContext` Hook (The Consumer)

- This is the hook that all child components will use.
- Any component inside the `RoutineBuilderProvider` can call this hook to get direct access to the `state` and `dispatch` function.
- This completely eliminates the need to pass props down through intermediate layers.

## 3. Example Flow

```jsx
// /pages/routines/new.tsx (Simplified)
import {
  useRoutineBuilder,
  RoutineBuilderProvider,
} from '@/features/routines/hooks/use-routine-builder';
import { WorkoutBuilder } from '@/features/routines/components/WorkoutBuilder';

export default function CreateRoutinePage() {
  const { state, dispatch } = useRoutineBuilder();

  return (
    <RoutineBuilderProvider state={state} dispatch={dispatch}>
      <WorkoutBuilder />
    </RoutineBuilderProvider>
  );
}

// ----------------------------------------------------------------

// /features/routines/components/WorkingSets.tsx (Deeply Nested Child)
import { useRoutineBuilderContext } from '@/features/routines/hooks/use-routine-builder';

export function WorkingSets({ exerciseId }) {
  // No prop drilling! We get the state directly from the context.
  const { state, dispatch } = useRoutineBuilderContext();
  const sets = state.findExercise(exerciseId).workingSets;

  const handleUpdateSet = updatedSet => {
    dispatch({
      type: 'UPDATE_WORKING_SET',
      payload: { exerciseId, updatedSet },
    });
  };

  // ... render sets
}
```

## 4. Benefits

- **Zero Prop Drilling**: Components are clean and only aware of the props they truly need.
- **Single Source of Truth**: All logic remains centralized in the `useRoutineBuilder` reducer and its delegated mutation utilities, making state changes predictable and easy to debug.
- **High Performance**: Using `useReducer` and a single context is very performant. Child components will only re-render if the specific slice of state they consume actually changes.
- **Type Safety & Testability**: Isolating state logic into pure, strongly-typed utility functions significantly improves type safety and allows for focused, simple unit testing.

## 5. Accessing Sliced State with Selector Hooks

A crucial pattern for keeping components clean is the use of **selector hooks**. A deeply nested component should not contain complex logic to find its own slice of data from the global state. Instead, it should use a dedicated hook for that purpose, similar to how mutation logic is handled.

### The Pattern

1.  **Components receive IDs as props**: This gives the component its identity (e.g., `<StrengthExercise exerciseId="xyz" />`).
2.  **Selector hooks consume the context**: A hook like `useExercise(exerciseId)` will call `useRoutineBuilderContext()` to get the full state.
3.  **Selector hooks find and return the specific data**: The hook contains the memoized logic to find the specific exercise data. It can also return pre-configured dispatch functions.

### Example: `useExercise` Selector Hook

```typescript
// features/routines/hooks/useExercise.ts
import { useMemo } from 'react';
import { useRoutineBuilderContext } from './use-routine-builder';
import { findExerciseById } from '../utils/routine-selectors'; // Example utility

export function useExercise(workoutId, sectionId, exerciseId) {
  const { state, dispatch } = useRoutineBuilderContext();

  // The complex find logic is encapsulated and memoized here.
  const exercise = useMemo(() => {
    return findExerciseById(state, workoutId, sectionId, exerciseId);
  }, [state, workoutId, sectionId, exerciseId]);

  // Pre-configured dispatchers provide a clean API to the component.
  const updateName = (name: string) => {
    dispatch({ type: 'UPDATE_EXERCISE_NAME', payload: { exerciseId, name } });
  };

  const deleteExercise = () => {
    dispatch({
      type: 'DELETE_EXERCISE',
      payload: { workoutId, sectionId, exerciseId },
    });
  };

  return { exercise, updateName, deleteExercise };
}
```

### Example: `useSection` Selector Hook

Similarly, a section component would use a `useSection` hook to get its own data and the list of exercise IDs it needs to render.

```typescript
// features/routines/hooks/useSection.ts
import { useMemo } from 'react';
import { useRoutineBuilderContext } from './use-routine-builder';
import { findSectionById } from '../utils/routine-selectors'; // Example utility

export function useSection(workoutId, sectionId) {
  const { state, dispatch } = useRoutineBuilderContext();

  const section = useMemo(() => {
    return findSectionById(state, workoutId, sectionId);
  }, [state, workoutId, sectionId]);

  const addExercise = () => {
    dispatch({ type: 'ADD_EXERCISE', payload: { sectionId, newExercise: {...} } });
  };

  const deleteSection = () => {
    dispatch({ type: 'DELETE_SECTION', payload: { workoutId, sectionId } });
  };

  const moveSectionUp = () => {
    dispatch({ type: 'MOVE_SECTION_UP', payload: { workoutId, sectionId } });
  };

  return { section, addExercise, deleteSection, moveSectionUp };
}
```

This pattern ensures that our components remain simple and declarative, while the state selection logic is centralized, reusable, and optimized.
