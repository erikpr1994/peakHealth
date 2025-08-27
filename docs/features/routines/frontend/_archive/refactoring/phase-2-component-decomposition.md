# Phase 2: Hyper-Granular Component Decomposition

## Overview

Break down large components into smaller, focused pieces with clear separation of concerns.

## 🔄 PR #13 (Enhanced): Break Down SetManagement.tsx

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/components/workout-forms/strength/SetManagement.tsx`

### New Proposed File Structure

```
features/routines/features/routine-creation/components/workout-forms/strength/
├── SetManagement/
│   ├── SetManagement.tsx       # The orchestrator component
│   ├── SetActions.tsx          # "Add Approach Sets" button
│   ├── SetHeader.tsx
│   ├── SetRow.tsx
│   └── SetTypeSelector.tsx
├── hooks/
│   ├── useSetManagementState.ts
│   └── useSetManagementHandlers.ts
├── types/
│   └── setManagement.ts
└── ...
```

### Detailed Breakdown & Code Snippets

#### useSetManagementState.ts: Pure state management. No side effects.

```typescript
// hooks/useSetManagementState.ts
export const useSetManagementState = initialSets => {
  const [sets, setSets] = useState(initialSets);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  // ... more state variables

  const hasApproachSets = useMemo(
    () => sets.some(s => s.type === 'approach'),
    [sets]
  );

  return { sets, openPopoverId, hasApproachSets, setSets, setOpenPopoverId };
};
```

#### useSetManagementHandlers.ts: All the functions that do things.

```typescript
// hooks/useSetManagementHandlers.ts
export const useSetManagementHandlers = (state, setState) => {
  const handleAddSet = () => {
    /* ... */
  };
  const handleRemoveSet = id => {
    /* ... */
  };
  const handleUpdateSet = (id, newValues) => {
    /* ... */
  };

  return { handleAddSet, handleRemoveSet, handleUpdateSet };
};
```

#### SetManagement.tsx: Now a lean, mean, orchestrating machine.

```typescript
// components/SetManagement/SetManagement.tsx
export const SetManagement = ({ initialSets }) => {
  const { sets, ...state } = useSetManagementState(initialSets);
  const handlers = useSetManagementHandlers(
    { sets, ...state },
    /* setState functions */
  );

  return (
    <div>
      <SetHeader />
      {sets.map(set => <SetRow key={set.id} set={set} {...handlers} />)}
      <SetActions {...handlers} />
    </div>
  );
};
```

### Benefits of this approach

- **Extreme Readability**: The main component is now declarative and easy to scan
- **Testability**: We can test the state logic and the handlers in complete isolation from the UI
- **Reusability**: The `useSetManagementHandlers` hook could potentially be reused elsewhere

### Detailed Breakdown

1. **Extract Types** (25 lines):
   - Move `SetType`, `RepType`, `ProgressionMethod`, `WorkoutSet`, `SetManagementProps` to `types/setManagement.ts`
   - Create focused type definitions

2. **Extract Configuration** (100 lines):
   - Move `getProgressionConfig()` → `domain/setConfiguration.ts`
   - Create `SetConfiguration` class/object
   - Add comprehensive tests for configuration logic

3. **Extract Utility Functions** (50 lines):
   - `getSetDisplay()` → `utils/setDisplayUtils.ts`
   - `getSetTypeColor()` → `utils/setDisplayUtils.ts`
   - `setTypeOptions` → `utils/setDisplayUtils.ts`
   - Add comprehensive tests for utility functions

4. **Create Specialized Components**:
   - `SetRow.tsx` (80 lines) - Individual set row with all inputs
   - `SetTypeSelector.tsx` (40 lines) - Set type dropdown with popover
   - `RepsInput.tsx` (60 lines) - Reps input with range/fixed logic
   - `SetActions.tsx` (30 lines) - Add/remove approach sets buttons
   - `SetHeader.tsx` (25 lines) - Sets table header
   - `EmptyState.tsx` (20 lines) - Empty state display
   - `SetNotesButton.tsx` (35 lines) - Notes button with display logic

5. **Extract Event Handlers** (80 lines):
   - `addSet()`, `removeSet()`, `updateSet()` → `hooks/useSetManagementHandlers.ts`
   - `handleSetTypeChange()` → `hooks/useSetManagementHandlers.ts`
   - Add comprehensive tests for handlers

6. **Simplify Main Component** (60 lines):
   - Use component composition pattern
   - Use extracted `useSetManagementState` hook
   - Use extracted `useSetManagementHandlers` hook
   - Focus on JSX orchestration only
   - Remove complex conditional logic

**Target:** < 300 lines (from 571 lines)

## 🔄 PR #14: Break Down DynamicWeightInput Component

**Status:** PENDING  
**Files:** `features/routines/features/workout-management/components/DynamicWeightInput.tsx`

### Changes

- Extract smaller components from DynamicWeightInput.tsx (257 lines)
- Create focused components:
  - `BodyweightInput.tsx` - Bodyweight-specific input
  - `FreeWeightInput.tsx` - Free weight input
  - `ResistanceBandInput.tsx` - Resistance band input
- Extract utility functions to separate file
- Focus on component composition

### Detailed Breakdown

1. **Extract Types** (5 lines):
   - Move `WeightInputType` and `WeightInputProps` to `types/weightInput.ts`
   - Create focused type definitions

2. **Extract Utility Functions** (80 lines):
   - `getWeightInputType()` → `utils/weightInputUtils.ts`
   - `getTooltipText()` → `utils/weightInputUtils.ts`
   - `getBodyweightDisplayText()` → `utils/weightInputUtils.ts`
   - Add comprehensive tests for utility functions

3. **Create Specialized Components**:
   - `BodyweightInput.tsx` (30 lines) - Pure bodyweight display
   - `BodyweightPlusInput.tsx` (50 lines) - Bodyweight + added weight
   - `ResistanceBandInput.tsx` (40 lines) - Resistance band selection
   - `FreeWeightInput.tsx` (25 lines) - Standard number input
   - `MachineInput.tsx` (25 lines) - Machine weight input
   - `CableInput.tsx` (25 lines) - Cable weight input

4. **Simplify Main Component** (50 lines):
   - Use component composition pattern
   - Route to appropriate specialized component based on equipment type
   - Remove complex conditional logic
   - Focus on orchestration only

**Target:** < 200 lines (from 257 lines)

## 🔄 PR #28: Break Down RoutineCreation Component

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/`

### Changes

- Break down massive RoutineCreation component (672 lines)
- Extract state management into custom hooks
- Separate business logic from UI components
- Improve component organization and maintainability

### Detailed Breakdown

1. **Extract State Management Hooks** (3 new hooks):
   - **`useRoutineCreationState.ts`** (already exists, but needs enhancement):
     - Centralize all routine metadata state
     - Handle collapse states for workouts
     - Manage running workout creation/editing states
   - **`useRoutineWorkoutState.ts`** (new):
     - Manage strength and running workout state
     - Handle workout operations (add, remove, move, update)
     - Centralize workout-related state logic
   - **`useRoutineModalState.ts`** (new):
     - Manage all modal states (exercise selection, notes)
     - Handle modal context and operations
     - Centralize modal-related logic

2. **Extract Business Logic Hooks** (2 new hooks):
   - **`useRoutineOperations.ts`** (new):
     - Handle exercise selection logic
     - Manage approach sets operations
     - Handle notes operations
     - Centralize all business operations
   - **`useRoutineDataTransformation.ts`** (new):
     - Handle data loading for editing
     - Transform database data to frontend format
     - Manage data preparation for API calls

3. **Break Down Main Component** (672 → ~200 lines):
   - **`RoutineCreationContainer.tsx`** (new, ~200 lines):
     - Orchestrate all hooks and components
     - Handle high-level state coordination
     - Manage save/validation flow
   - **`RoutineCreation.tsx`** (refactored, ~150 lines):
     - Pure UI component
     - Receive props from container
     - Focus only on rendering

4. **Extract Event Handler Hooks** (2 new hooks):
   - **`useRoutineEventHandlers.ts`** (new):
     - Handle exercise selection events
     - Manage notes events
     - Handle approach sets events
     - Centralize all event handling logic
   - **`useRoutineSaveHandlers.ts`** (new):
     - Handle save/update operations
     - Manage validation flow
     - Handle error states and user feedback

5. **Improve Component Organization**:
   - **`components/forms/`** (new sub-folder):
     - Move `RoutineDetailsForm.tsx`
     - Move `ObjectivesInput.tsx`
     - Move `TimeInput.tsx`
   - **`components/sections/`** (new sub-folder):
     - Move `StrengthWorkoutsSection.tsx`
     - Move `RunningWorkoutsSection.tsx`
   - **`components/layout/`** (new sub-folder):
     - Move `RoutineHeader.tsx`

**Target:** < 300 lines (from 672 lines)

## 🔄 PR #29: Break Down Large Section Components

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/components/`

### Changes

- Break down large section components (339-366 lines each)
- Extract reusable workout components
- Improve component composition

### Detailed Breakdown

1. **Break Down StrengthWorkoutsSection** (339 → ~150 lines):
   - **`StrengthWorkoutCard.tsx`** (new, ~80 lines):
     - Individual strength workout display
     - Handle workout-specific operations
   - **`StrengthWorkoutList.tsx`** (new, ~70 lines):
     - List management and empty states
     - Handle add/remove workout operations
   - **`StrengthWorkoutsSection.tsx`** (refactored, ~150 lines):
     - Orchestrate workout list and cards
     - Handle section-level operations

2. **Break Down RunningWorkoutsSection** (366 → ~150 lines):
   - **`RunningWorkoutCard.tsx`** (new, ~80 lines):
     - Individual running workout display
     - Handle workout-specific operations
   - **`RunningWorkoutList.tsx`** (new, ~70 lines):
     - List management and empty states
     - Handle add/remove workout operations
   - **`RunningWorkoutsSection.tsx`** (refactored, ~150 lines):
     - Orchestrate workout list and cards
     - Handle section-level operations

3. **Extract Shared Components**:
   - **`WorkoutCardBase.tsx`** (new, ~60 lines):
     - Common workout card functionality
     - Shared UI patterns and operations
   - **`WorkoutListBase.tsx`** (new, ~50 lines):
     - Common list management functionality
     - Shared empty states and operations

**Target:** Smaller, focused section components

## 🔄 PR #30: Break Down RoutineDetail Component

**Status:** PENDING  
**Files:** `features/routines/features/routine-detail/`

### Changes

- Break down RoutineDetail component (209 lines)
- Extract data fetching into custom hooks
- Separate business logic from UI components
- Improve component organization and maintainability

### Detailed Breakdown

1. **Extract Data Fetching Hook** (1 new hook):
   - **`hooks/useRoutineDetailData.ts`**:
     - Handle data fetching for routine details
     - Manage loading, error, and success states
     - Handle data transformation
     - Centralize error handling

2. **Extract Business Logic Hook** (1 new hook):
   - **`hooks/useRoutineDetailLogic.ts`**:
     - Calculate weekly schedule from workout days
     - Handle routine actions (favorite, duplicate, delete)
     - Manage routine state updates
     - Centralize business logic

3. **Extract Event Handlers Hook** (1 new hook):
   - **`hooks/useRoutineDetailHandlers.ts`**:
     - Handle toggle favorite action
     - Handle duplicate routine action
     - Handle delete routine action
     - Handle navigation actions

4. **Simplify Main Component** (reduce to ~80 lines):
   - Remove data fetching logic
   - Remove business logic calculations
   - Remove event handler definitions
   - Focus only on UI orchestration
   - Use extracted hooks for all logic

5. **Break Down DetailedWorkoutView** (reduce from 283 lines):
   - Extract `WorkoutScheduleDisplay.tsx` (50 lines)
   - Extract `WorkoutSectionDisplay.tsx` (60 lines)
   - Extract `ExerciseDisplay.tsx` (70 lines)
   - Extract `SetDisplay.tsx` (40 lines)
   - Simplify main component to orchestrate sub-components

**Target:** Clean, maintainable routine detail feature

## 🔄 PR #32: Break Down RoutineList Components

**Status:** PENDING  
**Files:** `features/routines/features/routine-list/`

### Changes

- Break down large RoutineCard component (313 lines)
- Simplify RoutinesList component (264 lines)
- Extract business logic into custom hooks
- Improve component organization and maintainability

### Detailed Breakdown

1. **Extract Filtering and Search Hook** (1 new hook):
   - **`hooks/useRoutineFiltering.ts`**:
     - Handle search query state
     - Manage level and goal filters
     - Handle favorites filter
     - Provide filtered routines logic
     - Centralize filtering business logic

2. **Extract View Mode Hook** (1 new hook):
   - **`hooks/useRoutineViewMode.ts`**:
     - Manage grid/list view state
     - Handle view mode switching
     - Provide view-specific utilities
     - Centralize view mode logic

3. **Extract Routine Management Hook** (1 new hook):
   - **`hooks/useRoutineManagement.ts`**:
     - Handle set active routine action
     - Handle favorite toggle action
     - Manage routine state updates
     - Centralize routine operations

4. **Break Down RoutineCard** (reduce from 313 lines):
   - Extract `RoutineCardGrid.tsx` (120 lines) - Grid view only
   - Extract `RoutineCardList.tsx` (100 lines) - List view only
   - Extract `RoutineCardActions.tsx` (60 lines) - Action buttons
   - Extract `RoutineCardInfo.tsx` (80 lines) - Routine information display
   - Simplify main component to orchestrate sub-components

5. **Break Down RoutinesList** (reduce from 264 lines):
   - Extract `RoutineFilters.tsx` (80 lines) - Search and filter controls
   - Extract `RoutineSearch.tsx` (50 lines) - Search input component
   - Extract `RoutineViewToggle.tsx` (40 lines) - View mode toggle
   - Extract `RoutineResults.tsx` (60 lines) - Results display and empty state
   - Simplify main component to orchestrate sub-components

**Target:** Clean, maintainable routine list feature

## 🔄 PR #34: Break Down WorkoutManagement Components

**Status:** PENDING  
**Files:** `features/routines/features/workout-management/`

### Changes

- Break down large ExerciseManagement component (241 lines)
- Simplify WorkoutSection component (224 lines)
- Extract business logic into custom hooks
- Improve component organization and maintainability

### Detailed Breakdown

1. **Extract Workout Management Hook** (1 new hook):
   - **`hooks/useWorkoutManagement.ts`**:
     - Handle workout ordering operations
     - Manage workout state updates
     - Handle workout type changes
     - Centralize workout operations

2. **Extract Exercise Management Hook** (1 new hook):
   - **`hooks/useExerciseManagement.ts`**:
     - Handle exercise configuration
     - Manage progression method changes
     - Handle exercise state updates
     - Centralize exercise operations

3. **Extract Section Management Hook** (1 new hook):
   - **`hooks/useSectionManagement.ts`**:
     - Handle section configuration
     - Manage section type changes
     - Handle section state updates
     - Centralize section operations

4. **Break Down ExerciseManagement** (reduce from 241 lines):
   - Extract `ExerciseConfiguration.tsx` (80 lines) - Configuration controls
   - Extract `ExerciseProgression.tsx` (60 lines) - Progression method display
   - Extract `ExerciseNotes.tsx` (50 lines) - Notes management
   - Extract `ExerciseActions.tsx` (40 lines) - Action buttons
   - Simplify main component to orchestrate sub-components

5. **Break Down WorkoutSection** (reduce from 224 lines):
   - Extract `SectionConfiguration.tsx` (80 lines) - Section type and settings
   - Extract `SectionHeader.tsx` (60 lines) - Section header display
   - Extract `SectionExercises.tsx` (70 lines) - Exercise list management
   - Extract `SectionActions.tsx` (40 lines) - Section action buttons
   - Simplify main component to orchestrate sub-components

**Target:** Clean, maintainable workout management feature

## 🔄 PR #36: Break Down TrailRunning Components

**Status:** PENDING  
**Files:** `features/routines/features/trail-running/`

### Changes

- Break down large IntensityTargetConfiguration component (291 lines)
- Simplify SectionsList component (285 lines)
- Extract business logic into custom hooks
- Prepare for future refactoring to support both trail running and normal running
- Improve component organization and maintainability

### Detailed Breakdown

1. **Extract Intensity Target Management Hook** (1 new hook):
   - **`hooks/useIntensityTargetManagement.ts`**:
     - Handle intensity target type changes
     - Manage target value updates
     - Handle validation logic
     - Centralize intensity target operations
     - Prepare for different running type support

2. **Extract Section Management Hook** (1 new hook):
   - **`hooks/useSectionManagement.ts`**:
     - Handle section type selection
     - Manage section configuration
     - Handle smart defaults logic
     - Centralize section operations
     - Prepare for different running type support

3. **Extract Workout Configuration Hook** (1 new hook):
   - **`hooks/useWorkoutConfiguration.ts`**:
     - Handle workout overview changes
     - Manage workout statistics
     - Handle workout validation
     - Centralize workout operations
     - Prepare for different running type support

4. **Break Down IntensityTargetConfiguration** (reduce from 291 lines):
   - Extract `IntensityTargetTypeSelector.tsx` (60 lines) - Type selection
   - Extract `HeartRateInput.tsx` (50 lines) - Heart rate specific inputs
   - Extract `SpeedInput.tsx` (50 lines) - Speed/pace specific inputs
   - Extract `PowerInput.tsx` (60 lines) - Power specific inputs
   - Extract `CadenceInput.tsx` (40 lines) - Cadence specific inputs
   - Extract `RPEInput.tsx` (40 lines) - RPE specific inputs
   - Simplify main component to orchestrate sub-components

5. **Break Down SectionsList** (reduce from 285 lines):
   - Extract `SectionCard.tsx` (80 lines) - Individual section display
   - Extract `RepeatedSectionDisplay.tsx` (70 lines) - Repeated section logic
   - Extract `SectionIntervals.tsx` (60 lines) - Interval display
   - Extract `SectionActions.tsx` (40 lines) - Action buttons
   - Simplify main component to orchestrate sub-components

**Target:** Clean, maintainable trail running feature ready for expansion
