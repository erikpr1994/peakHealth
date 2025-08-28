# TabataSection Component

**File Path**: `packages/ui/src/components/routine-builder/sections/TabataSection.tsx`

## 1. Summary

The `TabataSection` component provides a UI for creating Tabata-style high-intensity interval training blocks. It allows the user to configure the work/rest intervals, the number of rounds, and the exercises to be performed.

It is built using the shared `Accordion` component.

## 2. Props

```typescript
interface TabataSectionProps {
  workoutId: string;
  sectionId: string;
}
```

## 3. UI and Interaction

The `Accordion.Body` contains configuration inputs and the exercise list.

### A. Configuration

A form with inputs specific to Tabata:

- **Work Interval**: Input for the duration of the high-intensity work period (e.g., "20s").
- **Rest Interval**: Input for the duration of the rest period (e.g., "10s").
- **Number of Rounds**: Input for how many total rounds to perform.

### B. Exercise List

- A list where the user can add one or more `StrengthExercise` components.
- Typically, Tabata involves only one or two exercises.

## 4. State Management

- It uses the `useSection(workoutId, sectionId)` selector hook to get its data and action dispatchers from the `RoutineBuilderContext`.
- The hook will provide specific handlers like `updateTabataConfig`.
