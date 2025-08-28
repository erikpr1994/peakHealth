# Shared Component: SectionTypeSelectionModal

**File Path**: `packages/ui/src/components/routine-builder/SectionTypeSelectionModal.tsx`

## 1. Summary

A simple modal that is opened from the `WorkoutBuilder` when a user clicks the "Add Section" button. It presents the user with a choice of which type of section they would like to add to their workout.

## 2. Props

```typescript
interface SectionTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId: string;
}
```

## 3. UI and Interaction

- The modal displays a list of available section types (e.g., "Warm-up", "Main Strength", "Cardio", "Cooldown").
- Each option is a button or a card.
- Clicking an option dispatches an action to the `RoutineBuilderContext` to add a new section of the selected type to the specified `workoutId`. The modal then closes.

## 4. State Management

- The modal's open/closed state is managed by the parent `WorkoutBuilder`.
- It uses the `dispatch` function from the `useRoutineBuilderContext` to add the new section.
