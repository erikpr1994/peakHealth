# workout_sessions Collection Schema

This collection stores every scheduled workout instance for a user. It is the source for the user's calendar and contains their performance history. It was previously named `scheduled_workouts`.

## Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Supabase user ID
  routineAssignmentId: ObjectId, // Ref to `routine_assignments` collection
  parentRoutineId: ObjectId,    // Denormalized for analytics
  routineVersionId: ObjectId, // Denormalized for analytics
  workoutId: ObjectId,        // ID of the original workout within the routine
  
  scheduledDate: ISODateString,
  scheduledTime: String, // "HH:mm"
  status: String, // "scheduled", "in-progress", "completed", "skipped", "cancelled"
  completedAt: ISODateString,
  durationMinutes: Number, // Actual duration logged by user
  notes: String, // User's notes on the session

  // Immutable snapshot of the planned workout
  workoutSnapshot: {
    name: String,
    type: String, // "strength", "running", etc.
    objective: String,
    sections: [WorkoutSection] // Full, deep copy of workout sections
  },

  // Log of user's actual performance
  performanceLog: {
    sections: [PerformedSection] // See data-models/workout-log.md
  },
  
  createdAt: ISODateString,
  updatedAt: ISODateString
}
```

*For detailed definitions of the `workoutSnapshot` and `performanceLog` structures, see the [Workout Session](../data-models/workout-session.md) and [Workout Log](../data-models/workout-log.md) data models.*

## Indexes

```javascript
// Primary index for retrieving a user's schedule
{ userId: 1, scheduledDate: 1 }

// For cleanup tasks when a routine assignment changes
{ routineAssignmentId: 1, status: 1 }

// For analytics on routine performance
{ parentRoutineId: 1, completedAt: 1 }
```
