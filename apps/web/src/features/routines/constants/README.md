# Constants

This directory contains constants, enums, and configuration values for the Routines feature.

## Purpose

- Define constants used throughout the feature
- Centralize configuration values
- Define enums for type safety

## Examples

```typescript
// routineConstants.ts
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export type DifficultyLevel =
  (typeof DIFFICULTY_LEVELS)[keyof typeof DIFFICULTY_LEVELS];

export const MAX_EXERCISES_PER_ROUTINE = 20;

export const ROUTINE_CATEGORIES = [
  'strength',
  'cardio',
  'flexibility',
  'balance',
  'hybrid',
] as const;

export type RoutineCategory = (typeof ROUTINE_CATEGORIES)[number];
```
