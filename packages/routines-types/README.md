# @peakhealth/routines-types

This package contains TypeScript type definitions for the Routines feature. It serves as a single source of truth for data models shared between the frontend and backend applications.

## Types Included

- **Routine**: Base routine interface and specialized types (UserCreatedRoutine, TemplateRoutine)
- **Workout**: Different workout types (StrengthWorkout, RunningWorkout, etc.)
- **Section**: Various section types for different workout structures (WarmupSection, EmomSection, etc.)
- **Exercise**: Exercise types and their properties (StrengthExercise, BodyweightExercise, etc.)
- **Set**: Set types for tracking exercise performance (StrengthSet, BodyweightSet, etc.)
- **WorkoutSession**: For scheduled workout instances
- **WorkoutLog**: For tracking completed workouts and performance

## Usage

```typescript
import { 
  Routine, 
  Workout, 
  StrengthWorkout,
  Exercise,
  StrengthExercise
} from '@peakhealth/routines-types';

// Use the types in your application
const routine: Routine = {
  // ...
};

const workout: StrengthWorkout = {
  // ...
};
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test
```

