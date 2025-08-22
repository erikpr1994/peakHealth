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

### 1. Incremental Approach

- **One PR at a time**: Don't try to do multiple refactoring tasks in a single PR
- **Small, focused changes**: Each PR should have a clear, single purpose
- **Test after each change**: Ensure functionality is maintained at each step
- **Review thoroughly**: Get proper code review before merging

### 2. Backward Compatibility

- **Maintain existing APIs**: Don't break existing imports or function signatures
- **Use re-exports**: When moving files, use re-exports to maintain compatibility
- **Gradual migration**: Update imports incrementally across the codebase
- **Document changes**: Clearly document any breaking changes

### 3. Testing Strategy

- **Co-located tests**: Each new file should have its own test file
- **Maintain coverage**: Don't reduce test coverage during refactoring
- **Integration tests**: Ensure the overall feature still works
- **Regression testing**: Run existing tests to catch any regressions

### 4. Code Copying Strategy

- **Study first**: Thoroughly understand the existing implementation
- **Extract patterns**: Identify reusable patterns and business logic
- **Adapt to new structure**: Apply the logic to the new, better-organized structure
- **Test against original**: Ensure new implementation matches original behavior
- **Document differences**: Note any intentional improvements or changes

## File Organization Rules

### 1. Feature-Based Structure

```
features/routines/
├── api/                # API client layer
├── components/         # SHARED components only
├── domain/            # Pure business logic
├── features/          # Sub-features
│   ├── routine-creation/
│   ├── routine-detail/
│   ├── routine-list/
│   ├── workout-management/
│   └── trail-running/
├── hooks/             # SHARED hooks only
├── services/          # Application-level services
├── types/             # SHARED types only
├── utils/             # SHARED utilities only
└── index.ts           # Public API
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

### 3. Hook Guidelines

- **Single purpose**: Each hook should have a clear, single purpose
- **Custom hooks**: Extract reusable logic into custom hooks
- **State management**: Separate state logic from UI logic
- **Error handling**: Include proper error handling

### 4. Type Guidelines

- **Named exports**: Use named exports for types
- **Co-located types**: Keep types close to their usage
- **Shared types**: Move common types to shared location
- **No circular dependencies**: Avoid circular imports

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

- **Co-located tests**: Keep tests next to the code they test
- **Focused tests**: Each test file should test one thing
- **Integration tests**: Test complete user flows
- **Unit tests**: Test individual functions and components

### 2. Test Patterns

```typescript
// Component test pattern
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test rendering
  });

  it('should handle user interactions', () => {
    // Test interactions
  });

  it('should call callbacks correctly', () => {
    // Test callbacks
  });
});

// Hook test pattern
describe('useHookName', () => {
  it('should return expected initial state', () => {
    // Test initial state
  });

  it('should update state correctly', () => {
    // Test state updates
  });

  it('should handle edge cases', () => {
    // Test edge cases
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

### 1. Code Comments

- **JSDoc**: Use JSDoc for functions and components
- **Complex logic**: Comment complex business logic
- **API documentation**: Document public APIs clearly
- **Examples**: Include usage examples for complex components

### 2. README Files

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

## Emergency Rollback

If a refactoring causes issues:

1. **Revert the PR** immediately
2. **Document the issue** for future reference
3. **Create a smaller PR** to address the specific problem
4. **Add more tests** to prevent regression
5. **Review the approach** and adjust if needed
6. **Study existing code more thoroughly** before attempting again
