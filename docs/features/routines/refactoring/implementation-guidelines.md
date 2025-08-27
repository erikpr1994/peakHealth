# Implementation Guidelines

## Overview

This document provides guidelines for implementing the refactoring plan effectively and safely. **Important**: We are creating completely new code that replicates existing functionality, not modifying existing files directly.

## 🎯 Implementation Philosophy

### Creating New Code vs. Refactoring Existing Code

**We are NOT refactoring existing files.** Instead, we are:

1. **Studying existing code** to understand patterns and business logic
2. **Creating new files** with better structure and organization
3. **Copying and adapting** the business logic from existing files
4. **Testing new components** against existing functionality
5. **Gradually replacing** old components with new ones

### Why This Approach?

- **Safer**: No risk of breaking existing functionality
- **Cleaner**: New code follows best practices from the start
- **Testable**: Can compare new vs. old behavior
- **Reversible**: Easy to rollback if issues arise
- **Educational**: Better understanding of the codebase

## General Principles

### 1. Dependency Management

- **Understand PR dependencies**: Know which PRs depend on others
- **Complete foundation PRs first**: Types, utilities, and domain logic before components
- **Document dependencies**: Clearly document which PRs depend on others
- **Avoid circular dependencies**: Ensure clean dependency graph between PRs

### 2. Incremental Approach

- **One PR at a time**: Don't try to do multiple refactoring tasks in a single PR
- **Small, focused changes**: Each PR should have a clear, single purpose
- **Test after each change**: Ensure functionality is maintained at each step
- **Review thoroughly**: Get proper code review before merging

### 3. Backward Compatibility

- **Maintain existing APIs**: Don't break existing imports or function signatures
- **Use re-exports**: When moving files, use re-exports to maintain compatibility
- **Gradual migration**: Update imports incrementally across the codebase
- **Document changes**: Clearly document any breaking changes

### 4. Validation Strategy

- **Functional equivalence**: New components must behave identically to old ones
- **Performance metrics**: No degradation in render performance or memory usage
- **Accessibility**: Maintain or improve accessibility compliance
- **Test coverage**: Equal or better test coverage than original
- **Code quality**: Improved readability, maintainability, and separation of concerns
- **Bundle size**: No significant increase in bundle size

### 5. Testing Strategy

- **Co-located tests**: Each new file should have its own test file
- **Maintain coverage**: Don't reduce test coverage during refactoring
- **Integration tests**: Ensure the overall feature still works
- **Regression testing**: Run existing tests to catch any regressions

### 6. Code Copying Strategy

- **Study first**: Thoroughly understand the existing implementation
- **Extract patterns**: Identify reusable patterns and business logic
- **Adapt to new structure**: Apply the logic to the new, better-organized structure
- **Test against original**: Ensure new implementation matches original behavior
- **Document differences**: Note any intentional improvements or changes

## File Organization Rules

### 1. Feature-Based Structure

```
features/routinesV2/
├── api/                # API client layer
├── components/         # SHARED components across features
│   ├── workout/        # Shared workout components
│   │   ├── strength/   # Shared strength workout components
│   │   ├── running/    # Shared running workout components
│   │   └── trail-running/ # Shared trail running workout components
│   └── ...
├── domain/             # Pure business logic
├── features/           # Sub-features
│   ├── routine-creation/        # Creating and editing routines
│   │   ├── components/
│   │   │   ├── workout-forms/   # Forms for different workout types
│   │   │   │   ├── strength/    # Strength workout specific components
│   │   │   │   ├── running/     # Running workout specific components
│   │   │   │   └── trail-running/ # Trail running specific components
│   │   │   └── ...
│   │   ├── hooks/
│   │   └── ...
│   ├── routine-detail/          # Viewing routine details
│   │   ├── components/
│   │   │   ├── workout-views/   # Views for different workout types
│   │   │   │   ├── strength/    # Strength workout display
│   │   │   │   ├── running/     # Running workout display
│   │   │   │   └── trail-running/ # Trail running display
│   │   │   └── ...
│   │   └── ...
│   └── routine-list/            # Listing and managing routines
├── hooks/              # SHARED hooks across features
│   ├── workout/        # Shared workout hooks
│   │   ├── strength/   # Shared strength workout hooks
│   │   ├── running/    # Shared running workout hooks
│   │   └── trail-running/ # Shared trail running workout hooks
│   └── ...
├── patterns/           # Reusable design patterns
├── services/           # Application-level services
├── types/              # SHARED types only
├── utils/              # SHARED utilities only
└── index.ts            # Public API
```

### 2. Component Organization

- **Feature-specific components** go in `features/<feature-name>/components/`
- **Shared components** go in `components/`
- **Use sub-folders** for complex components with multiple files
- **Index files** for clean imports

### 3. Hook Organization

```
hooks/
├── state/             # State management hooks
├── operations/        # Business logic hooks
│   ├── strength/
│   ├── running/
│   └── shared/
├── queries/           # Data fetching hooks
├── specialized/       # Feature-specific hooks
└── index.ts          # Re-exports
```

## Code Quality Standards

### 1. File Size Limits

- **Target**: < 300 lines per file
- **Warning**: 200-300 lines (consider refactoring)
- **Maximum**: 500 lines (must refactor)

### 2. Component Guidelines

- **Single responsibility**: Each component should do one thing well
- **Props interface**: Define clear, typed props
- **Composition over inheritance**: Use component composition patterns
- **CSS Modules**: Use CSS modules for styling

### 3. Workout Component Composition

For workout components, use composition to handle different workout types:

```tsx
// Base workout form component
function WorkoutForm({ workout, onChange }) {
  // Common form fields and logic

  return (
    <div className={styles.workoutForm}>
      {/* Common fields like name, description, etc. */}
      <div className={styles.commonFields}>
        <TextField
          label="Name"
          value={workout.name}
          onChange={e => onChange({ ...workout, name: e.target.value })}
        />
        <TextField
          label="Objective"
          value={workout.objective}
          onChange={e => onChange({ ...workout, objective: e.target.value })}
        />
        {/* Other common fields */}
      </div>

      {/* Type-specific fields */}
      <div className={styles.typeSpecificFields}>
        {isStrengthWorkout(workout) && (
          <StrengthWorkoutFields workout={workout} onChange={onChange} />
        )}

        {isRunningWorkout(workout) && (
          <RunningWorkoutFields workout={workout} onChange={onChange} />
        )}

        {isTrailRunningWorkout(workout) && (
          <TrailRunningWorkoutFields workout={workout} onChange={onChange} />
        )}

        {isSwimmingWorkout(workout) && (
          <SwimmingWorkoutFields workout={workout} onChange={onChange} />
        )}

        {isCyclingWorkout(workout) && (
          <CyclingWorkoutFields workout={workout} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

// Trail running specific component
function TrailRunningWorkoutFields({ workout, onChange }) {
  // Trail running specific fields

  return (
    <div className={styles.trailRunningFields}>
      <SelectField
        label="Difficulty"
        value={workout.difficulty}
        options={[
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
          { value: 'expert', label: 'Expert' },
        ]}
        onChange={e => onChange({ ...workout, difficulty: e.target.value })}
      />

      <TextField
        label="Target Distance (km)"
        type="number"
        value={workout.targetDistance}
        onChange={e =>
          onChange({ ...workout, targetDistance: Number(e.target.value) })
        }
      />

      <TextField
        label="Elevation Gain (m)"
        type="number"
        value={workout.elevationGain}
        onChange={e =>
          onChange({ ...workout, elevationGain: Number(e.target.value) })
        }
      />

      <SelectField
        label="Intensity Target Type"
        value={workout.intensityTargetType}
        options={[
          { value: 'Heart Rate', label: 'Heart Rate' },
          { value: 'Speed', label: 'Speed' },
          { value: 'Power', label: 'Power' },
          { value: 'Cadence', label: 'Cadence' },
          { value: 'RPE', label: 'RPE' },
        ]}
        onChange={e =>
          onChange({ ...workout, intensityTargetType: e.target.value })
        }
      />

      {/* Trail running intervals management */}
      <TrailRunningIntervalsList
        intervals={workout.intervals || []}
        onChange={intervals => onChange({ ...workout, intervals })}
      />
    </div>
  );
}
```

### 4. Hook Guidelines

- **Single purpose**: Each hook should have a clear, single purpose
- **Custom hooks**: Extract reusable logic into custom hooks
- **State management**: Separate state logic from UI logic
- **Error handling**: Include proper error handling

### 4. Type Guidelines

- **Named exports**: Use named exports for types
- **Co-located types**: Keep types close to their usage
- **Shared types**: Move common types to shared location
- **No circular dependencies**: Avoid circular imports

### 5. Workout Type System

The workout type system should align with the database schema's workout_type enum:

```typescript
// Workout type enum (matches database)
type WorkoutType =
  | 'strength'
  | 'running'
  | 'trail-running'
  | 'swimming'
  | 'cycling';

// Base workout interface
interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  // Common properties
  objective?: string;
  schedule?: any;
  orderIndex: number;
}

// Strength workout
interface StrengthWorkout extends Workout {
  type: 'strength';
  // Strength-specific properties
  sections: WorkoutSection[];
}

// Running workout
interface RunningWorkout extends Workout {
  type: 'running';
  // Running-specific properties
  distance?: number;
  duration?: number;
  // ...
}

// Trail running workout (separate type, not a subtype of running)
interface TrailRunningWorkout extends Workout {
  type: 'trail-running';
  // Trail running specific properties from trail_running_data
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDuration?: number;
  targetDistance?: number;
  elevationGain?: number;
  intensityTargetType?: 'Heart Rate' | 'Speed' | 'Power' | 'Cadence' | 'RPE';
  intensityTargetValue?: string;
  // Trail running has its own intervals
  intervals?: TrailRunningInterval[];
}

// Trail running interval
interface TrailRunningInterval {
  id: string;
  sectionId: string;
  intervalType:
    | 'Run'
    | 'Uphill'
    | 'Downhill'
    | 'Sprint'
    | 'Recovery'
    | 'Rest'
    | 'Walk';
  durationMinutes?: number;
  distanceKm?: number;
  elevationGain?: number;
  intensityTarget?: string;
  repeatCount: number;
  orderIndex: number;
}

// Swimming workout
interface SwimmingWorkout extends Workout {
  type: 'swimming';
  // Swimming-specific properties
  // ...
}

// Cycling workout
interface CyclingWorkout extends Workout {
  type: 'cycling';
  // Cycling-specific properties
  // ...
}

// Type guards
function isStrengthWorkout(workout: Workout): workout is StrengthWorkout {
  return workout.type === 'strength';
}

function isRunningWorkout(workout: Workout): workout is RunningWorkout {
  return workout.type === 'running';
}

function isTrailRunningWorkout(
  workout: Workout
): workout is TrailRunningWorkout {
  return workout.type === 'trail-running';
}

function isSwimmingWorkout(workout: Workout): workout is SwimmingWorkout {
  return workout.type === 'swimming';
}

function isCyclingWorkout(workout: Workout): workout is CyclingWorkout {
  return workout.type === 'cycling';
}
```

## Migration Strategies

### 1. Creating New Components

1. **Study existing component**: Understand its functionality, props, and behavior
2. **Design new structure**: Plan how to break it down into smaller components
3. **Create new files**: Write new components with better organization
4. **Copy business logic**: Extract and adapt the logic from the original
5. **Test thoroughly**: Ensure new components work identically
6. **Replace gradually**: Update imports to use new components

### 2. Breaking Down Components

1. **Extract types** first
2. **Extract utilities** and business logic
3. **Create smaller components**
4. **Update main component** to use composition
5. **Add tests** for new components

### 3. Refactoring Hooks

1. **Identify responsibilities** in the hook
2. **Extract state management** into separate hook
3. **Extract business logic** into separate hook
4. **Create orchestrator hook** that composes others
5. **Update tests** to reflect new structure

## Testing Guidelines

### 1. Test Organization

- **Co-located Tests**: Keep tests next to the code they test
- **Test Types**:
  - `*.unit.test.tsx`: Pure unit tests with mocked dependencies
  - `*.integration.test.tsx`: Tests that verify component integration
  - `*.e2e.test.tsx`: End-to-end tests for complete features
- **Focused Tests**: Each test file should test one thing
- **Integration Tests**: Test complete user flows
- **Unit Tests**: Test individual functions and components

### 2. Test Patterns

```typescript
// Component test pattern
describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render correctly with default props', () => {
      // Test default rendering
    });

    it('should render correctly with custom props', () => {
      // Test custom props rendering
    });

    it('should handle loading states', () => {
      // Test loading states
    });

    it('should handle error states', () => {
      // Test error states
    });
  });

  describe('interactions', () => {
    it('should handle click events', () => {
      // Test click interactions
    });

    it('should handle form submissions', () => {
      // Test form submissions
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      // Test accessibility
    });

    it('should be keyboard navigable', () => {
      // Test keyboard navigation
    });
  });

  describe('performance', () => {
    it('should not re-render unnecessarily', () => {
      // Test render optimization
    });
  });
});

// Hook test pattern
describe('useHookName', () => {
  describe('initialization', () => {
    it('should return expected initial state', () => {
      // Test initial state
    });

    it('should handle initialization with custom parameters', () => {
      // Test custom initialization
    });
  });

  describe('state updates', () => {
    it('should update state correctly when action is called', () => {
      // Test state updates
    });

    it('should batch related state updates', () => {
      // Test batched updates
    });
  });

  describe('error handling', () => {
    it('should handle API errors gracefully', () => {
      // Test error handling
    });

    it('should provide meaningful error messages', () => {
      // Test error messages
    });
  });

  describe('performance', () => {
    it('should not cause unnecessary re-renders', () => {
      // Test render optimization
    });
  });
});
```

### 3. Mock Data

- **Create test utilities** for common mock data
- **Use realistic data** that matches production
- **Keep mocks simple** and focused
- **Update mocks** when data structures change

### 4. Testing New vs. Old

- **Compare behavior**: Ensure new components behave identically to old ones
- **Regression tests**: Test that existing functionality still works
- **Integration tests**: Test complete user flows with new components
- **Performance tests**: Ensure no performance degradation

## Performance Considerations

### 1. Bundle Size

- **Tree shaking**: Use named exports to enable tree shaking
- **Lazy loading**: Consider lazy loading for large features
- **Code splitting**: Split code by feature boundaries
- **Bundle analysis**: Monitor bundle size changes

### 2. Runtime Performance

- **Memoization**: Use React.memo and useMemo appropriately
- **Callback optimization**: Use useCallback for expensive operations
- **State updates**: Batch state updates when possible
- **Rendering optimization**: Avoid unnecessary re-renders

## Documentation Standards

### 1. Architectural Decision Records (ADRs)

For significant architectural decisions during refactoring, create an ADR with:

1. **Title**: Clear, descriptive title
2. **Context**: Background and problem being solved
3. **Decision**: The architectural decision made
4. **Consequences**: Positive and negative implications
5. **Alternatives Considered**: Other options and why they were rejected

Example ADR template:

```markdown
# ADR-001: [Title of Decision]

## Context

[Describe the problem or situation that led to this decision]

## Decision

[Describe the decision that was made]

## Consequences

[Describe the positive and negative consequences of this decision]

## Alternatives Considered

[Describe other options that were considered and why they were rejected]
```

### 2. Code Comments

- **JSDoc**: Use JSDoc for functions and components
- **Complex logic**: Comment complex business logic
- **API documentation**: Document public APIs clearly
- **Examples**: Include usage examples for complex components

### 3. Component Documentation

Each new component should include:

1. **Purpose**: What the component does and when to use it
2. **Props**: Detailed description of all props
3. **Examples**: Usage examples for common scenarios
4. **Internal Structure**: Brief explanation of how it works internally
5. **Related Components**: Links to related components

### 4. README Files

- **Feature overview**: Explain what the feature does
- **Usage examples**: Show how to use the feature
- **API documentation**: Document public APIs
- **Development notes**: Include development-specific information

## Common Pitfalls

### 1. Avoid These Mistakes

- **Breaking existing APIs** without proper migration
- **Creating circular dependencies** between files
- **Mixing concerns** in single files
- **Skipping tests** during refactoring
- **Making too many changes** in one PR
- **Not studying existing code** thoroughly before creating new code

### 2. Red Flags

- **Files over 300 lines** without good reason
- **Components with 10+ props** (consider composition)
- **Hooks with multiple responsibilities** (split them)
- **Circular imports** between files
- **Untested code** after refactoring
- **New code that doesn't match original behavior**

## Success Checklist

Before marking a PR as complete:

- [ ] **File size targets** met (< 300 lines)
- [ ] **Tests pass** and coverage maintained
- [ ] **No circular dependencies** introduced
- [ ] **Backward compatibility** maintained
- [ ] **Code review** completed
- [ ] **Documentation** updated
- [ ] **Performance** not degraded
- [ ] **Functionality** verified
- [ ] **New code matches original behavior**
- [ ] **Existing functionality still works**

## Integration with Development Workflow

### 1. Handling Concurrent Development

- **Feature freeze areas**: Communicate which components are actively being refactored
- **Coordination meetings**: Regular sync meetings to discuss overlapping work
- **Branch strategy**: Use feature branches that can be rebased on refactoring branches
- **Incremental merging**: Merge refactoring PRs frequently to minimize conflicts
- **Documentation**: Keep documentation updated about which components have been refactored

### 2. Conflict Resolution

- **Prioritize critical features**: Business-critical features take precedence over refactoring
- **Adapt refactoring**: Adjust refactoring plans to accommodate new feature requirements
- **Collaborative review**: Joint code reviews for areas with overlapping changes
- **Temporary compromises**: Accept temporary deviations from refactoring goals when necessary

## Emergency Rollback

### 1. Component Rollback

1. **Identify scope**: Determine if the issue affects a single component or multiple components
2. **Isolate changes**: If possible, revert only the problematic component
3. **Verify original**: Ensure the original component still works correctly
4. **Document issue**: Record the specific problem for future reference
5. **Adjust approach**: Modify the refactoring strategy based on the issue

### 2. Hook Rollback

1. **Revert to original**: Return to using the original hook implementation
2. **Analyze root cause**: Determine what caused the issue
3. **Create smaller PR**: Break the refactoring into smaller, more focused changes
4. **Add tests**: Create tests that specifically target the issue
5. **Retry with new approach**: Implement a revised refactoring strategy
