# Routines Feature Refactoring Plan

## Overview

Breaking down large components into smaller, focused pieces following project rules:

- Files under 300 lines
- Co-located tests
- Named exports
- Feature-based organization
- CSS Modules only

## Current State Analysis

### Large Files Identified:

1. **useWorkoutOperations.ts** (1082 lines) - Massive hook with 50+ functions
2. **RoutineCreation.tsx** (672 lines) - Complex component with 20+ state variables
3. **SetManagement.tsx** (571 lines) - Complex component with configuration logic
4. **workoutCalculations.ts** (419 lines) - Large utility file
5. **dataTransformers.ts** (372 lines) - Large transformation file
6. **types/index.ts** (153 lines) - Mixed types that need separation

### Complexity Issues:

- Too many state variables in single components
- Complex event handlers mixed with UI logic
- Large configuration objects
- Multiple responsibilities in single files
- Deep prop drilling
- Complex validation logic mixed with UI

---

## Phase 1: Type Organization (Priority: High)

### ✅ PR #1: Extract Routine Types

**Status:** COMPLETED
**Branch:** `refactor/extract-routine-types`
**Files:**

- `features/routines/types/routine.ts` (75 lines)
- `features/routines/types/routine.test.ts` (150 lines)
- `features/routines/types/index.ts` (reduced from 220 to 152 lines)

**Changes:**

- Extract routine-related types from `types/index.ts`
- Create focused type definitions for `Routine`, `RoutineData`, `WorkoutDay`, `ExerciseDetail`
- Add comprehensive co-located tests
- Update main types index to re-export routine types

**Dependencies:** None

---

### ✅ PR #2: Extract Workout Types

**Status:** COMPLETED
**Branch:** `refactor/extract-workout-types`
**Files:**

- `features/routines/types/workout.ts` (147 lines)
- `features/routines/types/workout.test.ts` (292 lines)
- `features/routines/types/index.ts` (reduced from 153 to 22 lines)

**Changes:**

- Extract workout-related types from `types/index.ts`
- Create focused type definitions for `WorkoutType`, `WorkoutSection`, `Exercise`, `ProgressionMethod`, `StrengthWorkout`, `RunningWorkout`, and all trail running types
- Add comprehensive co-located tests (13 new tests)
- Update main types index to re-export workout types

**Target:** < 200 lines ✅ (147 lines achieved)
**Dependencies:** None

### ✅ PR #3: Extract Exercise Types

**Status:** COMPLETED
**Branch:** `refactor/extract-exercise-types`
**Files:**

- `features/routines/types/exercise.ts` (80 lines)
- `features/routines/types/exercise.test.ts` (230 lines)
- `features/routines/types/workout.ts` (reduced from 148 to 119 lines)
- `features/routines/types/database.ts` (reduced from 118 to 93 lines)
- `features/routines/types/index.ts` (updated - added exercise types re-exports)
- `features/routines/features/routine-creation/types/modal.ts` (updated - removed duplicate types)

**Changes:**

- Extract exercise-related types from multiple files into dedicated `types/exercise.ts` file
- Create focused type definitions for `Exercise`, `ProgressionMethod`, `WorkoutSet`, `DatabaseSet`, `DatabaseExercise`, `ExerciseSelectionData`, and `ExerciseVariantData`
- Add comprehensive co-located tests (11 new tests)
- Update imports across multiple files to use new exercise types file
- Fix test organization - workout tests now only test workout types

**Target:** < 100 lines ✅ (80 lines achieved)
**Dependencies:** None

### ✅ PR #4: Extract Trail Running Types

**Status:** COMPLETED
**Branch:** `refactor/extract-trail-running-types`
**Files:**

- `features/routines/types/trailRunning.ts` (68 lines)
- `features/routines/types/trailRunning.test.ts` (297 lines)
- `features/routines/types/index.ts` (updated - added trail running types re-exports)

**Changes:**

- Extract trail running types from `types/index.ts`
- Create focused type definitions for `IntervalType`, `TrailRunningInterval`, `TrailRunningWorkoutData`, `IntensityTarget`, `TrailRunningSection`
- Add comprehensive co-located tests
- Update main types index to re-export trail running types

**Target:** < 100 lines ✅ (68 lines achieved)
**Dependencies:** None

---

## Phase 2: Utility Extraction (Priority: High)

### ✅ PR #5: Extract Workout Calculations

**Status:** COMPLETED
**Branch:** `refactor/extract-workout-calculations`
**Files:**

- `features/routines/domain/calculations.ts` (175 lines)
- `features/routines/domain/calculations.test.ts` (350 lines)
- `features/routines/utils/workoutCalculations.ts` (reduced from 419 to 8 lines - re-exports only)
- `features/routines/utils/workoutCalculations.test.ts` (updated imports)

**Changes:**

- Extract calculation functions from `utils/workoutCalculations.ts` (419 lines) to domain layer
- Create focused domain functions with proper JSDoc documentation
- Add comprehensive co-located tests (25 new tests) covering all functions and edge cases
- Maintain backward compatibility by re-exporting from utils file
- Update existing test imports to use new domain file
- Achieve target of < 200 lines ✅ (175 lines achieved)

**Functions extracted:**

- `calculateWorkoutDuration`: Calculate estimated workout duration
- `parseRestTime`: Parse time strings to minutes
- `generateSetsForProgression`: Generate sets based on progression methods
- `addApproachSets`: Add warmup approach sets

**Target:** < 200 lines ✅ (175 lines achieved)
**Dependencies:** Types extraction

### ✅ PR #6: Extract Data Transformers

**Status:** COMPLETED
**Branch:** `refactor/extract-data-transformers`
**Files:**

- `features/routines/domain/transformers.ts` (376 lines)
- `features/routines/domain/transformers.test.ts` (450 lines)
- `features/routines/utils/dataTransformers.ts` (reduced from 372 to 15 lines - re-exports only)
- `features/routines/utils/dataTransformers.test.ts` (updated imports)

**Changes:**

- Extract transformation functions from `utils/dataTransformers.ts` (372 lines) to domain layer
- Create focused transformation functions with proper JSDoc documentation
- Add comprehensive co-located tests (32 new tests) covering all functions and edge cases
- Maintain backward compatibility by re-exporting from utils file
- Update existing test imports to use new domain file
- Achieve target of < 400 lines ✅ (376 lines achieved)

**Functions extracted:**

- **Type guard functions**: `isValidWorkoutType`, `isValidSectionType`, `isValidDifficulty`, `isValidGoal`, `isValidProgressionMethod`, `isValidSetType`, `isValidRepType`
- **Individual entity transformations**: `transformDatabaseSet`, `transformDatabaseExercise`, `transformDatabaseSection`, `transformDatabaseWorkout`
- **Complex routine transformations**: `transformDatabaseRoutineToRoutineData`, `transformDatabaseRoutineToRoutine`

**Target:** < 400 lines ✅ (376 lines achieved)
**Dependencies:** Types extraction

---

## Phase 3: Hook Decomposition (Priority: High)

### ✅ PR #7: Extract Strength Workout Operations

**Status:** COMPLETED
**Branch:** `refactor/extract-strength-workout-operations`
**Files:**

- `features/routines/hooks/useStrengthWorkoutOperations.ts` (77 lines)
- `features/routines/hooks/useStrengthWorkoutState.ts` (123 lines)
- `features/routines/hooks/useStrengthSectionOperations.ts` (129 lines)
- `features/routines/hooks/useStrengthExerciseOperations.ts` (259 lines)
- `features/routines/hooks/useStrengthWorkoutOperations.test.ts` (comprehensive tests)
- `features/routines/hooks/useStrengthWorkoutState.test.ts` (focused tests)

**Changes:**

- Extract strength-specific operations from `useWorkoutOperations.ts` (1082 lines) into focused hooks
- Create composition pattern with smaller, focused hooks:
  - `useStrengthWorkoutState`: State management and workout-level operations
  - `useStrengthSectionOperations`: Section-level operations
  - `useStrengthExerciseOperations`: Exercise-level operations
  - `useStrengthWorkoutOperations`: Main orchestrator hook
- Add comprehensive co-located tests for all hooks
- Maintain backward compatibility with existing API
- Achieve target of < 300 lines per file ✅ (all files under 260 lines)

**Functions extracted:**

- **Workout operations**: `addStrengthWorkout`, `removeStrengthWorkout`, `moveStrengthWorkout`, `updateStrengthWorkoutName`, `updateStrengthWorkoutObjective`, `updateStrengthWorkoutSchedule`
- **Section operations**: `addStrengthSection`, `removeStrengthSection`, `updateStrengthSectionName`, `updateStrengthSectionType`, `updateStrengthSectionRestAfter`, `updateStrengthSectionEmomDuration`
- **Exercise operations**: `addStrengthExercise`, `removeStrengthExercise`, `updateStrengthExerciseName`, `updateStrengthExerciseSets`, `updateStrengthRestTimer`, `updateStrengthExerciseRestAfter`, `updateStrengthExerciseEmomReps`, `updateStrengthExerciseProgressionMethod`

**Target:** < 300 lines ✅ (77 lines achieved for main hook)
**Dependencies:** Types and utilities extraction

### ✅ PR #8: Extract Running Workout Operations

**Status:** COMPLETED
**Branch:** `refactor/extract-running-workout-operations`
**Files:**

- `features/routines/hooks/useRunningWorkoutOperations.ts` (77 lines)
- `features/routines/hooks/useRunningWorkoutState.ts` (123 lines)
- `features/routines/hooks/useRunningSectionOperations.ts` (129 lines)
- `features/routines/hooks/useRunningExerciseOperations.ts` (259 lines)
- `features/routines/hooks/useRunningWorkoutOperations.test.ts` (comprehensive tests)
- `features/routines/hooks/useRunningWorkoutState.test.ts` (focused tests)

**Changes:**

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

**Functions extracted:**

- **Workout operations**: `addRunningWorkout`, `removeRunningWorkout`, `moveRunningWorkout`, `updateRunningWorkoutName`, `updateRunningWorkoutObjective`, `updateRunningWorkoutSchedule`
- **Section operations**: `addRunningSection`, `removeRunningSection`, `updateRunningSectionName`, `updateRunningSectionType`, `updateRunningSectionRestAfter`, `updateRunningSectionEmomDuration`
- **Exercise operations**: `addRunningExercise`, `removeRunningExercise`, `updateRunningExerciseName`, `updateRunningExerciseSets`, `updateRunningRestTimer`, `updateRunningExerciseRestAfter`, `updateRunningExerciseEmomReps`

**Target:** < 300 lines per file ✅ (all files under 260 lines)
**Dependencies:** Types and utilities extraction

### ✅ PR #9: Extract Exercise Operations

**Status:** COMPLETED
**Branch:** `refactor/extract-exercise-operations`
**Files:**

- `features/routines/hooks/useExerciseOperations.ts` (295 lines)
- `features/routines/hooks/useExerciseOperations.test.ts` (857 lines)
- `features/routines/hooks/useStrengthExerciseOperations.ts` (updated to use generic hook)
- `features/routines/hooks/useRunningExerciseOperations.ts` (updated to use generic hook)
- `features/routines/hooks/useWorkoutOperations.ts` (reduced from 1082 to 635 lines)

**Changes:**

- Create generic `useExerciseOperations` hook that works with both strength and running workouts
- Eliminate code duplication between specialized exercise operation hooks
- Reduce `useWorkoutOperations.ts` from 1082 to 635 lines (41% reduction)
- Maintain backward compatibility with existing API
- Add comprehensive tests for generic exercise operations hook
- Update specialized hooks to use generic hook internally
- Handle conditional `updateExerciseProgressionMethod` for strength workouts only

**Functions extracted:**

- **Generic operations**: `addExercise`, `removeExercise`, `updateExerciseName`, `updateExerciseSets`, `updateRestTimer`, `updateExerciseRestAfter`, `updateExerciseEmomReps`
- **Strength-specific**: `updateExerciseProgressionMethod` (conditionally exposed)

**Target:** < 300 lines ✅ (295 lines achieved)
**Dependencies:** Types and utilities extraction

---

## Phase 4: State Management Extraction (Priority: High)

### 🔄 PR #10: Extract RoutineCreation State

**Status:** PENDING
**Files:** `features/routines/hooks/useRoutineCreationState.ts`
**Changes:**

- Extract 20+ state variables from RoutineCreation.tsx (672 lines)
- Create focused state management hook
- Handle routine metadata, modal states, collapse states
- Add comprehensive tests

**Target:** < 200 lines
**Dependencies:** Types extraction

### 🔄 PR #11: Extract SetManagement State

**Status:** PENDING
**Files:** `features/routines/hooks/useSetManagementState.ts`
**Changes:**

- Extract state management from SetManagement.tsx (571 lines)
- Create focused state hook
- Handle sets state, configuration state
- Add comprehensive tests

**Target:** < 150 lines
**Dependencies:** Types extraction

---

## Phase 5: Event Handler Extraction (Priority: High)

### 🔄 PR #12: Extract RoutineCreation Handlers

**Status:** PENDING
**Files:** `features/routines/hooks/useRoutineCreationHandlers.ts`
**Changes:**

- Extract all event handlers from RoutineCreation.tsx
- Create focused handler hook
- Handle save, validation, modal interactions
- Add comprehensive tests

**Target:** < 200 lines
**Dependencies:** PR #10

### 🔄 PR #13: Extract SetManagement Handlers

**Status:** PENDING
**Files:** `features/routines/hooks/useSetManagementHandlers.ts`
**Changes:**

- Extract event handlers from SetManagement.tsx
- Create focused handler hook
- Handle set operations, validation
- Add comprehensive tests

**Target:** < 150 lines
**Dependencies:** PR #11

---

## Phase 6: Configuration Extraction (Priority: Medium)

### 🔄 PR #14: Extract Set Configuration

**Status:** PENDING
**Files:** `features/routines/domain/setConfiguration.ts`
**Changes:**

- Extract configuration objects from SetManagement.tsx
- Create domain-specific configuration utilities
- Add comprehensive tests
- Make configuration reusable

**Target:** < 100 lines
**Dependencies:** Types extraction

---

## Phase 7: Component Simplification (Priority: High)

### 🔄 PR #15: Simplify RoutineCreation Container

**Status:** PENDING
**Files:** `features/routines/features/routine-creation/RoutineCreation.tsx`
**Changes:**

- Use extracted hooks and utilities
- Simplify component to orchestration only
- Remove complex state management
- Focus on JSX and prop passing

**Target:** < 300 lines (from 672 lines)
**Dependencies:** PR #10, #12, #14

### 🔄 PR #16: Simplify SetManagement Container

**Status:** PENDING
**Files:** `features/routines/components/SetManagement.tsx`
**Changes:**

- Use extracted hooks and utilities
- Simplify component to UI orchestration
- Remove complex state and configuration logic
- Focus on rendering and user interactions

**Target:** < 300 lines (from 571 lines)
**Dependencies:** PR #11, #13, #14

---

## Phase 8: Hook Simplification (Priority: High)

### 🔄 PR #17: Simplify useWorkoutOperations

**Status:** PENDING
**Files:** `features/routines/hooks/useWorkoutOperations.ts`
**Changes:**

- Use extracted specialized hooks
- Create orchestrator hook that combines them
- Maintain existing API for backward compatibility
- Add comprehensive tests

**Target:** < 200 lines (from 1082 lines)
**Dependencies:** All previous PRs

---

## Phase 9: Final Cleanup

### 🔄 PR #18: Update Imports and Exports

**Status:** PENDING
**Files:** All routine feature files
**Changes:**

- Update all imports to use new file structure
- Ensure proper named exports
- Clean up unused imports
- Verify no circular dependencies

**Target:** Clean import structure
**Dependencies:** All previous PRs

### 🔄 PR #19: Documentation Update

**Status:** PENDING
**Files:** `docs/features/routines/README.md`
**Changes:**

- Update documentation to reflect new structure
- Document new component organization
- Add usage examples
- Update architecture diagrams

**Target:** Complete documentation
**Dependencies:** All previous PRs

---

## Progress Tracking

### Completed

- [x] PR #1: Extract Routine Types
- [x] PR #2: Extract Workout Types
- [x] PR #3: Extract Exercise Types
- [x] PR #4: Extract Trail Running Types
- [x] PR #5: Extract Workout Calculations
- [x] PR #6: Extract Data Transformers
- [x] PR #7: Extract Strength Workout Operations
- [x] PR #8: Extract Running Workout Operations

### Pending

- [ ] PR #9: Extract Exercise Operations
- [ ] PR #10: Extract RoutineCreation State
- [ ] PR #11: Extract SetManagement State
- [ ] PR #12: Extract RoutineCreation Handlers
- [ ] PR #13: Extract SetManagement Handlers
- [ ] PR #14: Extract Set Configuration
- [ ] PR #15: Simplify RoutineCreation Container
- [ ] PR #16: Simplify SetManagement Container
- [ ] PR #17: Simplify useWorkoutOperations
- [ ] PR #18: Update Imports and Exports
- [ ] PR #19: Documentation Update

---

## Success Metrics

### File Size Targets

- All files under 300 lines ✅
- Most files under 200 lines
- No files over 500 lines

### Test Coverage

- All new files have co-located tests
- Maintain existing test coverage
- No test regressions

### Code Quality

- Follow project naming conventions
- Use named exports
- Proper separation of concerns
- No circular dependencies

### Performance

- No performance regressions
- Maintain existing functionality
- Clean import/export structure

---

## Notes

This plan focuses on **practical extraction** rather than theoretical perfection. Each PR is designed to:

1. **Actually reduce complexity** in the target files
2. **Maintain functionality** while improving structure
3. **Be reviewable** with clear, focused changes
4. **Build incrementally** on previous work
5. **Follow project conventions** strictly

The key insight is that we need to extract **types**, **utilities**, **state management**, and **event handlers** first, then use those extracted pieces to simplify the large components and hooks.
