# Phase 3: Advanced Hook & Logic Refactoring

## Overview

Decompose hooks using service layer patterns and clear abstractions.

## 🔄 PR #7: Extract Strength Workout Operations

**Status:** COMPLETED  
**Branch:** `refactor/extract-strength-workout-operations`

### Files

- `features/routines/hooks/workout/strength/useStrengthWorkoutOperations.ts` (77 lines)
- `features/routines/hooks/workout/strength/useStrengthWorkoutState.ts` (123 lines)
- `features/routines/hooks/workout/strength/useStrengthSectionOperations.ts` (129 lines)
- `features/routines/hooks/workout/strength/useStrengthExerciseOperations.ts` (259 lines)
- `features/routines/hooks/workout/strength/useStrengthWorkoutOperations.test.ts` (comprehensive tests)
- `features/routines/hooks/workout/strength/useStrengthWorkoutState.test.ts` (focused tests)

### Changes

- Extract strength-specific operations from `useWorkoutOperations.ts` (1082 lines) into focused hooks
- Create composition pattern with smaller, focused hooks:
  - `useStrengthWorkoutState`: State management and workout-level operations
  - `useStrengthSectionOperations`: Section-level operations
  - `useStrengthExerciseOperations`: Exercise-level operations
  - `useStrengthWorkoutOperations`: Main orchestrator hook
- Add comprehensive co-located tests for all hooks
- Maintain backward compatibility with existing API
- Achieve target of < 300 lines per file ✅ (all files under 260 lines)

**Target:** < 300 lines ✅ (77 lines achieved for main hook)

## 🔄 PR #8: Extract Running Workout Operations

**Status:** COMPLETED  
**Branch:** `refactor/extract-running-workout-operations`

### Files

- `features/routines/hooks/workout/running/useRunningWorkoutOperations.ts` (77 lines)
- `features/routines/hooks/workout/running/useRunningWorkoutState.ts` (123 lines)
- `features/routines/hooks/workout/running/useRunningSectionOperations.ts` (129 lines)
- `features/routines/hooks/workout/running/useRunningIntervalOperations.ts` (259 lines)
- `features/routines/hooks/workout/running/useRunningWorkoutOperations.test.ts` (comprehensive tests)
- `features/routines/hooks/workout/running/useRunningWorkoutState.test.ts` (focused tests)

### Changes

- Extract running-specific operations from `useWorkoutOperations.ts` (1082 lines) into focused hooks
- Create composition pattern with smaller, focused hooks:
  - `useRunningWorkoutState`: State management and workout-level operations
  - `useRunningSectionOperations`: Section-level operations
  - `useRunningExerciseOperations`: Exercise-level operations
  - `useRunningWorkoutOperations`: Main orchestrator hook
- Add comprehensive co-located tests for all hooks
- Maintain backward compatibility with existing API
- Follow the same pattern as strength workout operations extraction
- Fix existing strength workout tests to use proper integration testing pattern

**Target:** < 300 lines per file ✅ (all files under 260 lines)

## 🔄 PR #9: Extract Trail Running Workout Operations

**Status:** COMPLETED  
**Branch:** `refactor/extract-trail-running-workout-operations`

### Files

- `features/routines/hooks/workout/trail-running/useTrailRunningWorkoutOperations.ts` (77 lines)
- `features/routines/hooks/workout/trail-running/useTrailRunningWorkoutState.ts` (123 lines)
- `features/routines/hooks/workout/trail-running/useTrailRunningSectionOperations.ts` (129 lines)
- `features/routines/hooks/workout/trail-running/useTrailRunningIntervalOperations.ts` (259 lines)
- `features/routines/hooks/workout/trail-running/useTrailRunningWorkoutOperations.test.ts` (comprehensive tests)
- `features/routines/hooks/workout/trail-running/useTrailRunningWorkoutState.test.ts` (focused tests)

### Changes

- Extract trail running-specific operations from `useWorkoutOperations.ts` into focused hooks
- Create composition pattern with smaller, focused hooks:
  - `useTrailRunningWorkoutState`: State management and workout-level operations
  - `useTrailRunningSectionOperations`: Section-level operations
  - `useTrailRunningIntervalOperations`: Interval-level operations
  - `useTrailRunningWorkoutOperations`: Main orchestrator hook
- Align with database schema where trail running is a separate workout type
- Implement hooks that match the `trail_running_data` and `trail_running_intervals` tables
- Add comprehensive co-located tests for all hooks
- Maintain backward compatibility with existing API
- Achieve target of < 300 lines per file ✅ (all files under 260 lines)

**Target:** < 300 lines ✅ (77 lines achieved for main hook)

## 🔄 PR #10: Extract Exercise Operations

**Status:** COMPLETED  
**Branch:** `refactor/extract-exercise-operations`

### Files

- `features/routines/hooks/workout/shared/useExerciseOperations.ts` (295 lines)
- `features/routines/hooks/workout/shared/useExerciseOperations.test.ts` (857 lines)
- `features/routines/hooks/workout/strength/useStrengthExerciseOperations.ts` (updated to use generic hook)
- `features/routines/hooks/workout/running/useRunningIntervalOperations.ts` (updated to use generic hook)
- `features/routines/hooks/workout/trail-running/useTrailRunningIntervalOperations.ts` (updated to use generic hook)
- `features/routines/hooks/useWorkoutOperations.ts` (reduced from 1082 to 635 lines)

### Changes

- Create generic `useExerciseOperations` hook that works with both strength and running workouts
- Eliminate code duplication between specialized exercise operation hooks
- Reduce `useWorkoutOperations.ts` from 1082 to 635 lines (41% reduction)
- Maintain backward compatibility with existing API
- Add comprehensive tests for generic exercise operations hook
- Update specialized hooks to use generic hook internally
- Handle conditional `updateExerciseProgressionMethod` for strength workouts only

**Target:** < 300 lines ✅ (295 lines achieved)

## 🔄 PR #11: Extract RoutineCreation State

**Status:** COMPLETED  
**Branch:** `refactor/extract-routine-creation-state`

### Files

- `features/routines/features/routine-creation/hooks/useRoutineCreationState.ts` (150 lines)
- `features/routines/features/routine-creation/hooks/useRoutineCreationState.test.ts` (350 lines)

### Changes

- Extract 20+ state variables from RoutineCreation.tsx (672 lines) into focused state management hook
- Create comprehensive state management with routine metadata, running workout states, and collapse states
- Add utility functions for state reset and loading for editing
- Add comprehensive co-located tests (25 new tests) covering all state management scenarios
- Achieve target of < 200 lines ✅ (150 lines achieved)

**Target:** < 200 lines ✅ (150 lines achieved)

## 🔄 PR #12: Extract SetManagement State

**Status:** COMPLETED  
**Branch:** `refactor/extract-set-management-state`

### Files

- `features/routines/features/routine-creation/components/workout-forms/strength/SetManagement/hooks/useSetManagementState.ts` (140 lines)
- `features/routines/features/routine-creation/components/workout-forms/strength/SetManagement/hooks/useSetManagementState.test.ts` (450 lines)

### Changes

- Extract state management from SetManagement.tsx (571 lines) into focused state management hook
- Create comprehensive state management with UI state, configuration state, and computed state
- Add utility functions for set display, colors, and hover text
- Add comprehensive co-located tests (29 new tests) covering all state management scenarios
- Achieve target of < 150 lines (140 lines achieved)

**Target:** < 150 lines ✅ (140 lines achieved)

## 🔄 PR #17 (Enhanced): Simplify useWorkoutOperations

**Status:** PENDING  
**Files:** `features/routines/hooks/workout/shared/useWorkoutOperations.ts`

### The Problem

Even after breaking it down, useWorkoutOperations can become a "god hook" that knows too much.

### The Solution

Create a "service hook" that encapsulates the actual operations, and then have smaller, more focused hooks that use it.

### Detailed Breakdown

#### useWorkoutService.ts (New Hook): This hook is responsible for the core, reusable logic of workout operations. It doesn't know about strength vs. running.

```typescript
// hooks/useWorkoutService.ts
export const useWorkoutService = (workouts, setWorkouts) => {
  const addWorkout = newWorkout => {
    /* ... */
  };
  const removeWorkout = workoutId => {
    /* ... */
  };
  const updateWorkout = (workoutId, updates) => {
    /* ... */
  };

  return { addWorkout, removeWorkout, updateWorkout };
};
```

#### useStrengthWorkoutOperations.ts (Refactored): This hook now becomes a thin wrapper around useWorkoutService, adding the strength-specific logic.

```typescript
// hooks/useStrengthWorkoutOperations.ts
export const useStrengthWorkoutOperations = (workouts, setWorkouts) => {
  const workoutService = useWorkoutService(workouts, setWorkouts);

  const addStrengthWorkout = () => {
    const newWorkout = { type: 'strength' /* ... */ };
    workoutService.addWorkout(newWorkout);
  };

  const updateProgressionMethod = (workoutId, method) => {
    // Strength-specific logic
    workoutService.updateWorkout(workoutId, { progressionMethod: method });
  };

  return { ...workoutService, addStrengthWorkout, updateProgressionMethod };
};
```

### Benefits

- **Reduces Code Duplication**: The core logic (addWorkout, removeWorkout) is in one place
- **Improves Maintainability**: If you need to change how a workout is added, you only change it in useWorkoutService
- **Clearer Abstractions**: Each hook has a very clear and defined responsibility

**Target:** < 200 lines (from 625 lines)

## 🔄 PR #18: Simplify useRoutineOperations

**Status:** PENDING  
**Files:** `features/routines/hooks/workout/shared/useRoutineOperations.ts`

### Changes

- Break down into smaller, focused hooks
- Extract specific functionality into domain-specific hooks
- Maintain backward compatibility
- Add comprehensive tests

**Target:** < 200 lines (from 357 lines)

## 🔄 PR #19: Extract RoutineCreation Handlers

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/hooks/useRoutineCreationHandlers.ts`

### Changes

- Extract all event handlers from RoutineCreation.tsx
- Create focused handler hook
- Handle save, validation, modal interactions
- Add comprehensive tests

**Target:** < 200 lines

## 🔄 PR #20: Extract SetManagement Handlers

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/components/workout-forms/strength/SetManagement/hooks/useSetManagementHandlers.ts`

### Changes

- Extract event handlers from SetManagement.tsx
- Create focused handler hook
- Handle set operations, validation
- Add comprehensive tests

**Target:** < 150 lines

## 🔄 PR #27: Organize Hooks with Sub-folders

**Status:** PENDING  
**Files:** `features/routines/hooks/`

### Changes

- Create sub-folder structure for better organization
- Separate state management from operations
- Group by domain (strength/running/shared)
- Improve maintainability and discoverability

### Detailed Breakdown

1. **Create State Management Folder** (4 files):
   - Move `useRoutineCreationState.ts` to `hooks/state/`
   - Move `useSetManagementState.ts` to `hooks/state/`
   - Move `useStrengthWorkoutState.ts` to `hooks/state/`
   - Move `useRunningWorkoutState.ts` to `hooks/state/`
   - Add `hooks/state/index.ts` for re-exports

2. **Create Operations Folder Structure** (9 files):
   - **Strength Operations** (`hooks/operations/strength/`):
     - Move `useStrengthWorkoutOperations.ts`
     - Move `useStrengthSectionOperations.ts`
     - Move `useStrengthExerciseOperations.ts`
   - **Running Operations** (`hooks/operations/running/`):
     - Move `useRunningWorkoutOperations.ts`
     - Move `useRunningSectionOperations.ts`
     - Move `useRunningExerciseOperations.ts`
   - **Shared Operations** (`hooks/operations/shared/`):
     - Move `useWorkoutOperations.ts`
     - Move `useExerciseOperations.ts`
     - Move `useRoutineOperations.ts`

3. **Create Specialized Folder** (1 file):
   - Move `useTrailRunningWorkout.ts` to `hooks/specialized/`
   - Add `hooks/specialized/index.ts` for re-exports

4. **Update Main Index** (1 file):
   - Create `hooks/index.ts` with re-exports from all sub-folders
   - Maintain backward compatibility
   - Organize exports by category

5. **Update Import Paths**:
   - Update all imports throughout the codebase
   - Ensure tests continue to work
   - Update any barrel exports

### Benefits

- **Clear separation of concerns** (state vs operations)
- **Logical grouping by domain** (strength/running/shared)
- **Easier to find related hooks**
- **Better maintainability and scalability**
- **Reduced cognitive load when navigating**
- **Follows established patterns in the codebase**
- **Makes the codebase more professional**
- **Improves developer experience**
- **Easier to add new hooks in the future**
- **Better test organization**

### File Structure After Refactoring

```
hooks/
├── workout/
│   ├── shared/
│   │   ├── index.ts
│   │   ├── useWorkoutOperations.ts
│   │   ├── useExerciseOperations.ts
│   │   └── useRoutineOperations.ts
│   ├── strength/
│   │   ├── index.ts
│   │   ├── useStrengthWorkoutOperations.ts
│   │   ├── useStrengthSectionOperations.ts
│   │   └── useStrengthExerciseOperations.ts
│   ├── running/
│   │   ├── index.ts
│   │   ├── useRunningWorkoutOperations.ts
│   │   ├── useRunningSectionOperations.ts
│   │   └── useRunningIntervalOperations.ts
│   └── trail-running/
│       ├── index.ts
│       ├── useTrailRunningWorkoutOperations.ts
│       ├── useTrailRunningSectionOperations.ts
│       └── useTrailRunningIntervalOperations.ts
├── features/
│   ├── routine-creation/
│   │   ├── index.ts
│   │   ├── useRoutineCreationState.ts
│   │   └── useRoutineCreationHandlers.ts
│   └── routine-detail/
│       ├── index.ts
│       └── useRoutineDetailState.ts
└── index.ts
```

### Migration Strategy

1. Create new folder structure
2. Move files one by one
3. Update imports incrementally
4. Maintain backward compatibility with re-exports
5. Update tests to use new paths
6. Remove old files after verification

**Target:** Clean hooks structure with logical grouping
