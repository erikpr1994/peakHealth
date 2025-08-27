# UnilateralExerciseModal Component

**File Path**: `packages/ui/src/components/routine-builder/UnilateralExerciseModal.tsx`

## 1. Summary

This is a shared modal component responsible for one specific task: allowing a user to choose how they want to perform a unilateral exercise. It is triggered from the `StrengthExercise` component.

## 2. Props

```typescript
interface UnilateralExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
}
```

## 3. UI and Interaction

The modal presents the user with three clear, card-based options. Each card contains a title, a brief explanation, and an icon or simple graphic to visually represent the concept. When a user clicks an option, the component will call the `updateUnilateralConfig` function from its state management hook.

-   **Option 1: Simultaneous**
    -   **Description**: "Perform the exercise with both limbs at the same time."
    -   **Behavior**: This is the default state. Selecting this sets the `unilateralConfig` to `'simultaneous'`.

-   **Option 2: Alternating (within the same set)**
    -   **Description**: "Alternate between the left and right limb for each rep within a single set."
    -   **Behavior**: Selecting this sets the `unilateralConfig` to `'alternating'`. The `SetRow` will then render duplicated inputs for Left/Right reps.

-   **Option 3: Sequential (alternating sets)**
    -   **Description**: "Complete all sets for one limb before moving on to the other."
    -   **Behavior**: Selecting this sets the `unilateralConfig` to `'sequential'`. The parent `SetsTable` will then render two distinct `SetRow`s for each logical set (e.g., "Set 1 L", "Set 1 R").

## 4. State Management

-   The modal follows the same context-based pattern as the rest of the routine builder components.
-   It uses the `useExercise(exerciseId)` selector hook to get the `exercise.unilateralConfig` to highlight the currently active selection.
-   It also gets the `updateUnilateralConfig` dispatcher from the same hook to update the central state directly when the user makes a selection.
