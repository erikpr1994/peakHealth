# Workout Log Data Model

This model captures the actual performance data when a user completes a `WorkoutSession`. It is designed to be stored as the `performanceLog` field within the `WorkoutSession` document.

## Performance Log Structure

The log mirrors the structure of the `WorkoutSnapshot` but contains fields for the user's actual performance for each set.

```typescript
interface WorkoutPerformanceLog {
  sections: PerformedSection[];
}
```

## Performed Section

```typescript
interface PerformedSection {
  // Corresponds to the _id of the section in the snapshot
  sectionId: ObjectId;
  orderIndex: number;
  exercises: PerformedExercise[];
}
```

## Performed Exercise

```typescript
interface PerformedExercise {
  // Corresponds to the _id of the exercise in the snapshot
  exerciseId: ObjectId;
  orderIndex: number;
  sets: PerformedSet[];
  notes?: string;
}
```

## Performed Set

This is a union type to accommodate different types of sets, mirroring the `WorkoutSet` union type.

```typescript
type PerformedSet = PerformedStrengthSet | PerformedBodyweightSet | PerformedMobilitySet;
```

### Performed Strength Set

```typescript
interface PerformedStrengthSet {
  // Corresponds to the _id of the set in the snapshot
  setId: ObjectId;
  setNumber: number;
  setType: SetType; // from snapshot, e.g., 'working', 'warmup'
  performance: {
    reps?: number;
    weight?: number; // in lbs/kg
    rpe?: number;
    duration?: number; // seconds
  };
  notes?: string;
  unilateralSide?: 'left' | 'right';
}
```

### Performed Bodyweight Set

```typescript
interface PerformedBodyweightSet {
  // Corresponds to the _id of the set in the snapshot
  setId: ObjectId;
  setNumber: number;
  setType: SetType;
  performance: {
    reps?: number;
    duration?: number; // seconds
    rpe?: number;
  };
  notes?: string;
  unilateralSide?: 'left' | 'right';
}
```

### Performed Mobility Set

```typescript
interface PerformedMobilitySet {
  // Corresponds to the _id of the set in the snapshot
  setId: ObjectId;
  setNumber: number;
  setType: SetType;
  performance: {
    duration?: number; // seconds
    reps?: number;
    holdTime?: DurationString;
  };
  notes?: string;
}
```

## Type Definitions

```typescript
type ObjectId = string;
type DurationString = string;
type SetType = 'working' | 'warmup' | 'drop' | 'failure';
```

## How It Works

1.  When a `ScheduledWorkout` is started, a `performanceLog` can be initialized.
2.  As the user performs each set, a corresponding `PerformedSet` object is created and added to the log.
3.  The `setId`, `sectionId`, and `exerciseId` fields link the performance data back to the original `workoutSnapshot`, providing full context.
4.  When the workout is completed, the `performanceLog` contains a full record of what the user accomplished.
