# MyoRepsEditor Component

**File Path**: `packages/ui/src/components/routine-builder/editors/MyoRepsEditor.tsx`

## 1. Summary

The `MyoRepsEditor` is a specialized component rendered by `StrengthExercise` when the "Myo-Reps" progression method is selected. It provides a dedicated UI for configuring this advanced training protocol.

## 2. Props

```typescript
interface MyoRepsEditorProps {
  exerciseId: string;
}
```

## 3. UI and Interaction

The editor's UI is a form that contains all the necessary inputs to define a Myo-Reps set.

-   **Activation Set**: Two `number` inputs for `Min Reps` and `Max Reps`.
-   **Mini-Sets**:
    -   An input for the number of mini-sets to perform.
    -   Two `number` inputs for `Min Reps` and `Max Reps` for the mini-sets.
-   **Rest Period**: An input for the short rest time between mini-sets (e.g., 15 seconds).

Unlike the Inverse Pyramid, this can be a simple inline form rather than a modal, as it has fewer inputs.

## 4. State Management

-   The component will use the `useExercise(exerciseId)` selector hook to get the current Myo-Reps configuration.
-   It will manage the state of its input fields locally.
-   **Automatic Updates**: To provide a seamless experience, there is no "Update" button. Instead, the component will dispatch an action to the `RoutineBuilderContext` automatically on the `onBlur` event of any of its input fields. This action will regenerate the `workingSets` using the latest configuration from the form.
