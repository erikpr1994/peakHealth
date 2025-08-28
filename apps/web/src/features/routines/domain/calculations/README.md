# Calculations

This directory contains pure calculation functions for the Routines feature.

## Purpose

- Functions that perform calculations on data
- Mathematical operations, statistics, metrics, etc.
- Pure functions with no side effects

## Examples

```typescript
// workoutCalculations.ts
export function calculateWorkoutVolume(sets: WorkoutSet[]): number {
  return sets.reduce((total, set) => {
    return total + set.weight * set.reps;
  }, 0);
}

export function calculateOneRepMax(weight: number, reps: number): number {
  // Brzycki formula
  return weight * (36 / (37 - reps));
}

export function calculateTotalWorkoutTime(
  exercises: RoutineExercise[]
): number {
  return exercises.reduce((total, exercise) => {
    const setTime =
      exercise.sets *
      (exercise.restBetweenSets + exercise.timePerRep * exercise.reps);
    return total + setTime;
  }, 0);
}
```
