# Contexts

This directory contains React context providers for the Routines feature.

## Purpose

- Feature-scoped context providers
- State management for complex features
- Shared state across components

## Guidelines

- Keep contexts focused on a single concern
- Create custom hooks for consuming context
- Split contexts if they change at different frequencies
- Memoize context values

## Examples

```typescript
// RoutineBuilderContext.tsx
import { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { Routine } from '../types/routine';

interface RoutineBuilderState {
  routine: Partial<Routine>;
  // Other state properties
}

interface RoutineBuilderContextValue {
  state: RoutineBuilderState;
  dispatch: React.Dispatch<RoutineBuilderAction>;
}

const RoutineBuilderContext = createContext<RoutineBuilderContextValue | undefined>(undefined);

export function RoutineBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(routineBuilderReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <RoutineBuilderContext.Provider value={value}>
      {children}
    </RoutineBuilderContext.Provider>
  );
}

export function useRoutineBuilder() {
  const context = useContext(RoutineBuilderContext);
  if (context === undefined) {
    throw new Error('useRoutineBuilder must be used within a RoutineBuilderProvider');
  }
  return context;
}
```
