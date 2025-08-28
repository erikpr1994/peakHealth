# CircuitSection Component

**File Path**: `packages/ui/src/components/routine-builder/sections/CircuitSection.tsx`

## 1. Summary

The `CircuitSection` component is used to build a circuit training block, where a user performs a series of exercises in sequence with minimal rest, completing a set number of rounds.

It is built using the shared `Accordion` component.

## 2. Props

```typescript
interface CircuitSectionProps {
  workoutId: string;
  sectionId: string;
}
```

## 3. UI and Interaction

The `Accordion.Body` contains configuration inputs and the exercise list.

### A. Configuration

A form with inputs specific to a circuit:

- **Number of Rounds**: An input to define how many times the user will complete the entire circuit.
- **Rest Between Rounds**: An input for the duration of the rest period after each full round is completed.

### B. Exercise List

- A list of `StrengthExercise` components that make up the circuit.
- The exercises will be performed in the order they appear in this list.

## 4. State Management

- It uses the `useSection(workoutId, sectionId)` selector hook to get its data and action dispatchers from the `RoutineBuilderContext`.
- The hook will provide specific handlers like `updateCircuitConfig`.
