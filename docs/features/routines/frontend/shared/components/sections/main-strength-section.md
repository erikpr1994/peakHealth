# MainStrengthSection Component

**File Path**: `packages/ui/src/components/routine-builder/sections/MainStrengthSection.tsx`

## 1. Summary

The `MainStrengthSection` is the core component for building the primary strength-training portions of a workout. It is used within the `WorkoutBuilder` to house the main exercises that the user will perform.

Like all section components, it is built using the shared `Accordion` compound component and is visually distinct with its own color or icon.

## 2. UI and Interaction

Its structure is nearly identical to the `WarmupSection`, using a main `Accordion` to contain a list of nested `StrengthExercise` accordions.

The key difference is in how it configures its child components.

## 3. Props

```typescript
interface MainStrengthSectionProps {
  workoutId: string;
  sectionId: string;
}
```

## 4. Component Dependencies

-   **`Accordion` (Shared)**: Provides the core expandable/collapsible functionality.
-   **`StrengthExercise`**: The primary child component for each exercise.
    -   **Configuration**: The `MainStrengthSection` will pass the following props to each `StrengthExercise` component:
        -   `showApproachSetsToggle={true}`: This **enables** the `[+ Add Approach Sets]` button.
        -   `showProgressionMethods={true}`: This **enables** the "Progression Method" dropdown.
-   **`ExerciseLibraryModal` (Shared)**: Invoked to add new exercises to the section. Unlike the `WarmupSection`, this can be opened with a more general filter (e.g., `category: 'strength'`).

## 5. State Management

-   To get its data and all relevant action dispatchers (like `addExercise` and `deleteSection`), it uses the `useSection(workoutId, sectionId)` selector hook.
