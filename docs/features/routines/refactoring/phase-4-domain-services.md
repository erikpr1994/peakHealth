# Phase 4: Domain Layer and Services

## Overview

Create clear distinction between pure business logic and application-level logic.

## 🔄 PR #15: Split Domain Transformers

**Status:** PENDING  
**Files:** `features/routines/domain/transformers.ts`

### Changes

- Split `transformers.ts` (376 lines) into focused files:
  - `typeGuards.ts` - Type guard functions
  - `entityTransformers.ts` - Individual entity transformations
  - `routineTransformers.ts` - Complex routine transformations
- Update imports across the codebase
- Maintain backward compatibility

### Detailed Breakdown

1. **Extract Type Guards** (40 lines):
   - Move all `isValid*` functions to `domain/typeGuards.ts`
   - Functions: `isValidWorkoutType`, `isValidSectionType`, `isValidDifficulty`, `isValidGoal`, `isValidProgressionMethod`, `isValidSetType`, `isValidRepType`
   - Add comprehensive tests for type guards

2. **Extract Entity Transformers** (80 lines):
   - Move individual transformation functions to `domain/entityTransformers.ts`
   - Functions: `transformDatabaseSet`, `transformDatabaseExercise`, `transformDatabaseSection`, `transformDatabaseWorkout`
   - Add comprehensive tests for entity transformations

3. **Extract Routine Transformers** (150 lines):
   - Move complex routine transformations to `domain/routineTransformers.ts`
   - Functions: `transformDatabaseRoutineToRoutineData`, `transformDatabaseRoutineToRoutine`
   - Extract helper functions: `calculateWorkoutsPerWeek`, `parseDate`
   - Add comprehensive tests for routine transformations

4. **Create Main Index** (10 lines):
   - Create `domain/transformers/index.ts` to re-export all functions
   - Maintain backward compatibility

**Target:** < 200 lines per file

## 🔄 PR #16: Split Domain Calculations

**Status:** PENDING  
**Files:** `features/routines/domain/calculations.ts`

### Changes

- Split `calculations.ts` (433 lines) into focused files:
  - `workoutDuration.ts` - Duration calculation functions
  - `setGeneration.ts` - Set generation functions
  - `approachSets.ts` - Approach set functions
- Update imports across the codebase
- Maintain backward compatibility

### Detailed Breakdown

1. **Extract Workout Duration** (80 lines):
   - Move `calculateWorkoutDuration()` and `parseRestTime()` to `domain/workoutDuration.ts`
   - Extract helper functions for time formatting
   - Add comprehensive tests for duration calculations

2. **Extract Set Generation** (250 lines):
   - Move `generateSetsForProgression()` to `domain/setGeneration.ts`
   - Extract progression method configurations to separate constants
   - Create helper functions for each progression method
   - Add comprehensive tests for set generation

3. **Extract Approach Sets** (80 lines):
   - Move `addApproachSets()` to `domain/approachSets.ts`
   - Extract helper functions for weight calculation
   - Add comprehensive tests for approach set generation

4. **Create Main Index** (10 lines):
   - Create `domain/calculations/index.ts` to re-export all functions
   - Maintain backward compatibility

**Target:** < 200 lines per file

## 🔄 PR #24 (Enhanced): Split RoutineService

**Status:** PENDING  
**Files:** `features/routines/services/routineService.ts`

### The Problem

The routineService.ts file mixes pure data transformation with API calls and state management logic.

### The Solution

Let's create a clear distinction.

- **domain/**: This folder should contain pure, stateless functions. They take data, transform it, and return new data. They have zero external dependencies (no API calls, no hooks). Your transformers.ts and calculations.ts are perfect candidates for this.

- **services/**: This folder contains functions that orchestrate domain logic and API calls. They are the bridge between your application and the outside world.

### Example

```typescript
// domain/routineTransformer.ts
export const transformRoutineForApi = routineData => {
  // Pure data transformation logic
  return {
    /* ... transformed data */
  };
};

// services/routineService.ts
import { transformRoutineForApi } from '../domain/routineTransformer';
import { routineApi } from '../api/routineApi'; // Hypothetical API client

export const createNewRoutine = async routineData => {
  const apiPayload = transformRoutineForApi(routineData);
  return await routineApi.create(apiPayload);
};
```

### Benefits

- **Purity**: Your domain logic is pure and easy to test
- **Maintainability**: You can change your API client without touching your business logic
- **Clarity**: It's immediately obvious what code is "business logic" and what code is "application logic"

### Detailed Breakdown

1. **Extract Authentication Service** (50 lines):
   - Move authentication logic to `services/authService.ts`
   - Create `getAuthenticatedUser()` method
   - Create `validateDatabaseConnection()` method
   - Add comprehensive tests for authentication

2. **Extract CRUD Service** (120 lines):
   - Move basic CRUD operations to `services/routineCrudService.ts`
   - Functions: `getUserRoutines()`, `getRoutineById()`, `updateRoutine()`, `deleteRoutine()`
   - Extend base service class for common functionality
   - Add comprehensive tests for CRUD operations

3. **Extract Data Service** (150 lines):
   - Move complex data operations to `services/routineDataService.ts`
   - Function: `createRoutine()` with data preparation logic
   - Extract data preparation utilities to separate functions
   - Add comprehensive tests for data operations

4. **Extract Progress Service** (60 lines):
   - Move progress tracking to `services/routineProgressService.ts`
   - Functions: `setActiveRoutine()`, `updateRoutineProgress()`, `toggleRoutineFavorite()`
   - Add comprehensive tests for progress operations

5. **Extract History Service** (80 lines):
   - Move historical data operations to `services/routineHistoryService.ts`
   - Function: `getHistoricalWorkouts()`
   - Add comprehensive tests for history operations

6. **Create Base Service** (40 lines):
   - Create `services/baseService.ts` with common functionality
   - Authentication checks
   - Database connection validation
   - Error handling utilities

7. **Create Main Service** (20 lines):
   - Create `services/routineService.ts` that composes all services
   - Maintain existing API for backward compatibility
   - Use dependency injection pattern

**Target:** < 200 lines per file

## 🔄 PR #25: Resolve Type Circular Dependencies

**Status:** PENDING  
**Files:** `features/routines/types/`

### Changes

- Resolve circular dependencies between type files
- Move shared types to dedicated shared file
- Clean up import/export patterns
- Improve type organization and maintainability

### Detailed Breakdown

1. **Create Shared Types File** (30 lines):
   - Create `types/shared.ts` for common types used across multiple files
   - Move `WorkoutSet`, `SetType`, `RepType` from components to shared types
   - Move common enums and union types to shared file
   - Add comprehensive tests for shared types

2. **Clean Up Exercise Types** (60 lines):
   - Remove circular import from `exercise.ts`
   - Import `WorkoutSet` from `shared.ts` instead of components
   - Keep exercise-specific types focused
   - Add comprehensive tests for exercise types

3. **Clean Up Workout Types** (40 lines):
   - Remove circular imports from `workout.ts`
   - Import shared types from `shared.ts`
   - Keep workout-specific types focused
   - Add comprehensive tests for workout types

4. **Clean Up Database Types** (70 lines):
   - Remove re-exports from `database.ts`
   - Focus only on database-specific types
   - Add proper typing for `trail_running_data`
   - Add comprehensive tests for database types

5. **Update Main Index** (20 lines):
   - Simplify `types/index.ts` to only re-export from domain files
   - Remove complex import chains
   - Maintain backward compatibility

**Target:** Clean type structure with no circular dependencies

## 🔄 PR #26: Split Utils by Responsibility

**Status:** PENDING  
**Files:** `features/routines/utils/`

### Changes

- Split large `index.ts` file by responsibility
- Remove unnecessary re-export files
- Organize utilities by domain and purpose
- Improve maintainability and organization

### Detailed Breakdown

1. **Extract UI Utilities** (80 lines):
   - Move UI-related functions to `utils/uiUtils.ts`
   - Functions: `getDifficultyColor`, `getGoalColor`, `getSectionColors`, `getProgressionMethodColor`, `getIconColor`, `getSectionIcon`
   - Add comprehensive tests for UI utilities

2. **Extract Progression Utilities** (60 lines):
   - Move progression-related functions to `utils/progressionUtils.ts`
   - Functions: `progressionMethods`, `getProgressionMethodLabel`, `getProgressionMethodDescription`
   - Add comprehensive tests for progression utilities

3. **Extract Business Logic Utilities** (40 lines):
   - Move business logic functions to `utils/businessUtils.ts`
   - Functions: `getObjectiveIcon`, `calculateDaysPerWeek`
   - Add comprehensive tests for business utilities

4. **Remove Re-export Files**:
   - Remove `dataTransformers.ts` (re-export only)
   - Remove `workoutCalculations.ts` (re-export only)
   - Update imports to use domain layer directly

5. **Update Main Index** (20 lines):
   - Simplify `utils/index.ts` to only re-export from focused files
   - Remove complex utility functions
   - Maintain backward compatibility

6. **Organize by Domain**:
   - Keep `timeUtils.ts` as is (generic utilities)
   - Keep `trailRunningUtils.ts` as is (domain-specific)
   - Keep `smartDefaults.ts` as is (domain-specific)

**Target:** Clean utils structure with focused files
