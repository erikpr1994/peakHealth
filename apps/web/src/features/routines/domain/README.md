# Domain Logic

This directory contains core business logic for the Routines feature.

## Purpose

- Pure business logic with no UI or API dependencies
- Stateless functions that transform data
- Highly testable and reusable logic

## Subdirectories

- `calculations/`: Functions that perform calculations on data
- `transformers/`: Functions that transform data from one format to another

## Guidelines

- Keep functions pure (no side effects)
- No external dependencies (no API calls, no hooks)
- Functions should take data, transform it, and return new data
- Write comprehensive tests for all domain functions

## Examples

```typescript
// domain/calculations/workoutCalculations.ts
export function calculateWorkoutVolume(sets: WorkoutSet[]): number {
  return sets.reduce((total, set) => {
    return total + set.weight * set.reps;
  }, 0);
}

// domain/transformers/routineTransformers.ts
export function transformRoutineForApi(
  routine: RoutineFormData
): RoutineApiRequest {
  return {
    name: routine.name,
    description: routine.description,
    difficulty: routine.difficulty,
    exercises: routine.exercises.map(transformExerciseForApi),
  };
}
```
