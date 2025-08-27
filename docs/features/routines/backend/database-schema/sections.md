# sections Collection Schema

This collection stores reusable, version-controlled workout section templates. These are the smallest building blocks for creating workouts, promoting consistency and reusability.

## Schema

```javascript
{
  _id: ObjectId,
  name: String,
  type: String, // "warmup", "basic", "emom", "intervals", etc.
  notes: String,
  restAfter: DurationString,
  exercises: [Exercise], // Embedded exercise structure
  schemaVersion: String,
  createdAt: ISODateString,
  updatedAt: ISODateString,

  // Creator and Discovery
  createdBy: ObjectId, // Supabase user ID of creator
  isPublic: Boolean,
  tags: [String],

  // Versioning Fields
  parentSectionId: ObjectId, // Links all versions of a section together
  version: Number,
  isLatest: Boolean,

  // Lifecycle Fields
  isArchived: Boolean, // Defaults to false
  purgeAt: ISODateString // Timestamp for scheduled permanent deletion
}
```

*For detailed definitions of the embedded `Exercise` structure, please see the [Exercise Data Model](../data-models/exercises.md).*

## Indexes

```javascript
// For finding the latest version of a section template
{ parentSectionId: 1, isLatest: 1 }

// For discovering public templates
{ isPublic: 1, type: 1, tags: 1 }

// For search by creator
{ createdBy: 1 }
```
