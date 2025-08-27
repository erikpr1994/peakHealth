# routine_assignments Collection Schema

This collection acts as a join table, linking a user to a specific, immutable version of a `TemplateRoutine` and tracking their progress against that assignment.

## Schema

```javascript
{
  _id: ObjectId,
  routineVersionId: ObjectId, // Ref to a specific version in `routines` collection
  parentRoutineId: ObjectId,  // The parent ID from the TemplateRoutine
  trainerId: ObjectId,      // Supabase user ID of the assigning trainer (optional)
  userId: ObjectId,         // Supabase user ID of the assigned user
  
  assignedAt: ISODateString,
  startDate: ISODateString,
  endDate: ISODateString,
  status: String, // "active", "completed", "paused", "cancelled"
  notesForUser: String,

  // Progress tracking for this specific assignment
  progress: {
    completedWorkouts: Number,
    totalWorkouts: Number,
    lastWorkoutDate: ISODateString,
    feedback: String // From user to trainer
  }
}
```

## Indexes

```javascript
// Find all assignments for a user
{ userId: 1, status: 1 }

// Find all assignments made by a trainer
{ trainerId: 1 }

// Find an assignment for a specific routine version
{ routineVersionId: 1, userId: 1 }
```
