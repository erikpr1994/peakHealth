# Page: Create/Edit Routine (`/routines/new`, `/routines/:id/edit`)

This is the interactive builder where users can create a new `UserCreatedRoutine` from scratch or modify an existing one. This page and its core components are designed with reusability in mind, as a more advanced version will be used by trainers in the Trainer App.

## 1. Layout

The page will have a main content area for the form and a sticky footer containing the primary "Save" and "Cancel" actions to ensure they are always accessible.

## 2. State Management

The entire state for the routine builder is managed by a single, page-level hook, `useRoutineBuilder`. This hook's state and dispatch function are then provided to the entire component tree via a dedicated `RoutineBuilderProvider`.

This architecture provides a single source of truth and eliminates prop drilling, as any nested component can access the state and actions it needs by using the `useRoutineBuilderContext` consumer hook and dedicated selector hooks.

For more details, see:
-   [Routine Builder Context Documentation](./../shared/hooks/use-routine-builder.md)

## 3. Component Breakdown

### A. `RoutineBuilderHeader`
-   **Purpose**: A header that clearly indicates whether the user is in "Create" or "Edit" mode.

### B. `RoutineMetadataForm` (Shared Component)
-   **Purpose**: A form for editing the high-level details of the routine.
-   **Fields**: Name, Description, Difficulty, Goal, etc.

### C. `WorkoutBuilder` (Shared Component)
-   **Purpose**: The core of the page. An interactive, nested accordion interface for building the structure of the routine.
-   **Components**:
    -   `AddWorkoutButton`: Adds a new `WorkoutAccordion` to the list.
    -   `WorkoutAccordion`: A draggable, expandable component for a single workout.
        -   **Header**: Contains the workout title (e.g., "Day 1: Upper Body").
        -   **Body**: When expanded, it reveals a list of `SectionAccordion`s and an `AddSectionButton`.
    -   `AddSectionButton`: Opens the `SectionTypeSelectionModal` to add a new section.
    -   `SectionAccordion`: A draggable, expandable component for a single section, color-coded by type. See the links below for detailed documentation on each specific section type.
        -   [Warmup Section](./../../shared/components/sections/warmup-section.md)
        -   [Main Strength Section](./../../shared/components/sections/main-strength-section.md)
        -   _(More links will be added here as other section types are defined)_

### D. `StickyFooter`
-   **Purpose**: A footer that is always visible at the bottom of the screen.
-   **Components**:
    -   `SaveButton`: Saves the routine.
    -   `CancelButton`: Discards changes and navigates away.

## 4. User Interaction Flow (Create)

1.  User clicks "Create New" on the dashboard.
2.  The `useRoutineBuilder` hook initializes an empty routine.
3.  User fills out the `RoutineMetadataForm`. Changes are dispatched via the context.
4.  User uses the `WorkoutBuilder` to add and define their workouts, sections, and exercises. Each action dispatches an update.
5.  When finished, the user clicks "Save".
6.  A `saveRoutine` function (likely returned from the `useRoutineBuilder` hook) is called, which first validates the state and then sends the `POST` request to the API.
