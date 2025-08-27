# Workout Data Models

This document outlines the data models for individual workouts, which are the building blocks of a routine.

## Workout Types

The `Workout` model uses a union type to support different kinds of workouts. Each type can have its own specific properties while sharing a common base structure.

```typescript
type Workout = StrengthWorkout | RunningWorkout | TrailRunningWorkout;
```

## Base Workout

All workout types extend the `BaseWorkout` interface.

```typescript
interface BaseWorkout {
  _id: ObjectId;
  name: string;
  orderIndex: number;
  objective?: string;
  notes?: string;
  sections: (StrengthWorkoutSection | RunningWorkoutSection)[];
}
```

## Workout-Specific Interfaces

### Strength Workout

```typescript
interface StrengthWorkout extends BaseWorkout {
  type: 'strength';
  sections: StrengthWorkoutSection[];
}
```

### Running Workout

```typescript
interface RunningWorkout extends BaseWorkout {
  type: 'running';
  sections: RunningWorkoutSection[];
}
```

### Trail Running Workout

```typescript
interface TrailRunningWorkout extends BaseWorkout {
  type: 'trail-running';
  sections: RunningWorkoutSection[]; // Uses the same sections as Running
}
```

## Type Definitions

These are common types used across the workout models.

```typescript
type ObjectId = string;
type DurationString = string;
```

## Key Design Principles

1.  **Modularity**: Each workout is a self-contained unit that can be part of a larger routine.
2.  **Flexibility**: The union type allows for different kinds of workouts with specific, relevant properties.
3.  **Composition**: Workouts are composed of `WorkoutSection`s, which in turn are composed of `Exercise`s, creating a hierarchical structure.

## Notes

-   The `sections` array contains a list of section objects as defined in the files within the `sections/` directory.
-   This model defines the structure of a workout plan, while `scheduled-workout.md` defines an instance of a workout being performed.
