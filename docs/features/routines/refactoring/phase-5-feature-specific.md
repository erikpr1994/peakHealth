# Phase 5: Feature-Specific Refactoring

## Overview

Feature-specific refactoring tasks that focus on particular areas of the routines feature.

## 🔄 PR #12: Move SetManagement to Feature Location

**Status:** PENDING  
**Files:**

- Move `features/routines/components/SetManagement.tsx` to `features/routines/features/workout-management/components/SetManagement.tsx`
- Move `features/routines/components/DynamicWeightInput.tsx` to `features/routines/features/workout-management/components/DynamicWeightInput.tsx`
- Update all imports across the codebase

### Changes

- Move components to their proper feature-specific location
- Update all import statements to use new paths
- Ensure components are properly co-located with their feature
- Follow the rule about placing by feature

**Target:** Proper feature organization

## 🔄 PR #21: Simplify RoutineCreation Container

**Status:** PENDING  
**Files:** `features/routines/features/routine-creation/RoutineCreation.tsx`

### Changes

- Use extracted hooks and utilities
- Simplify component to orchestration only
- Remove complex state management
- Focus on JSX and prop passing

**Target:** < 300 lines (from 672 lines)

## 🔄 PR #22: Split Large Test Files

**Status:** PENDING  
**Files:** Various large test files

### Changes

- Split `useExerciseOperations.test.ts` (1006 lines) into focused test files
- Split `useStrengthWorkoutOperations.test.ts` (1169 lines) into focused test files
- Split `domain/transformers.test.ts` (691 lines) into focused test files
- Split `domain/calculations.test.ts` (460 lines) into focused test files
- Follow the rule about keeping tests focused

**Target:** < 300 lines per test file

## 🔄 PR #23: Simplify Main Index Exports

**Status:** PENDING  
**Files:** `features/routines/index.ts`

### Changes

- Simplify main index.ts to only export feature-level public APIs
- Remove detailed component exports
- Let each feature manage its own exports
- Follow the rule about minimal and stable barrels

**Target:** Clean export structure

## 🔄 PR #31: Improve Component Organization

**Status:** PENDING  
**Files:** `features/routines/features/routine-detail/components/`

### Changes

- Organize components by responsibility
- Improve CSS module usage consistency
- Create focused, reusable components
- Improve test organization

### Detailed Breakdown

1. **Create Component Sub-folders**:
   - **`workout-display/`** - All workout-related display components
   - **`routine-info/`** - Routine metadata display components
   - **`schedule/`** - Schedule and progress components

2. **Standardize CSS Modules**:
   - Ensure all components use CSS modules consistently
   - Create shared style utilities
   - Improve responsive design patterns

3. **Extract Reusable Components**:
   - **`shared/StatusBadge.tsx`** - For active/inactive status
   - **`shared/ActionButton.tsx`** - For common action buttons
   - **`shared/InfoCard.tsx`** - For consistent card layouts

4. **Improve Test Organization**:
   - Create test utilities for common mock data
   - Split large test files into focused tests
   - Improve test coverage and maintainability

**Target:** Well-organized, maintainable components

## 🔄 PR #33: Improve Component Organization

**Status:** PENDING  
**Files:** `features/routines/features/routine-list/components/`

### Changes

- Organize components by responsibility
- Create focused, reusable components
- Improve test organization
- Standardize component patterns

### Detailed Breakdown

1. **Create Component Sub-folders**:
   - **`routine-cards/`** - All routine card display components
   - **`list-controls/`** - List management and filtering components
   - **`active-routine/`** - Active routine display components

2. **Standardize CSS Modules**:
   - Ensure all components use CSS modules consistently
   - Create shared style utilities
   - Improve responsive design patterns

3. **Extract Reusable Components**:
   - **`shared/StatusBadge.tsx`** - For active/inactive status
   - **`shared/ProgressBar.tsx`** - For progress display
   - **`shared/ObjectiveTags.tsx`** - For objective display
   - **`shared/FilterDropdown.tsx`** - For filter controls

4. **Improve Test Organization**:
   - Create test utilities for common mock data
   - Split large test files into focused tests
   - Improve test coverage and maintainability

**Target:** Well-organized, maintainable components

## 🔄 PR #35: Improve Component Organization

**Status:** PENDING  
**Files:** `features/routines/features/workout-management/components/`

### Changes

- Organize components by responsibility
- Create focused, reusable components
- Improve test organization
- Standardize component patterns

### Detailed Breakdown

1. **Create Component Sub-folders**:
   - **`exercise-management/`** - All exercise-related components
   - **`section-management/`** - Section management components
   - **`workout-controls/`** - Workout header and details components
   - **`shared/`** - Reusable components

2. **Extract Reusable Components**:
   - **`shared/OrderControls.tsx`** - For workout/section ordering
   - **`shared/TypeSelector.tsx`** - For type selection dropdowns
   - **`shared/TimeInput.tsx`** - For time input fields
   - **`shared/NotesButton.tsx`** - For notes management

3. **Standardize Component Patterns**:
   - Consistent prop interfaces
   - Standardized event handling
   - Uniform styling approaches
   - Consistent error handling

4. **Improve Test Organization**:
   - Create test utilities for common mock data
   - Split large test files into focused tests
   - Improve test coverage and maintainability

**Target:** Well-organized, maintainable components

## 🔄 PR #37: Prepare for Running Type Expansion

**Status:** PENDING  
**Files:** `features/routines/features/trail-running/`

### Changes

- Abstract components to support both trail running and normal running
- Create shared interfaces and utilities
- Improve component reusability
- Standardize component patterns

### Detailed Breakdown

1. **Create Shared Interfaces** (2 new files):
   - **`types/runningWorkout.ts`** - Common running workout interfaces
   - **`types/intensityTarget.ts`** - Common intensity target interfaces

2. **Abstract Section Types**:
   - Move section type definitions to configuration files
   - Create factory functions for different running types
   - Support dynamic section type loading

3. **Abstract Intensity Targets**:
   - Create base intensity target components
   - Support different running type specific targets
   - Create factory for target type components

4. **Create Shared Components**:
   - **`shared/RunningWorkoutBase.tsx`** - Base workout component
   - **`shared/RunningSectionBase.tsx`** - Base section component
   - **`shared/IntensityTargetBase.tsx`** - Base intensity target component

5. **Improve Configuration System**:
   - Create configuration providers for different running types
   - Support dynamic configuration loading
   - Create plugin system for running type extensions

### Benefits

- Ready for normal running support
- Better component reusability
- Cleaner abstraction layers
- Easier to add new running types
- Better maintainability

### File Structure After Refactoring

```
trail-running/
├── types/
│   ├── runningWorkout.ts
│   └── intensityTarget.ts
├── shared/
│   ├── RunningWorkoutBase.tsx
│   ├── RunningSectionBase.tsx
│   └── IntensityTargetBase.tsx
├── config/
│   ├── trailRunningConfig.ts
│   ├── normalRunningConfig.ts
│   └── runningTypeFactory.ts
└── [existing files]
```

**Target:** Components ready for running type expansion
