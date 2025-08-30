# Routine Builder Selector Hooks

This directory contains the suite of selector hooks that serve as the primary API for UI components to interact with the `RoutineBuilderContext`. These hooks are crucial for performance (via memoization) and for keeping UI components clean and free of state-querying logic.

## Available Hooks

### `useRoutineMetadata()`

Returns routine-level metadata and provides actions for updating routine properties.

**Returns:**

- `name`, `description`, `difficulty`, `goal`, `duration`, `objectives`
- `isActive`, `isFavorite`, `completedWorkouts`, `totalWorkouts`, `lastUsed`
- `updateRoutineName(name: string)` - Function to update routine name

**Usage:**

```tsx
const { name, description, updateRoutineName } = useRoutineMetadata();
```

### `useRoutineWorkouts()`

Returns all workouts in the routine and provides actions for workout management.

**Returns:**

- `workoutIds` - Array of workout IDs
- `workouts` - Array of workout objects
- `addWorkout(workout)` - Function to add a new workout
- `removeWorkout(workoutId)` - Function to remove a workout
- `updateWorkout(workoutId, updates)` - Function to update a workout

**Usage:**

```tsx
const { workoutIds, workouts, addWorkout } = useRoutineWorkouts();
```

### `useWorkout(workoutId)`

Returns data for a specific workout and provides actions for workout and section management.

**Returns:**

- `workout` - The workout object
- `sectionIds` - Array of section IDs in the workout
- `updateWorkout(updates)` - Function to update the workout
- `removeWorkout()` - Function to remove the workout
- `addSection(section)` - Function to add a new section
- `removeSection(sectionId)` - Function to remove a section
- `updateSection(sectionId, updates)` - Function to update a section
- `reorderSections(sectionIds)` - Function to reorder sections

**Usage:**

```tsx
const { workout, sectionIds, addSection } = useWorkout('workout-1');
```

### `useSection(workoutId, sectionId)`

Returns data for a specific section and provides actions for section and exercise management.

**Returns:**

- `section` - The section object
- `exerciseIds` - Array of exercise IDs in the section
- `updateSection(updates)` - Function to update the section
- `removeSection()` - Function to remove the section
- `addExercise(exercise)` - Function to add a new exercise
- `removeExercise(exerciseId)` - Function to remove an exercise
- `updateExercise(exerciseId, updates)` - Function to update an exercise
- `reorderExercises(exerciseIds)` - Function to reorder exercises

**Usage:**

```tsx
const { section, exerciseIds, addExercise } = useSection(
  'workout-1',
  'section-1'
);
```

### `useExercise(workoutId, sectionId, exerciseId)`

Returns data for a specific exercise and provides actions for exercise and set management.

**Returns:**

- `exercise` - The exercise object
- `setIds` - Array of set IDs in the exercise (only for exercises with sets)
- `updateExercise(updates)` - Function to update the exercise
- `removeExercise()` - Function to remove the exercise
- `addSet(set)` - Function to add a new set
- `removeSet(setId)` - Function to remove a set
- `updateSet(setId, updates)` - Function to update a set
- `reorderSets(setIds)` - Function to reorder sets

**Usage:**

```tsx
const { exercise, setIds, addSet } = useExercise(
  'workout-1',
  'section-1',
  'exercise-1'
);
```

### `useSet(workoutId, sectionId, exerciseId, setId)`

Returns data for a specific set and provides actions for set management.

**Returns:**

- `set` - The set object
- `updateSet(updates)` - Function to update the set
- `removeSet()` - Function to remove the set

**Usage:**

```tsx
const { set, updateSet } = useSet(
  'workout-1',
  'section-1',
  'exercise-1',
  'set-1'
);
```

## Performance Features

All hooks use `useMemo` to prevent unnecessary re-renders:

- Data is only recalculated when the relevant dependencies change
- Object references are stable between renders when data hasn't changed
- Components using these hooks will only re-render when their specific data changes

## Error Handling

All hooks include proper error handling:

- They throw an error if used outside of a `RoutineBuilderProvider`
- The error message clearly indicates the required context

## Type Safety

All hooks are fully typed with TypeScript:

- Return types are properly inferred
- Action function parameters are typed
- Integration with the `@peakhealth/routines-types` package ensures consistency

## Example Component Usage

```tsx
import { useSection } from '@peakhealth/routines-ui';

function SectionComponent({ workoutId, sectionId }) {
  const { section, exerciseIds, addExercise } = useSection(
    workoutId,
    sectionId
  );

  if (!section) return <div>Section not found</div>;

  return (
    <div>
      <h3>{section.name}</h3>
      <button onClick={() => addExercise(newExercise)}>Add Exercise</button>
      {exerciseIds.map(exerciseId => (
        <ExerciseComponent
          key={exerciseId}
          workoutId={workoutId}
          sectionId={sectionId}
          exerciseId={exerciseId}
        />
      ))}
    </div>
  );
}
```
