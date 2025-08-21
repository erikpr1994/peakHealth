# Refactor: Extract Workout Types

## Changes

- Extract workout-related types from `types/index.ts` into dedicated `types/workout.ts` file
- Create focused type definitions for `WorkoutType`, `WorkoutSection`, `Exercise`, `ProgressionMethod`, `StrengthWorkout`, `RunningWorkout`, and all trail running types
- Add comprehensive co-located tests for all workout types
- Update main types index to re-export workout types from new file

## Files Changed

- `features/routines/types/workout.ts` (new file - 147 lines)
- `features/routines/types/workout.test.ts` (new file - 292 lines)
- `features/routines/types/index.ts` (updated - reduced from 153 to 22 lines)

## Testing

- [x] Unit tests pass (13 new tests added)
- [x] Existing type tests pass (no regressions)
- [x] All type tests pass (26 total tests)
- [x] No linting errors

- [x] Type checking passes

## Benefits

- Reduces `types/index.ts` from 153 to 22 lines (85% reduction)
- Creates focused type definitions for workout-related functionality
- Improves code organization and maintainability

- Follows project conventions: files under 300 lines, co-located tests, named exports
- Provides foundation for subsequent refactoring PRs

## Types Extracted

- `WorkoutType` - Union type for different workout types
- `WorkoutSection` - Interface for workout sections
- `Exercise` - Interface for exercises within sections
- `ProgressionMethod` - Union type for strength progression methods
- `StrengthWorkout` - Interface for strength workouts
- `RunningWorkout` - Interface for running/cardio workouts
- `IntervalType` - Union type for trail running intervals
- `TrailRunningInterval` - Interface for trail running intervals

- `TrailRunningWorkoutData` - Interface for trail running specific data

- `IntensityTarget` - Interface for intensity targets
- `TrailRunningSection` - Interface for trail running sections

## Next Steps

This PR provides the foundation for:

- PR #3: Extract Exercise Types
- PR #4: Extract Trail Running Types
- PR #5: Extract Workout Calculations
- All subsequent refactoring PRs that depend on workout types
