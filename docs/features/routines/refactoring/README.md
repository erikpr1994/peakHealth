# Routines Feature Refactoring Plan

## Overview

Breaking down large components into smaller, focused pieces following project rules:

- Files under 300 lines
- Co-located tests
- Named exports
- Feature-based organization
- CSS Modules only

## 🚀 Implementation Strategy

### Creating New Code, Not Refactoring Existing Code

**Important**: This refactoring plan involves creating **completely new code** that follows the implementation patterns and business logic from the existing codebase. We are NOT modifying the existing files directly.

#### Why This Approach?

1. **Clean Slate**: Start with a clean, well-organized structure from the beginning
2. **No Breaking Changes**: Existing functionality remains untouched during the transition
3. **Better Architecture**: Apply lessons learned from the current implementation
4. **Incremental Migration**: Gradually replace old components with new ones
5. **Safer Process**: Reduce risk of introducing bugs during refactoring

#### How It Works

1. **Study Existing Code**: Understand the current implementation patterns, business logic, and data flow
2. **Design New Structure**: Create the new folder structure and component hierarchy
3. **Implement New Components**: Write new components that replicate the functionality of existing ones
4. **Copy Business Logic**: Extract and adapt the business logic from existing files
5. **Test Thoroughly**: Ensure new components work identically to existing ones
6. **Gradual Replacement**: Replace old components with new ones once verified

#### Benefits of This Approach

- **Zero Downtime**: Existing features continue to work during the transition
- **Better Testing**: Can test new components against existing ones
- **Rollback Safety**: Can easily revert if issues arise
- **Cleaner History**: Git history shows clear progression from old to new
- **Learning Opportunity**: Better understanding of the codebase during the process

## Current State Analysis

### Large Files Identified:

1. **RoutineCreation.tsx** (672 lines) - Complex component with 20+ state variables
2. **SetManagement.tsx** (571 lines) - Complex component with configuration logic
3. **useWorkoutOperations.ts** (625 lines) - Still too large after previous refactoring
4. **useExerciseOperations.ts** (306 lines) - Over the 300 line limit
5. **useRoutineOperations.ts** (357 lines) - Over the 300 line limit
6. **domain/transformers.ts** (376 lines) - Over the 300 line limit
7. **domain/calculations.ts** (433 lines) - Over the 300 line limit

### File Organization Issues:

1. **Components in wrong location:**
   - `SetManagement.tsx` and `DynamicWeightInput.tsx` are in root `components/` directory
   - Should be moved to feature-specific locations

2. **Large test files:**
   - `useExerciseOperations.test.ts` (1006 lines) - violates focused test rule
   - `useStrengthWorkoutOperations.test.ts` (1169 lines) - violates focused test rule
   - `domain/transformers.test.ts` (691 lines) - violates focused test rule
   - `domain/calculations.test.ts` (460 lines) - violates focused test rule

3. **Export structure issues:**
   - Main `index.ts` is doing too much exporting (violates minimal barrel rule)

4. **Workout Type Organization:**
   - Trail running is treated as a separate workout type in the database schema
   - Need to align code organization with database structure
   - Current implementation doesn't properly separate workout types

### Complexity Issues:

- Too many state variables in single components
- Complex event handlers mixed with UI logic
- Large configuration objects
- Multiple responsibilities in single files
- Deep prop drilling
- Complex validation logic mixed with UI

## Refactoring Strategy

### Phase 1: Foundational Reorganization (The "Big Shuffle")

Before we start breaking down large files, let's get the folder structure right. This will make all subsequent steps much cleaner.

### Phase 2: Hyper-Granular Component Decomposition

Break down large components into smaller, focused pieces with clear separation of concerns.

### Phase 3: Advanced Hook & Logic Refactoring

Decompose hooks using service layer patterns and clear abstractions.

### Phase 4: Domain Layer and Services

Create clear distinction between pure business logic and application-level logic.

## Success Metrics

### File Size Targets

- All files under 300 lines ✅ (mostly achieved)
- Most files under 200 lines
- No files over 500 lines

### Test Coverage

- All new files have co-located tests
- Maintain existing test coverage
- No test regressions

### Code Quality

- Follow project naming conventions
- Use named exports
- Proper separation of concerns
- No circular dependencies

### Performance

- No performance regressions
- Maintain existing functionality
- Clean import/export structure

## Notes

This plan focuses on **practical extraction** rather than theoretical perfection. Each PR is designed to:

1. **Actually reduce complexity** in the target files
2. **Maintain functionality** while improving structure
3. **Be reviewable** with clear, focused changes
4. **Build incrementally** on previous work
5. **Follow project conventions** strictly

The key insight is that we need to:

1. **Move components to proper feature locations** first
2. **Break down large components** into smaller, focused pieces
3. **Further decompose large hooks** that are still over the limit
4. **Clean up domain layer** files that are too large
5. **Organize test files** to follow the focused test rule
6. **Simplify export structure** to follow minimal barrel rule

The priority is to start with the smallest and deepest units first, then work up to larger components.

## Document Structure

- [Phase 1: Foundational Reorganization](./phase-1-foundational-reorganization.md)
- [Phase 2: Component Decomposition](./phase-2-component-decomposition.md)
- [Phase 3: Hook Refactoring](./phase-3-hook-refactoring.md)
- [Phase 4: Domain & Services](./phase-4-domain-services.md)
- [Phase 5: Feature-Specific Refactoring](./phase-5-feature-specific.md)
- [Progress Tracking](./progress-tracking.md)
- [Implementation Guidelines](./implementation-guidelines.md)
