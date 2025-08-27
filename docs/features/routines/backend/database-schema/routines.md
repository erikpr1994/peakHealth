# routines Collection Schema

This collection stores all routine documents, which can be either `TemplateRoutine`s or `UserCreatedRoutine`s, distinguished by the `routineType` field.

## Schema

```javascript
{
  // Common Fields (BaseRoutine)
  _id: ObjectId,
  name: String,
  description: String,
  difficulty: String, // "beginner", "intermediate", "advanced"
  goal: String, // "strength", "hypertrophy", "endurance", etc.
  duration: Number, // In weeks
  objectives: [String],
  workouts: [Workout | ObjectId], // Can contain embedded objects or references
  schemaVersion: String,
  createdAt: ISODateString,
  updatedAt: ISODateString,

  // Discriminator Key
  routineType: String, // "user-created" or "template"

  // Fields for "user-created" routines
  userId: ObjectId, // Supabase user ID
  createdBy: ObjectId, // Supabase user ID, same as userId
  isActive: Boolean,
  isFavorite: Boolean,
  completedWorkouts: Number,
  totalWorkouts: Number,
  lastUsed: ISODateString,

  // Fields for "template" routines
  templateType: String, // "trainer" or "company"
  createdBy: ObjectId, // Supabase user ID of creator
  allowCopy: Boolean,
  isPublic: Boolean,
  tags: [String],
  targetAudience: [String],
  parentRoutineId: ObjectId, // Links all versions together
  version: Number,
  isLatest: Boolean
}
```

*For detailed definitions of the embedded `Workout` structure, please see the [Workout Data Model](../data-models/workout.md).*

## Hybrid Model and Snapshot on Versioning

The power of this schema lies in its hybrid approach to reusability and its strict immutability for assigned routines.

-   **Reusability (During Creation)**: When a trainer builds a `TemplateRoutine`, the `workouts` array can contain a mix of:
    -   **`ObjectId` references** to specific versions of reusable workouts from the `workouts` collection.
    -   **Fully embedded workout objects** for custom, one-off workouts unique to this routine.

-   **Immutability (On Save)**: When a new version of the `TemplateRoutine` is saved, a **"snapshot on versioning"** process occurs. The application resolves all `ObjectId` references in the `workouts` array, fetches the corresponding data from the `workouts` collection, and embeds a full, deep copy of it. The final document in the `routines` collection contains **no references**, only embedded data.

This ensures that each version of a `TemplateRoutine` is a self-contained, immutable plan that will not be affected by later changes to the reusable workout templates.

## Indexes

```javascript
// For finding user-specific routines
{ userId: 1, isActive: 1 }
{ userId: 1, isFavorite: 1 }

// For finding the latest version of a template
{ parentRoutineId: 1, isLatest: 1 }

// For discovering public templates
{ isPublic: 1, templateType: 1, tags: 1 }
```
