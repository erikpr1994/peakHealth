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

### 🔄 PR #2: Extract Workout Types

**Status:** PENDING
**Files:** `features/routines/types/workout.ts`
**Changes:**

- Extract workout-related types from `types/index.ts`
- Create focused type definitions for `StrengthWorkout`, `RunningWorkout`, `WorkoutSection`
- Add co-located tests
- Update main types index

**Target:** < 100 lines
**Dependencies:** None

### 🔄 PR #3: Extract Exercise Types

**Status:** PENDING
**Files:** `features/routines/types/exercise.ts`
**Changes:**

- Extract exercise-related types from `types/index.ts`
- Create focused type definitions for `Exercise`, `WorkoutSet`, `ProgressionMethod`
- Add co-located tests
- Update main types index

**Target:** < 100 lines
**Dependencies:** None

### 🔄 PR #4: Extract Trail Running Types

**Status:** PENDING
**Files:** `features/routines/types/trailRunning.ts`
**Changes:**

- Extract trail running types from `types/index.ts`
- Create focused type definitions for all trail running specific types
- Add co-located tests
- Update main types index

**Target:** < 100 lines
**Dependencies:** None

---

## Phase 2: Utility Extraction (Priority: High)

### 🔄 PR #5: Extract Workout Calculations

**Status:** PENDING
**Files:** `features/routines/domain/calculations.ts`
**Changes:**

- Extract calculation functions from `utils/workoutCalculations.ts` (419 lines)
- Create focused domain functions
- Add co-located tests
- Update imports

**Target:** < 200 lines
**Dependencies:** Types extraction

### 🔄 PR #6: Extract Data Transformers

**Status:** PENDING
**Files:** `features/routines/domain/transformers.ts`
**Changes:**

- Extract transformation functions from `utils/dataTransformers.ts` (372 lines)
- Create focused transformation functions
- Add co-located tests
- Update imports

**Target:** < 200 lines
**Dependencies:** Types extraction

---

## Phase 3: Hook Decomposition (Priority: High)

### 🔄 PR #7: Extract Strength Workout Operations

**Status:** PENDING
**Files:** `features/routines/hooks/useStrengthWorkoutOperations.ts`
**Changes:**

- Extract strength-specific operations from `useWorkoutOperations.ts` (1082 lines)
- Create focused strength workout operations hook
- Add co-located tests
- Update imports

**Target:** < 300 lines
**Dependencies:** Types and utilities extraction

### 🔄 PR #8: Extract Running Workout Operations

**Status:** PENDING
**Files:** `features/routines/hooks/useRunningWorkoutOperations.ts`
**Changes:**

- Extract running-specific operations from `useWorkoutOperations.ts`
- Create focused running workout operations hook
- Add co-located tests
- Update imports

**Target:** < 300 lines
**Dependencies:** Types and utilities extraction

### 🔄 PR #9: Extract Exercise Operations

**Status:** PENDING
**Files:** `features/routines/hooks/useExerciseOperations.ts`
**Changes:**

- Extract exercise-specific operations from `useWorkoutOperations.ts`
- Create focused exercise operations hook
- Add co-located tests
- Update imports

**Target:** < 200 lines
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

### In Progress

- [ ] PR #3: Extract Exercise Types
- [ ] PR #4: Extract Trail Running Types

### Pending

- [ ] PR #5: Extract Workout Calculations
- [ ] PR #6: Extract Data Transformers
- [ ] PR #7: Extract Strength Workout Operations
- [ ] PR #8: Extract Running Workout Operations
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
**Dependencies:** Types and utilities

### 🔄 PR #6: Extract Event Handlers

**Status:** PENDING
**Files:**

- `features/routines/hooks/useRoutineHandlers.ts`
- `features/routines/hooks/useWorkoutHandlers.ts`

**Changes:**

- Extract event handler logic from large components
- Create focused handler hooks
- Add co-located tests
- Update imports

**Target:** < 200 lines each
**Dependencies:** State hooks

---

## Phase 3: Component Extraction

### 🔄 PR #7: Extract Small UI Components

**Status:** PENDING
**Files:**

- `features/routines/components/SetRow.tsx`
- `features/routines/components/ExerciseRow.tsx`
- `features/routines/components/WorkoutCard.tsx`

**Changes:**

- Extract small, reusable UI components
- Create focused components with CSS Modules
- Add co-located tests
- Update imports

**Target:** < 150 lines each
**Dependencies:** Hooks refactoring

### 🔄 PR #8: Extract Form Components

**Status:** PENDING
**Files:**

- `features/routines/components/RoutineForm.tsx`
- `features/routines/components/WorkoutForm.tsx`
- `features/routines/components/ExerciseForm.tsx`

**Changes:**

- Extract form logic from large components
- Create focused form components
- Add co-located tests
- Update imports

**Target:** < 200 lines each
**Dependencies:** Small UI components

---

## Phase 4: Large Component Refactoring

### 🔄 PR #9: Refactor RoutineCreation.tsx

**Status:** PENDING
**Files:** `features/routines/features/routine-creation/RoutineCreation.tsx`
**Changes:**

- Break down 672-line component into smaller pieces
- Use extracted hooks and components
- Maintain functionality while reducing complexity
- Add comprehensive tests

**Target:** < 300 lines
**Dependencies:** All previous PRs

### 🔄 PR #10: Refactor SetManagement.tsx

**Status:** PENDING
**Files:** `features/routines/components/SetManagement.tsx`
**Changes:**

- Break down 571-line component into smaller pieces
- Use extracted hooks and components
- Maintain functionality while reducing complexity
- Add comprehensive tests

**Target:** < 300 lines
**Dependencies:** All previous PRs

### 🔄 PR #11: Refactor useWorkoutOperations.ts

**Status:** PENDING
**Files:** `features/routines/hooks/useWorkoutOperations.ts`
**Changes:**

- Break down 1082-line hook into smaller pieces
- Use extracted utilities and types
- Maintain functionality while reducing complexity
- Add comprehensive tests

**Target:** < 300 lines
**Dependencies:** All previous PRs

---

## Phase 5: Final Cleanup

### 🔄 PR #12: Update Imports and Exports

**Status:** PENDING
**Files:** All routine feature files
**Changes:**

- Update all imports to use new file structure
- Ensure proper named exports
- Clean up unused imports
- Verify all tests pass

**Dependencies:** All previous PRs

### 🔄 PR #13: Documentation Update

**Status:** PENDING
**Files:** `docs/features/routines/README.md`
**Changes:**

- Update documentation to reflect new structure
- Document new component organization
- Add usage examples
- Update architecture diagrams

**Dependencies:** All previous PRs

---

## Progress Tracking

### Completed

- [x] PR #1: Extract Routine Types

### In Progress

- [ ] PR #2: Extract Workout Types
- [ ] PR #3: Extract Exercise Types
- [ ] PR #4: Extract Utility Functions

### Pending

- [ ] PR #5: Extract Small Hooks
- [ ] PR #6: Extract Event Handlers
- [ ] PR #7: Extract Small UI Components
- [ ] PR #8: Extract Form Components
- [ ] PR #9: Refactor RoutineCreation.tsx
- [ ] PR #10: Refactor SetManagement.tsx
- [ ] PR #11: Refactor useWorkoutOperations.ts
- [ ] PR #12: Update Imports and Exports
- [ ] PR #13: Documentation Update

---

## Success Metrics

### File Size Targets

- All files under 300 lines ✅
- Most files under 200 lines
- Utility files under 150 lines
- Type files under 100 lines

### Test Coverage

- All new files have co-located tests
- Maintain existing test coverage
- No test regressions

### Code Quality

- Follow project naming conventions
- Use named exports
- Proper TypeScript typing
- CSS Modules only
- No linting errors

### Performance

- No performance regressions
- Maintain existing functionality
- Clean import/export structure
