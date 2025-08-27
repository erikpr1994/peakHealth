# InversePyramidEditor Component

**File Path**: `packages/ui/src/components/routine-builder/editors/InversePyramidEditor.tsx`

## 1. Summary

The `InversePyramidEditor` is a specialized component used within the `StrengthExercise` component. It is rendered when the user selects "Inverse Pyramid" as the progression method. Its purpose is to provide a wizard-like interface for generating the sets of an inverse pyramid.

## 2. Props

```typescript
interface InversePyramidEditorProps {
  exerciseId: string;
}
```

## 3. UI and Interaction

The editor's UI is very simple. It consists of:
1.  A **`SetsTable`** component that displays the currently generated pyramid sets. These sets are read-only in this view.
2.  A **`[Configure Pyramid]`** button.

### The Wizard Modal

-   Clicking the button opens a modal for configuring the pyramid.
-   **Inputs**: The modal contains inputs for:
    -   Number of Sets
    -   Start Weight / End Weight
    -   Start Reps / End Reps
-   **Action**: A "Generate Sets" button.
-   **Behavior**: When the user confirms the configuration, the modal closes. The component calls the `generateInversePyramidSets` pure logic function with the input values. It then dispatches an action to the `RoutineBuilderContext` to replace the exercise's current `workingSets` with the newly generated sets.

## 4. State Management

-   The component is primarily controlled by the central `RoutineBuilderContext`.
-   It uses the `useExercise(exerciseId)` selector hook to get the current `workingSets` to display in the table.
-   It uses the `dispatch` function from the context to update the sets after the wizard is completed.
-   The state for the wizard's input fields is managed locally within the modal itself.
