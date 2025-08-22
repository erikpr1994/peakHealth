# Phase 1: Foundational Reorganization (The "Big Shuffle")

## Overview

Before we start breaking down large files, let's get the folder structure right. This will make all subsequent steps much cleaner.

## 🔄 PR #A: Restructure the routines feature folder

**Status:** PENDING  
**Branch:** `refactor/routines-folder-restructure`

### Changes

Instead of a flat structure, we'll adopt a more domain-driven and feature-based hierarchy.

### Proposed routines Folder Structure

```
features/routines/
├── api/                # API client layer for routines
├── assets/             # Icons, images, etc.
├── components/         # SHARED components across features
│   ├── workout/        # Shared workout components
│   │   ├── strength/   # Shared strength workout components
│   │   ├── running/    # Shared running workout components
│   │   └── trail-running/ # Shared trail running workout components
│   └── ...
├── constants/          # Constants, enums, and mock data
├── context/            # Feature-specific context providers
├── domain/             # Core business logic (no UI)
├── features/           # Sub-features (the bulk of the code)
│   ├── routine-creation/        # Creating and editing routines
│   │   ├── components/
│   │   │   ├── workout-forms/   # Forms for different workout types
│   │   │   │   ├── strength/    # Strength workout specific components
│   │   │   │   ├── running/     # Running workout specific components
│   │   │   │   └── trail-running/ # Trail running specific components
│   │   │   └── ...
│   │   ├── hooks/
│   │   └── ...
│   ├── routine-detail/          # Viewing routine details
│   │   ├── components/
│   │   │   ├── workout-views/   # Views for different workout types
│   │   │   │   ├── strength/    # Strength workout display
│   │   │   │   ├── running/     # Running workout display
│   │   │   │   └── trail-running/ # Trail running display
│   │   │   └── ...
│   │   └── ...
│   └── routine-list/            # Listing and managing routines
├── hooks/              # SHARED hooks across features
│   ├── workout/        # Shared workout hooks
│   │   ├── strength/   # Shared strength workout hooks
│   │   ├── running/    # Shared running workout hooks
│   │   └── trail-running/ # Shared trail running workout hooks
│   └── ...
├── patterns/           # Reusable design patterns
├── services/           # Higher-level services that use the API layer
├── store/              # State management (e.g., Zustand or Jotai slices)
├── types/              # SHARED types
├── utils/              # SHARED utility functions
└── index.ts            # Public API of the routines feature
```

### Justification

- **Clear Separation of Concerns**: This structure clearly separates concerns at a high level
- **Improved Discoverability**: Need to change an API call? Go to `api/`. Need to fix a UI bug in routine creation? Go to `features/routine-creation/`
- **Scalability**: As the feature grows, we can add new sub-features to the `features` directory without cluttering the root
- **Domain-Driven Design**: Each folder has a clear, single responsibility

### Migration Strategy

1. **Create new folder structure**
2. **Move files incrementally** to avoid breaking changes
3. **Update imports** systematically
4. **Maintain backward compatibility** with re-exports
5. **Update tests** to use new paths
6. **Remove old files** after verification

### Benefits

- **Better Organization**: Clear separation between shared and feature-specific code
- **Easier Navigation**: Developers can quickly find what they're looking for
- **Reduced Coupling**: Features are more isolated from each other
- **Improved Maintainability**: Changes are more localized
- **Better Testing**: Easier to test features in isolation

## 🔄 PR #1: Extract Routine Types

**Status:** COMPLETED  
**Branch:** `refactor/extract-routine-types`

### Files

- `features/routines/types/routine.ts` (75 lines)
- `features/routines/types/routine.test.ts` (150 lines)
- `features/routines/types/index.ts` (reduced from 220 to 152 lines)

### Changes

- Extract routine-related types from `types/index.ts`
- Create focused type definitions for `Routine`, `RoutineData`, `WorkoutDay`, `ExerciseDetail`
- Add comprehensive co-located tests
- Update main types index to re-export routine types

**Target:** < 200 lines ✅ (75 lines achieved)

## 🔄 PR #2: Extract Workout Types

**Status:** COMPLETED  
**Branch:** `refactor/extract-workout-types`

### Files

- `features/routines/types/workout.ts` (147 lines)
- `features/routines/types/workout.test.ts` (292 lines)
- `features/routines/types/index.ts` (reduced from 153 to 22 lines)

### Changes

- Extract workout-related types from `types/index.ts`
- Create focused type definitions for `WorkoutType`, `WorkoutSection`, `Exercise`, `ProgressionMethod`, `StrengthWorkout`, `RunningWorkout`, and all trail running types
- Add comprehensive co-located tests (13 new tests)
- Update main types index to re-export workout types

**Target:** < 200 lines ✅ (147 lines achieved)

## 🔄 PR #3: Extract Exercise Types

**Status:** COMPLETED  
**Branch:** `refactor/extract-exercise-types`

### Files

- `features/routines/types/exercise.ts` (80 lines)
- `features/routines/types/exercise.test.ts` (230 lines)
- `features/routines/types/workout.ts` (reduced from 148 to 119 lines)
- `features/routines/types/database.ts` (reduced from 118 to 93 lines)
- `features/routines/types/index.ts` (updated - added exercise types re-exports)
- `features/routines/features/routine-creation/types/modal.ts` (updated - removed duplicate types)

### Changes

- Extract exercise-related types from multiple files into dedicated `types/exercise.ts` file
- Create focused type definitions for `Exercise`, `ProgressionMethod`, `WorkoutSet`, `DatabaseSet`, `DatabaseExercise`, `ExerciseSelectionData`, and `ExerciseVariantData`
- Add comprehensive co-located tests (11 new tests)
- Update imports across multiple files to use new exercise types file
- Fix test organization - workout tests now only test workout types

**Target:** < 100 lines ✅ (80 lines achieved)

## 🔄 PR #4: Extract Trail Running Types

**Status:** COMPLETED  
**Branch:** `refactor/extract-trail-running-types`

### Files

- `features/routines/types/trailRunning.ts` (68 lines)
- `features/routines/types/trailRunning.test.ts` (297 lines)
- `features/routines/types/index.ts` (updated - added trail running types re-exports)

### Changes

- Extract trail running types from `types/index.ts`
- Create focused type definitions for `IntervalType`, `TrailRunningInterval`, `TrailRunningWorkoutData`, `IntensityTarget`, `TrailRunningSection`
- Align with database schema where trail running is a separate workout type (not a subtype of running)
- Implement types that match the `trail_running_data` and `trail_running_intervals` tables
- Add comprehensive co-located tests
- Update main types index to re-export trail running types

**Target:** < 100 lines ✅ (68 lines achieved)

## 🔄 PR #5: Extract Workout Calculations

**Status:** COMPLETED  
**Branch:** `refactor/extract-workout-calculations`

### Files

- `features/routines/domain/calculations.ts` (175 lines)
- `features/routines/domain/calculations.test.ts` (350 lines)
- `features/routines/utils/workoutCalculations.ts` (reduced from 419 to 8 lines - re-exports only)
- `features/routines/utils/workoutCalculations.test.ts` (updated imports)

### Changes

- Extract calculation functions from `utils/workoutCalculations.ts` (419 lines) to domain layer
- Create focused domain functions with proper JSDoc documentation
- Add comprehensive co-located tests (25 new tests) covering all functions and edge cases
- Maintain backward compatibility by re-exporting from utils file
- Update existing test imports to use new domain file

**Functions extracted:**

- `calculateWorkoutDuration`: Calculate estimated workout duration
- `parseRestTime`: Parse time strings to minutes
- `generateSetsForProgression`: Generate sets based on progression methods
- `addApproachSets`: Add warmup approach sets

**Target:** < 200 lines ✅ (175 lines achieved)

## 🔄 PR #6: Extract Data Transformers

**Status:** COMPLETED  
**Branch:** `refactor/extract-data-transformers`

### Files

- `features/routines/domain/transformers.ts` (376 lines)
- `features/routines/domain/transformers.test.ts` (450 lines)
- `features/routines/utils/dataTransformers.ts` (reduced from 372 to 15 lines - re-exports only)
- `features/routines/utils/dataTransformers.test.ts` (updated imports)

### Changes

- Extract transformation functions from `utils/dataTransformers.ts` (372 lines) to domain layer
- Create focused transformation functions with proper JSDoc documentation
- Add comprehensive co-located tests (32 new tests) covering all functions and edge cases
- Maintain backward compatibility by re-exporting from utils file
- Update existing test imports to use new domain file

**Functions extracted:**

- **Type guard functions**: `isValidWorkoutType`, `isValidSectionType`, `isValidDifficulty`, `isValidGoal`, `isValidProgressionMethod`, `isValidSetType`, `isValidRepType`
- **Individual entity transformations**: `transformDatabaseSet`, `transformDatabaseExercise`, `transformDatabaseSection`, `transformDatabaseWorkout`
- **Complex routine transformations**: `transformDatabaseRoutineToRoutineData`, `transformDatabaseRoutineToRoutine`

**Target:** < 400 lines ✅ (376 lines achieved)
