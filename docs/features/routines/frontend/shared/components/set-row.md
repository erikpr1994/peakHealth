# SetRow Component

**File Path**: `packages/ui/src/components/routine-builder/SetRow.tsx`

## 1. Summary

The `SetRow` is the most fundamental building block of the routine builder. It represents a single set of an exercise and provides the inputs for configuring its targets. It is designed to be highly flexible and context-aware.

## 2. Props

```typescript
interface SetRowProps {
  exerciseId: string;
  setId: string;
}
```

## 3. UI and Interaction

A `SetRow` is a single row in the `SetsTable`. It contains the following inputs:

### A. Set Type Dropdown
This is the core of the component's flexibility. It's a dropdown that allows the user to choose the type for this specific set.
-   **Standard (Default)**: The standard set type.
-   **AMRAP**: "As Many Reps As Possible."
-   **Timed**: A set performed for a specific duration.
-   **To Failure**: A set where the goal is to perform reps until muscular failure.

### B. Conditional Inputs
The inputs displayed in the rest of the row **change based on the "Set Type" selected**.

-   **If Type is "Standard"**:
    -   **Rep Inputs**: The component will check the `progressionMethod` of its parent `exercise`. If the method is `DUAL_PROGRESSION`, it will render two inputs for `Min Reps` and `Max Reps`. Otherwise, it will render a single `Reps` input.
    -   `Weight` (if the exercise is weight-trackable).
    -   `RPE`.
-   **If Type is "AMRAP" or "Timed"**:
    -   The "Reps" input is **replaced** by a `Time` input.
    -   `Weight` and `RPE` are still available.
-   **If Type is "To Failure"**:
    -   The "Reps" input is **hidden or disabled**, as the goal is undefined.
    -   `Weight` and `RPE` are still available.

This conditional logic allows for a huge degree of flexibility within a single, reusable component.

### C. Unilateral Configuration
The `SetRow` must also adapt its UI based on the `unilateralConfig` property of its parent exercise. This allows for the detailed tracking of exercises performed one limb at a time.

-   **`unilateralConfig: 'simultaneous'` (or `null`)**:
    -   Renders a single row with one set of inputs (e.g., `Reps: 12`, `Weight: 100`).
-   **`unilateralConfig: 'alternating'`**:
    -   Renders a single row but with duplicated inputs for each side.
    -   Example: `Set 1 | Left Reps: 12 | Right Reps: 12 | Weight: 50`
-   **`unilateralConfig: 'sequential'`**:
    -   In this case, the parent `SetsTable` component will be responsible for rendering two distinct `SetRow` instances for each logical set, passing a prop to label them (e.g., `side: 'L'` and `side: 'R'`).

## 4. State Management

-   The component uses a `useSet(exerciseId, setId)` selector hook to get its specific data from the `RoutineBuilderContext`.
-   This hook will also provide the pre-configured dispatchers for updating the set's properties (e.g., `updateSetType`, `updateReps`).
-   Updates are dispatched automatically on the `onBlur` event of the input fields.
