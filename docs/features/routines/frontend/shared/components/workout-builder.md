# Shared Component: WorkoutBuilder

**File Path**: `packages/ui/src/components/routine-builder/WorkoutBuilder.tsx`

## 1. Summary

This is the most complex shared component in the feature. It provides the full, interactive, nested accordion interface for constructing the workouts and sections of a routine. It is the core of the Create/Edit Routine page.

## 2. Props

This component does not take any direct props, as it is the primary consumer of the `RoutineBuilderContext`.

## 3. UI and Interaction

The component orchestrates the nested structure of the builder:

- It renders a list of `WorkoutAccordion` components.
- It includes an `AddWorkoutButton` that dispatches an action to add a new, empty workout to the state.
- Each `WorkoutAccordion`, when expanded, reveals a list of section components (e.g., `WarmupSection`, `MainStrengthSection`) and an `AddSectionButton`.
- The `AddSectionButton` opens the `SectionTypeSelectionModal`.

## 4. State Management

- This is the main "orchestrator" component for the builder UI.
- It uses a `useRoutineWorkouts()` selector hook to get the list of workout IDs from the `RoutineBuilderContext`.
- It then maps over these IDs, rendering a `WorkoutAccordion` for each one and passing the `workoutId` as a prop.
