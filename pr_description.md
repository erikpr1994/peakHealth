# [FRO-11, FRO-12] Enhance Routine Builder with Workout Management

## 🎯 Overview

This PR continues the work on the Routine Builder state management by implementing comprehensive workout functionality. It builds upon the foundation established in previous PRs and adds the ability to manage workouts within routines.

## ✨ Features Added

### **Workout Management Actions**
- **`ADD_WORKOUT`**: Add new workouts to routines with automatic order indexing
- **`REMOVE_WORKOUT`**: Remove workouts and reorder remaining ones
- **`UPDATE_WORKOUT`**: Update workout properties while preserving immutable fields

### **State Mutation Utilities**
- **`addWorkout`**: Pure function for adding workouts with proper orderIndex assignment
- **`removeWorkout`**: Pure function for removing workouts and reordering
- **`updateWorkout`**: Pure function for updating workout properties

### **Enhanced Reducer**
- Updated main `routineBuilderReducer` to handle all workout actions
- Proper delegation to utility functions
- Maintains existing routine name update functionality

### **Example Component**
- Created `RoutineBuilderExample` demonstrating real-world usage
- Interactive workout management (add, remove, update)
- Live state visualization
- Comprehensive test coverage

## 🧪 Testing

- **28 tests** passing with 100% coverage
- **7 tests** for workout reducer utilities
- **5 tests** for main reducer integration
- **7 tests** for example component
- **9 tests** for existing functionality

## 📁 Files Changed

```
packages/routines-ui/src/
├── context/routineBuilder/
│   ├── types.ts (enhanced)
│   ├── routineBuilderReducer.ts (enhanced)
│   ├── reducers/
│   │   └── workoutReducer.ts (new)
│   │   └── workoutReducer.test.ts (new)
│   ├── routineBuilderReducer.test.ts (enhanced)
│   └── README.md (new)
├── components/
│   ├── RoutineBuilderExample.tsx (new)
│   └── RoutineBuilderExample.test.tsx (new)
└── context/index.ts (updated)
```

## 🔧 Technical Implementation

### **State Management Pattern**
```typescript
// Pure utility functions for state mutations
export const addWorkout = (state, payload) => { /* immutable update */ }
export const removeWorkout = (state, payload) => { /* immutable update */ }
export const updateWorkout = (state, payload) => { /* immutable update */ }

// Main reducer delegates to utilities
export const routineBuilderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WORKOUT': return addWorkout(state, action.payload);
    case 'REMOVE_WORKOUT': return removeWorkout(state, action.payload);
    case 'UPDATE_WORKOUT': return updateWorkout(state, action.payload);
    // ... other cases
  }
};
```

### **Type Safety**
- Proper TypeScript discriminated unions for workout types
- Strict typing for all action payloads
- Immutable state updates with proper type preservation

## 🚀 Ready for Next Steps

The foundation is now solid for implementing:
- **Section management** (add/remove/update sections within workouts)
- **Exercise management** (add/remove exercises within sections)
- **Workout reordering** (drag & drop functionality)
- **Validation and error handling**
- **Persistence and synchronization**

## 📋 Checklist

- [x] Add workout management actions
- [x] Implement workout mutation utilities
- [x] Update main reducer
- [x] Add comprehensive tests
- [x] Create example component
- [x] Update documentation
- [x] Ensure type safety
- [x] Follow project conventions

## 🔍 Notes

- All tests pass locally
- TypeScript compilation successful
- Follows established patterns from previous PRs
- Maintains backward compatibility
- Ready for integration with UI components

## 🎯 Related Issues

- **FRO-11**: Define Routine Builder State Shape and Mutation Utilities
- **FRO-12**: Implement Core useRoutineBuilder Hook & Provider
