# Extract Trail Running Types to Dedicated File

## Overview

This PR extracts all trail running related types from the workout types file into a dedicated `trailRunning.ts` file to improve organization and maintainability.

## Changes

### New Files

- `features/routines/types/trailRunning.ts` (67 lines) - New dedicated file for trail running types
- `features/routines/types/trailRunning.test.ts` (294 lines) - Comprehensive co-located tests

### Modified Files

- `features/routines/types/workout.ts` - Reduced from 120 to 57 lines by removing trail running types
- `features/routines/types/workout.test.ts` - Removed trail running tests (now in dedicated file)
- `features/routines/types/index.ts` - Updated to re-export trail running types from new file

## Extracted Types

- `IntervalType` - Trail running interval types (run, uphill, downhill, etc.)
- `TrailRunningInterval` - Individual trail running interval structure
- `TrailRunningWorkoutData` - Complete trail running workout data
- `IntensityTarget` - Flexible intensity target configuration
- `TrailRunningSection` - Trail running section structure with repeat support

## Test Coverage

- **13 new tests** covering all trail running types
- Tests for all interval types, section types, and difficulty levels
- Comprehensive validation of optional properties
- Tests for repeated sections and intensity targets

## File Size Targets

✅ **Target Achieved**: Trail running types file < 100 lines (67 lines achieved)
✅ **Workout file reduced**: From 120 to 57 lines
✅ **All tests passing**: 43/43 tests pass

## Benefits

1. **Better Organization**: Trail running types are now co-located in a dedicated file
2. **Improved Maintainability**: Easier to find and modify trail running specific types
3. **Reduced Complexity**: Workout types file is now focused on general workout types
4. **Comprehensive Testing**: Dedicated test file with focused trail running tests
5. **Follows Project Rules**: Files under 300 lines, co-located tests, named exports

## Dependencies

- None - this is a self-contained refactoring
- All existing imports continue to work through the main types index
