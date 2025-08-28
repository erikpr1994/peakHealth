# StrengthExercise Component

**File Path**: `packages/ui/src/components/routine-builder/StrengthExercise.tsx`

## 1. Summary

`StrengthExercise` is a crucial shared component used within various section components (like `WarmupSection`, `BasicSection`, etc.). It is built using the shared `Accordion` compound component to serve as an expandable container for a single exercise. The `Accordion.Header` displays the exercise's name, and the `Accordion.Body` reveals a detailed editor view when expanded.

This component is responsible for managing the sets, rest periods, and progression methods for a single strength-based exercise.

## 2. Props

```typescript
interface StrengthExerciseProps {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  showApproachSetsToggle?: boolean; // Controlled by parent section
  showProgressionMethods?: boolean; // Controlled by parent section
}
```

## 3. UI and Interaction

- **Initial State**: When a `StrengthExercise` component is first added to a section, it should appear in its **expanded** state by default.

### A. Header

- Displays the exercise's name.
- Includes a delete button that calls the `deleteExercise` function from the `useExercise` hook.
- Acts as the click target to expand/collapse the component's body.

### B. Body (Editor View)

When the component is expanded, it reveals the main editor interface:

- **Editor Controls**:
  - **Rest Between Sets**: An input field (e.g., `Input[type=number]`) to define the rest period in seconds or minutes after each set of this exercise.
  - **Progression Method**: A dropdown (`<select>`) that allows the user to choose a progression strategy for this exercise (e.g., "Linear Progression", "Double Progression"). This is a key feature we will discuss next.
- **`SetsTable`**: The core of the editor. It displays a table of all sets for the exercise.
  - It is composed of multiple `SetRow` components.
  - The table will visually distinguish between `warmup` (approach) sets and `working` sets.
  - Includes an `[+ Add Warmup Set]` and `[+ Add Working Set]` button to append a new `SetRow` of the correct type to the table.

### C. Unilateral Configuration

This component provides a flow for configuring unilateral exercises to ensure they are tracked correctly.

- **Automatic Trigger**: When a new unilateral exercise is first added to a section, the `UnilateralExerciseModal` will open automatically, prompting the user to make an immediate choice.
- **Manual Trigger for Editing**: For subsequent edits, a button labeled `[Edit Unilateral Config]` will always be visible in the editor body of a unilateral exercise. Clicking this button will re-open the `UnilateralExerciseModal`.
- **Modal (`UnilateralExerciseModal`)**: This modal allows the user to select their preferred training style. The choice is saved to the exercise's state via the `useExercise` hook.
  - See: [Unilateral Exercise Modal](./unilateral-exercise-modal.md) for a detailed breakdown.

### D. Approach Sets Wizard

To improve user experience, a wizard-like flow is used to add preparatory (ramp-up) sets.

- **Trigger**: A button labeled `[+ Generate Warmup Sets]` is displayed (controlled by the `showApproachSetsToggle` prop).
- **Modal (`ApproachSetGeneratorModal`)**: Opens a modal with the following options:
  - **Input**: A required input for **"First Working Set Weight"**. This value is used as the baseline for all percentage calculations.
  - **Strategy Selection**: A list of pre-configured ramp-up strategies for the user to choose from:
    - **Standard Ramp-up (3 Sets)**: e.g., 40%, 60%, 80%
    - **Quick Ramp-up (2 Sets)**: e.g., 50%, 75%
    - **Custom**: Allows the user to manually add and configure sets within the modal.
  - **Action**: A **"Generate Sets"** button.
- **Result**: Upon clicking "Generate Sets", the modal closes and the `warmup` sets are added to the main sets table, pre-populated with the calculated values.

### E. Progression Methods

The "Progression Method" dropdown modifies the UI and behavior of the `SetsTable`.

- **Visibility**: Controlled by the `showProgressionMethods` prop.
- **Dynamic Options**: Options are dynamically populated based on the exercise's metadata.

#### Architectural Approach: Component Mapping

To avoid a large `if/else` or `switch` statement, the `StrengthExercise` component will use a "Component Map" to render the correct editor for the selected progression method. This is a clean, composable, and scalable approach.

1.  **The Map**: A simple JavaScript object will map a progression method key to a specific editor component.

    ```javascript
    const progressionEditorMap = {
      MANUAL: WorkingSetsTable,
      LINEAR_PROGRESSION: WorkingSetsTable,
      DUAL_PROGRESSION: WorkingSetsTable,
      INVERSE_PYRAMID: InversePyramidEditor,
      MYO_REPS: MyoRepsEditor,
      // etc.
    };
    ```

2.  **Rendering**: The `StrengthExercise` component will use this map to dynamically render the correct child.

    ````jsx
    // Inside StrengthExercise.tsx
    const { exercise } = useExercise(workoutId, sectionId, exerciseId);
    const EditorComponent = progressionEditorMap[exercise.progressionMethod];

        return (
          <Accordion.Body>
            {/* ... other controls ... */}
            <EditorComponent workoutId={workoutId} sectionId={sectionId} exerciseId={exerciseId} />
          </Accordion.Body>
        );
        ```

    This ensures that each progression method's UI is encapsulated in its own component (e.g., `InversePyramidEditor`), which will be documented separately.
    ````

#### Method-Specific UIs

- **Manual Progression**: Uses the standard `WorkingSetsTable` editor with a single "Reps" input.
- **Linear Progression**: Uses the `WorkingSetsTable`.
  - **UI**: Shows a single "Reps" input and an "Increase Weight By" field.
  - **Set Templates**: Shows buttons for exact-rep schemes (e.g., `[5x5 Strength]`, `[3x8 Hypertrophy]`).
- **Dual Progression**: Uses the `WorkingSetsTable`.
  - **UI**: Shows "Min Reps" / "Max Reps" inputs and an "Increase Weight By" field.
  - **Set Templates**: Shows buttons for rep-range schemes (e.g., `[3x 8-12]`, `[4x 6-10]`).
- **Inverse Pyramid**: This method uses a dedicated `InversePyramidEditor` component.
  - See: [Inverse Pyramid Editor](./../progression-editors/inverse-pyramid-editor.md)
- **Myo-Reps, Widowmaker, AMRAP**: Each of these will use its own dedicated editor component.
  - See: [Myo-Reps Editor](./../progression-editors/myo-reps-editor.md)
  - See: [Widowmaker Editor](./../progression-editors/widowmaker-editor.md)

### F. Working Sets (`SetsTable`)

- This is the core of the editor, displaying the main "working" sets. It is visible when a method that uses a standard set/rep scheme is selected.

## 4. State Management

- To read its data and get pre-configured action dispatchers (like `updateName` and `deleteExercise`), it uses a dedicated selector hook: `useExercise(workoutId, sectionId, exerciseId)`.
