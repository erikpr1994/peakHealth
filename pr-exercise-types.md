# Refactor: Extract Exercise Types

## Changes

- Extract exercise-related types from multiple files into dedicated `types/exercise.ts` file
- Create focused type definitions for `Exercise`, `ProgressionMethod`, `WorkoutSet`, `DatabaseSet`, `DatabaseExercise`, `ExerciseSelectionData`, and `ExerciseVariantData`
- Add comprehensive co-located tests for all exercise types
- Update imports across multiple files to use new exercise types file
- Reduce complexity in workout.ts, database.ts, and modal.ts files

## Files Changed

- `features/routines/types/exercise.ts` (new file - 80 lines)
- `features/routines/types/exercise.test.ts` (new file - 230 lines)
- `features/routines/types/workout.ts` (updated - reduced from 148 to 119 lines)
- `features/routines/types/database.ts` (updated - reduced from 118 to 93 lines)
- `features/routines/types/index.ts` (updated - added exercise types re-exports)
- `features/routines/features/routine-creation/types/modal.ts` (updated - removed duplicate types)

## Testing

- [x] Unit tests pass (11 new tests added)
- [x] Existing type tests pass (no regressions)
- [x] All type tests pass (37 total tests)
- [x] No linting errors
- [x] Type checking passes

## Benefits

- Creates focused type definitions for exercise-related functionality
- Reduces workout.ts from 148 to 119 lines (20% reduction)
- Reduces database.ts from 118 to 93 lines (21% reduction)
- Improves code organization and maintainability
- Follows project conventions: files under 100 lines, co-located tests, named exports
- Eliminates duplicate type definitions across files
- Provides foundation for subsequent refactoring PRs

## Types Extracted

- `Exercise` - Interface for exercises within workout sections
- `ProgressionMethod` - Union type for strength progression methods
- `WorkoutSet` - Type for workout sets (re-exported from SetManagement)
- `DatabaseSet` - Interface for database set representation
- `DatabaseExercise` - Interface for database exercise representation
- `ExerciseSelectionData` - Interface for exercise selection in modals
- `ExerciseVariantData` - Interface for exercise variant data

## Files Updated

- **workout.ts**: Removed Exercise and ProgressionMethod, now imports from exercise.ts
- **database.ts**: Removed DatabaseSet and DatabaseExercise, now imports from exercise.ts
- **modal.ts**: Removed ExerciseSelectionData and ExerciseVariantData, now imports from exercise.ts
- **index.ts**: Added re-exports for all exercise types

## Next Steps

This PR provides the foundation for:

- PR #4: Extract Trail Running Types
- PR #5: Extract Workout Calculations
- PR #6: Extract Data Transformers
- All subsequent refactoring PRs that depend on exercise types
