# Transformers

This directory contains data transformation functions for the Routines feature.

## Purpose

- Functions that transform data from one format to another
- Mapping between different data structures
- Formatting data for display or API requests

## Examples

```typescript
// routineTransformers.ts
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

export function transformRoutineFromApi(
  apiRoutine: RoutineApiResponse
): Routine {
  return {
    id: apiRoutine.id,
    name: apiRoutine.name,
    description: apiRoutine.description || '',
    difficulty: apiRoutine.difficulty,
    exercises: apiRoutine.exercises.map(transformExerciseFromApi),
    createdAt: new Date(apiRoutine.created_at),
    updatedAt: new Date(apiRoutine.updated_at),
  };
}

export function transformExerciseForApi(
  exercise: RoutineExerciseFormData
): RoutineExerciseApiRequest {
  return {
    exercise_id: exercise.exerciseId,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
    rest_between_sets: exercise.restBetweenSets,
    notes: exercise.notes,
  };
}
```
