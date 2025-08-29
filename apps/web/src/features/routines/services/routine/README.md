# Routine Service

This directory contains the Mongoose models and services for managing workout routines in the PeakHealth platform.

## Models

### UserCreatedRoutine

The `UserCreatedRoutineModel` is a Mongoose model that represents routines created by users. These routines are fully mutable by the user who owns them.

#### Schema

The schema follows the `UserCreatedRoutine` interface from the `@peakhealth/routines-types` package and includes:

- Basic routine information (name, description, difficulty, etc.)
- Workout details
- User-specific progress tracking
- Metadata (creation/update timestamps, schema version)

#### Usage

```typescript
import { UserCreatedRoutineModel } from '@/features/routines/services/routine';

// Create a new user routine
const newRoutine = new UserCreatedRoutineModel({
  name: 'My Custom Workout',
  difficulty: 'intermediate',
  goal: 'strength',
  // ... other required fields
});

// Save the routine
await newRoutine.save();

// Find routines for a specific user
const userRoutines = await UserCreatedRoutineModel.find({ userId: 'user123' });
```

## Future Models

Additional models for `TemplateRoutine` and `RoutineAssignment` will be implemented in future tasks.
