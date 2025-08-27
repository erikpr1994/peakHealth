# Routine Data Model

This document defines the data models for workout routines within the PeakHealth platform, designed for a MongoDB database. The architecture is based on a "reference and version" model to ensure that trainer and company routines remain immutable for users, while user-created routines are fully customizable.

---

## 1. Base Routine Interface

The `BaseRoutine` interface contains the core properties that are common across all routine types.

```typescript
interface BaseRoutine {
  _id: ObjectId;
  name: string;
  description?: string;
  difficulty: Difficulty;
  goal: Goal;
  duration: number; // weeks, 1-52
  objectives: string[];
  workouts: Workout[];
  
  // Metadata
  schemaVersion: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
```

---

## 2. Contextual Routine Types

These types represent the different kinds of routines in the system.

### A. User-Created Routine

A routine created by a user, for their own use. It is fully mutable by the user who owns it.

```typescript
interface UserCreatedRoutine extends BaseRoutine {
  userId: ObjectId;         // The user who owns and can edit this routine
  createdBy: ObjectId;      // Same as userId
  routineType: 'user-created';

  // User-specific progress and status
  isActive: boolean;
  isFavorite: boolean;
  completedWorkouts: number;
  totalWorkouts: number;
  lastUsed?: ISODateString;
}
```

### B. Template Routine

A read-only blueprint created by a trainer or the company. Users cannot modify these directly; instead, they are assigned a specific version to follow.

```typescript
interface TemplateRoutine extends BaseRoutine {
  routineType: 'template';
  templateType: 'trainer' | 'company';
  createdBy: ObjectId;      // The trainer or company user ID that owns the template

  // Permissions
  allowCopy: boolean; // If true, user can copy this template to create their own UserCreatedRoutine

  // Categorization and Discovery
  isPublic: boolean;
  tags?: string[];
  targetAudience?: string[]; // e.g., ['beginner', 'trail-runner']

  // Versioning Fields
  parentRoutineId: ObjectId;  // Links all versions of a routine together
  version: number;            // e.g., 1, 2, 3
  isLatest: boolean;          // Flag to easily find the most recent version
}
```

---

## 3. Routine Assignment Model

This is the central model for assigning routines. It links a user to a specific, immutable version of a `TemplateRoutine` and tracks all progress against it.

```typescript
interface RoutineAssignment {
  _id: ObjectId;
  routineVersionId: ObjectId; // Reference to a specific version of a TemplateRoutine
  parentRoutineId: ObjectId; // The parent ID, to track the overall routine being followed
  trainerId?: ObjectId;     // The trainer who assigned it (if applicable)
  userId: ObjectId;
  
  assignedAt: ISODateString;
  startDate?: ISODateString;
  endDate?: ISODateString;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  notesForUser?: string;

  // Progress tracking specific to this assignment
  progress: {
    completedWorkouts: number;
    totalWorkouts: number;
    lastWorkoutDate?: ISODateString;
    feedback?: string; // Feedback from the user to the trainer
  };
}
```

---

## 4. Key Workflows & Examples

### A. Versioning a Template Routine

1.  **Creation:** A trainer creates a new strength program. This creates a `TemplateRoutine` document with `version: 1`, `isLatest: true`, and a new `parentRoutineId`.
2.  **Assignment:** The trainer assigns this routine to a user. A `RoutineAssignment` is created, with `routineVersionId` pointing to the ID of the `v1` document.
3.  **User Progress:** The user follows the plan. The `v1` `TemplateRoutine` is never changed.
4.  **Update:** The trainer decides to improve the routine. On saving, the system:
    *   Updates the existing `v1` document, setting `isLatest: false`.
    *   Creates a **new** `TemplateRoutine` document with the changes, `version: 2`, `isLatest: true`, and the *same* `parentRoutineId`.
5.  **New Assignments:** Any new users will now be assigned `v2`. The original user remains on `v1`, unaffected. The trainer can later create a new assignment to "upgrade" them to `v2`.

### B. Assigning vs. Copying Routines

The `allowCopy` flag on a `TemplateRoutine` dictates how a user can interact with it.

#### **Assigning a Trainer Routine (allowCopy: false)**

This is for plans that must be followed exactly as prescribed.

-   A trainer creates a `TemplateRoutine` with `templateType: 'trainer'` and sets `allowCopy: false`.
-   The user is linked to the routine via a `RoutineAssignment`.
-   **Result**: The user can view and follow the routine, but they **cannot** edit it or save their own version of it.

#### **Copying a Company Routine (allowCopy: true)**

This is for templates designed to be a starting point.

-   The company creates a `TemplateRoutine` with `templateType: 'company'` and sets `allowCopy: true`.
-   A user finds this template and clicks "Copy to My Routines".
-   **Result**: The system creates a brand new `UserCreatedRoutine` document for the user, copying all the workout data. The user now has a personal, fully editable version of that routine.

---

## 5. Type Definitions

See [workout.md](./workout.md) for the `Workout` type definitions.

