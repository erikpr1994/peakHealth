# workouts Collection Schema

This collection stores reusable, version-controlled workout templates that can be referenced when building a `TemplateRoutine`. This allows trainers to create a library of standard workouts.

## Schema

```javascript
{
  _id: ObjectId,
  name: String,
  type: String, // "strength", "running", etc.
  objective: String,
  notes: String,
  sections: [Section | ObjectId], // Can contain embedded objects or references
  schemaVersion: String,
  createdAt: ISODateString,
  updatedAt: ISODateString,

  // Creator and Discovery
  createdBy: ObjectId, // Supabase user ID of creator
  isPublic: Boolean,
  tags: [String],

  // Versioning Fields
  parentWorkoutId: ObjectId, // Links all versions of a workout together
  version: Number,
  isLatest: Boolean,

  // Lifecycle Fields
  isArchived: Boolean, // Defaults to false
  purgeAt: ISODateString // Timestamp for scheduled permanent deletion
}
```

*For detailed definitions of the `Section` structure, see the data models and the `sections` collection schema.*

## Hybrid Model

The `sections` array uses a hybrid model, allowing for maximum flexibility during creation:
-   **Reference**: An element can be an `ObjectId` referencing a specific version of a document in the `sections` collection.
-   **Embed**: An element can be a full, embedded section object for a custom, one-off section unique to this workout.

## Indexes

```javascript
// For finding the latest version of a workout template
{ parentWorkoutId: 1, isLatest: 1 }

// For discovering public templates
{ isPublic: 1, type: 1, tags: 1 }

// For search by creator
{ createdBy: 1 }
```
