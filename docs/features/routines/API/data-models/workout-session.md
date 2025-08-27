# Workout Session Data Model

This model represents a specific instance of a workout that a user plans to perform. It tracks the session from scheduling through to completion, cancellation, or skipping.

## Design Rationale: Snapshot vs. Log

This model uses two distinct properties to manage workout data:

1.  **`workoutSnapshot`**: An immutable copy of the planned workout at the time of scheduling. This is crucial for historical accuracy, ensuring that the record of what was *planned* remains intact even if the original routine is modified later.
2.  **`performanceLog`**: A detailed record of what the user *actually* performed for each set (e.g., reps, weight). It directly references the snapshot for context but remains separate to clearly distinguish the plan from the actual performance.

This separation ensures data integrity and provides a clear, comprehensive history of the user's workout, detailing both the intended plan and the final outcome.

## Workout Session Interface

```typescript
interface WorkoutSession {
  _id: ObjectId;
  userId: ObjectId;
  parentRoutineId: ObjectId; // The parent routine ID, linking all versions of a routine
  routineVersionId: ObjectId; // The specific routine version this workout is from
  routineAssignmentId: ObjectId; // The specific assignment this workout belongs to
  workoutId: ObjectId; // Reference to the original workout document for traceability and analytics
  scheduledDate: ISODateString; // date only
  scheduledTime: TimeString;
  status: WorkoutSessionStatus;
  completedAt?: ISODateString;
  durationMinutes?: number;
  notes?: string;
  workoutSnapshot: WorkoutSnapshot;
  performanceLog?: WorkoutPerformanceLog; // Actual performance data, see workout-log.md
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
```

## Workout Snapshot

The `workoutSnapshot` field contains a complete copy of the workout data at the time of scheduling.

```typescript
interface WorkoutSnapshot {
  name: string;
  type: WorkoutType;
  objective: string;
  sections: WorkoutSection[]; // Full section data for historical reference
}
```

## Performance Log

The `performanceLog` field captures the user's actual performance data. For the detailed structure, see **[workout-log.md](./workout-log.md)**.

## Type Definitions

```typescript
type ObjectId = string;
type ISODateString = string;
type TimeString = string;
type WorkoutType = 'strength' | 'running' | 'trail-running';
type WorkoutSessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'skipped' | 'cancelled';
```

## Status Flow

- `scheduled`: Workout is planned but not started
- `in-progress`: User has started the workout
- `completed`: Workout has been finished
- `skipped`: User skipped the workout
- `cancelled`: Workout was cancelled

## Handling Routine Changes

When a user's routine assignment is updated (e.g., a trainer assigns a new version), the system must clean up any future, un-started workouts from the old assignment.

This prevents the user from having orphaned sessions in their schedule. The logic should be as follows:

1.  **Identify the Old Assignment**: Get the `routineAssignmentId` of the routine being replaced.
2.  **Query for Sessions**: Find all `WorkoutSession` documents that match the old `routineAssignmentId`.
3.  **Filter by Status**: From that set, select only the documents where the `status` is `'scheduled'`.
4.  **Delete**: Delete only the selected documents.

This targeted approach ensures that the user's historical record remains intact. Sessions that are `completed`, `skipped`, `cancelled`, or even `in-progress` are preserved as they represent the user's history with the previous routine version.
