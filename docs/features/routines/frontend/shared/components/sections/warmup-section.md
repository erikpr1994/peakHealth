# WarmupSection Component

**File Path**: `packages/ui/src/components/routine-builder/sections/WarmupSection.tsx`

## 1. Summary

The `WarmupSection` is a specialized component used within the `WorkoutBuilder`. It provides a structured interface for adding and configuring warm-up exercises.

It is built using the shared `Accordion` compound component to achieve its expandable and nested structure. It is also visually distinct from other section types (e.g., via a unique color or icon) to provide clear context to the user.

## 2. Props

```typescript
interface WarmupSectionProps {
  workoutId: string;
  sectionId: string;
}
```

## 3. UI and Interaction

The component's entire structure is rendered using a top-level `Accordion` component. The `Accordion.Header` contains the section's title and controls, while the `Accordion.Body` contains the list of exercises. Each exercise is, in turn, rendered inside its own nested `Accordion`.

### A. Empty State

-   If no exercises have been added, the component displays an **`Add your first warm-up exercise`** button.
-   **Interaction**: Clicking this button opens the shared `ExerciseLibraryModal`.
    -   **Smart Filtering**: The modal is opened with an initial filter applied to show exercises suitable for a warm-up (e.g., `category: 'warm-up'` or `category: 'flexibility'`). This provides a guided and efficient user experience.

### B. Exercise List

-   When a new exercise is added from the `ExerciseLibraryModal`, it appears in the list as a `StrengthExercise` component.
-   **Default State**: The new `StrengthExercise` accordion should be **expanded by default**, allowing the user to immediately begin adding sets and configuring the exercise.
-   This allows for a clean, nested structure where the user can focus on one exercise at a time.

## 4. Component Dependencies

-   **`Accordion` (Shared)**: This component is built using the shared `Accordion` to provide its core expandable/collapsible functionality.
-   **`StrengthExercise`**: This is the primary child component rendered within the `Accordion.Body` for each exercise. It is responsible for managing all the details of an individual exercise, including its sets.
    -   **Configuration**: When rendering `StrengthExercise` components, the `WarmupSection` will pass the following props:
        -   `showApproachSetsToggle={false}`: This correctly hides the "Add Approach Sets" button.
        -   `showProgressionMethods={false}`: This correctly hides the "Progression Method" dropdown.
-   **`ExerciseLibraryModal` (Shared)**: This modal is **invoked** by the `WarmupSection` to allow the user to select and add new exercises.

## 5. State Management

-   The component manages its own transient UI state.
-   To get its data (e.g., the list of exercise IDs) and to get all action dispatchers (like `addExercise`, `deleteSection`, `moveSectionUp`), it uses a dedicated selector hook: `useSection(workoutId, sectionId)`. This hook consumes the main `RoutineBuilderContext` and returns everything this component needs to function.
