# Routine Builder Components

This directory contains UI components for the routine builder feature.

## Components

### SetRow

The `SetRow` component is the most fundamental building block of the routine builder. It represents a single set of an exercise and provides the inputs for configuring its targets.

#### Features

- Conditional rendering based on set type (Standard, AMRAP, Timed, To Failure)
- Support for different progression methods (standard reps vs min/max reps)
- Adapts UI based on unilateral configuration (simultaneous, alternating, sequential)
- Uses the `useSet` hook to get data and dispatch updates

#### Usage

```tsx
import { SetRow } from '@peakhealth/routines-ui';

// Inside a component that has access to RoutineBuilderContext
<SetRow
  workoutId="workout-1"
  sectionId="section-1"
  exerciseId="exercise-1"
  setId="set-1"
  exercise={exercise}
  side="left" // Optional, only for sequential unilateral exercises
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| workoutId | string | ID of the workout |
| sectionId | string | ID of the section |
| exerciseId | string | ID of the exercise |
| setId | string | ID of the set |
| exercise | Exercise | The exercise object |
| side | 'left' \| 'right' | Optional. Only used for sequential unilateral exercises |

