# Types

This directory contains shared type definitions for the Routines feature.

## Purpose

- Define TypeScript interfaces and types
- Ensure type safety across the feature
- Document data structures

## Guidelines

- Use descriptive names for types
- Split types into logical files by domain entity
- Use named exports
- Document complex types with JSDoc comments

## Examples

```typescript
// routine.ts
export interface Routine {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: RoutineExercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoutineExercise {
  id: string;
  exerciseId: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  restBetweenSets: number;
  notes: string;
}

export interface RoutineFormData {
  name: string;
  description: string;
  difficulty: Routine['difficulty'];
  exercises: RoutineExerciseFormData[];
}

export interface RoutineExerciseFormData {
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  restBetweenSets: number;
  notes: string;
}

// API types
export interface RoutineApiRequest {
  name: string;
  description: string;
  difficulty: string;
  exercises: RoutineExerciseApiRequest[];
}

export interface RoutineExerciseApiRequest {
  exercise_id: string;
  sets: number;
  reps: number;
  weight: number;
  rest_between_sets: number;
  notes: string;
}

export interface RoutineApiResponse {
  id: string;
  name: string;
  description: string | null;
  difficulty: string;
  exercises: RoutineExerciseApiResponse[];
  created_at: string;
  updated_at: string;
}

export interface RoutineExerciseApiResponse {
  id: string;
  exercise_id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest_between_sets: number;
  notes: string;
}
```
