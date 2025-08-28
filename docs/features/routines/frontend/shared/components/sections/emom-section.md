# EMOMSection Component

**File Path**: `packages/ui/src/components/routine-builder/sections/EMOMSection.tsx`

## 1. Summary

The `EMOMSection` component is a specialized section for creating "Every Minute on the Minute" workout blocks. It provides a dedicated UI for setting the total time, the work to be performed each minute, and the list of exercises included.

It is built using the shared `Accordion` component.

## 2. Props

```typescript
interface EMOMSectionProps {
  workoutId: string;
  sectionId: string;
}
```

## 3. UI and Interaction

The `Accordion.Body` of this component contains two parts: configuration and the exercise list.

### A. Configuration

A form with inputs specific to an EMOM workout:

- **Total Time**: An input to set the total duration of the EMOM in minutes.
- **Work Interval**: A dropdown to select what happens each minute (e.g., "Perform all exercises," "Perform one exercise per minute (alternating)").

### B. Exercise List

- A standard list of `StrengthExercise` components, added via the `ExerciseLibraryModal`.
- The configuration for these exercises is simplified, focusing on reps, as the timing is controlled by the section itself.

## 4. State Management

- It uses the `useSection(workoutId, sectionId)` selector hook to get its data and action dispatchers from the `RoutineBuilderContext`.
- The hook will provide specific handlers like `updateEmomConfig` to manage the section's unique properties.
