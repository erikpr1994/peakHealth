# Routine Builder Context

This module provides state management for building and editing workout routines using React Context and useReducer.

## Overview

The Routine Builder Context manages the state of a workout routine, including:

- Routine metadata (name, description, difficulty, etc.)
- Workouts within the routine
- Workout sections and exercises

## Architecture

### State Shape

The state follows the `UserCreatedRoutine` type from `@peakhealth/routines-types`, which includes:

- Basic routine information (name, description, difficulty, goal)
- Array of workouts with their sections and exercises
- Metadata (creation date, completion tracking, etc.)

### Actions

The context supports the following actions:

#### Routine Actions

- `UPDATE_ROUTINE_NAME`: Update the routine name

#### Workout Actions

- `ADD_WORKOUT`: Add a new workout to the routine
- `REMOVE_WORKOUT`: Remove a workout from the routine
- `UPDATE_WORKOUT`: Update workout properties (name, notes, etc.)

### Reducers

State mutations are handled by pure functions in the `reducers/` directory:

- `routineReducer.ts`: Handles routine-level mutations
- `workoutReducer.ts`: Handles workout-level mutations

## Usage

### Basic Setup

```tsx
import { useRoutineBuilder } from '@peakhealth/routines-ui';
import { RoutineBuilderProvider } from '@peakhealth/routines-ui';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

const MyComponent = () => {
  const initialState: UserCreatedRoutine = {
    // ... initial routine state
  };

  const { state, dispatch } = useRoutineBuilder(initialState);

  return (
    <RoutineBuilderProvider value={{ state, dispatch }}>
      {/* Your components */}
    </RoutineBuilderProvider>
  );
};
```

### Using the Context

```tsx
import { useRoutineBuilderContext } from '@peakhealth/routines-ui';
import { Workout } from '@peakhealth/routines-types';

const WorkoutList = () => {
  const { state, dispatch } = useRoutineBuilderContext();

  const handleAddWorkout = () => {
    const newWorkout: Workout = {
      _id: `workout-${Date.now()}`,
      name: 'New Workout',
      type: 'strength',
      orderIndex: state.workouts.length,
      sections: [],
    } as Workout;

    dispatch({
      type: 'ADD_WORKOUT',
      payload: { workout: newWorkout },
    });
  };

  const handleUpdateRoutineName = (name: string) => {
    dispatch({
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name },
    });
  };

  return (
    <div>
      <h1>{state.name}</h1>
      <button onClick={handleAddWorkout}>Add Workout</button>
      {state.workouts.map(workout => (
        <div key={workout._id}>
          {workout.name} - {workout.type}
        </div>
      ))}
    </div>
  );
};
```

## Testing

The module includes comprehensive tests for:

- Individual reducer functions
- Main reducer integration
- Context provider and hooks
- Example component usage

Run tests with:

```bash
pnpm test
```

## Example Component

See `RoutineBuilderExample.tsx` for a complete example of how to use the context in a React component.

## Future Enhancements

Planned features include:

- Section management (add/remove/update sections)
- Exercise management within sections
- Workout reordering
- Validation and error handling
- Persistence and synchronization
