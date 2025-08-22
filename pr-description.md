# PR #9: Extract Exercise Operations

## Overview

This PR extracts exercise-specific operations into a generic, reusable hook that eliminates code duplication between strength and running workout operations.

## Changes

### New Files

- **`useExerciseOperations.ts`** (295 lines): Generic hook that works with both strength and running workouts
- **`useExerciseOperations.test.ts`** (857 lines): Comprehensive tests covering all operations and edge cases

### Updated Files

- **`useStrengthExerciseOperations.ts`**: Now uses the generic hook internally while maintaining backward compatibility
- **`useRunningExerciseOperations.ts`**: Now uses the generic hook internally while maintaining backward compatibility
- **`useWorkoutOperations.ts`**: Reduced from 1082 to 635 lines (41% reduction) by removing duplicated exercise operations

## Key Features

### Generic Exercise Operations

- `addExercise`: Add new exercises to workout sections
- `removeExercise`: Remove exercises from workout sections
- `updateExerciseName`: Update exercise names
- `updateExerciseSets`: Update exercise sets configuration
- `updateRestTimer`: Update rest timer settings
- `updateExerciseRestAfter`: Update rest after exercise settings
- `updateExerciseEmomReps`: Update EMOM reps configuration

### Strength-Specific Operations

- `updateExerciseProgressionMethod`: Conditionally exposed only for strength workouts

### Type Safety

- Full TypeScript support with generics (`<T extends WorkoutType>`)
- Conditional return types based on workout type
- Proper type assertions for strength-specific operations

## Benefits

1. **Code Reduction**: 41% reduction in `useWorkoutOperations.ts` (1082 → 635 lines)
2. **Eliminated Duplication**: Removed identical exercise operations from specialized hooks
3. **Maintainability**: Single source of truth for exercise operations
4. **Type Safety**: Strong typing with conditional operations
5. **Backward Compatibility**: Existing API unchanged
6. **Comprehensive Testing**: 21 test cases covering all scenarios

## Testing

All tests pass (629/629) including:

- Generic exercise operations for both workout types
- Strength-specific progression method operations
- Edge cases and error handling
- Type safety validation

## Next Steps

This completes the exercise operations extraction. The next PR will focus on extracting routine creation state management.
