# WidowmakerEditor Component

**File Path**: `packages/ui/src/components/routine-builder/editors/WidowmakerEditor.tsx`

## 1. Summary

The `WidowmakerEditor` is a simple component rendered by `StrengthExercise` when the "Widowmaker" progression method is selected. It provides a UI to configure the single, high-rep set.

## 2. Props

```typescript
interface WidowmakerEditorProps {
  exerciseId: string;
}
```

## 3. UI and Interaction

The editor's UI is a very simple inline form.

-   **Target Reps**: A single input field, which defaults to 20, to set the rep target for the widowmaker set.

## 4. State Management

-   It uses the `useExercise(exerciseId)` selector hook to get the current rep target for the single set.
-   It uses local state for the input field.
-   **Automatic Updates**: To provide a seamless experience, there is no "Update" button. The component will dispatch an action to the `RoutineBuilderContext` automatically on the `onBlur` event of the input field.
