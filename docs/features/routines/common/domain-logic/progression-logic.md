# Progression Logic

**File Path**: `apps/web/src/features/routines/utils/progression-logic.ts`

## 1. Summary

This file contains pure business logic functions for **generating** arrays of sets to pre-populate the UI within the Routine Builder. These functions are called from wizards and modals to provide a better user experience.

The logic for *applying* progressions after a workout (e.g., increasing weight) belongs to the **Workout Tracker** domain, not the builder.

## 2. Core Functions

### `generateInversePyramidSets(config: { startWeight: number, endWeight: number, numSets: number, startReps: number, endReps: number }): Set[]`
-   **Purpose**: Generates the sets for an "Inverse Pyramid" progression.
-   **Behavior**: Takes a configuration object and calculates the intermediate weight and rep values for each set, creating a linear interpolation from the start to end values.
-   **Usage**: Called from a wizard or modal when the user selects the "Inverse Pyramid" method, to pre-populate the `SetsTable`.
-   **Returns**: A new array of sets configured for an inverse pyramid.

### `generateMyoRepsSets(config: { activationReps: string, numMiniSets: number, miniSetReps: string }): Set[]`
-   **Purpose**: Generates the sets for a "Myo-Reps" protocol.
-   **Behavior**: Creates an array of sets, starting with the main activation set, followed by the specified number of mini-sets.
-   **Returns**: A new array of sets configured for Myo-Reps.

### `generateWidowmakerSet(config: { targetReps: number }): Set[]`
-   **Purpose**: Generates the single set for a "Widowmaker" exercise.
-   **Behavior**: Creates an array containing a single set with the specified rep target.
-   **Returns**: An array with a single set object.

### `generateAmrapConfig(config: { timeLimit: number }): AmrapConfig`
-   **Purpose**: Creates the configuration object for an AMRAP exercise.
-   **Behavior**: This method doesn't generate traditional sets. Instead, it creates a configuration object that the live workout UI will use to run a timer.
-   **Returns**: An object like `{ type: 'AMRAP', timeLimit: 600 }` (in seconds).

### `generateTemplateSets(config: { numSets: number, reps: number | string }): Set[]`
-   **Purpose**: Generates a standard array of sets based on a template.
-   **Behavior**: Creates an array of `numSets` length, where each set has its `reps` property set to the provided value. This can handle both exact reps (e.g., 5) and rep ranges (e.g., "8-12").
-   **Usage**: Called from the "Set Template" modal to pre-populate the `SetsTable`.
-   **Returns**: A new array of sets.
