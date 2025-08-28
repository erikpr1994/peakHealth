# Routines Feature - Frontend Technical Specification

This document outlines the architectural principles and implementation strategy for the frontend of the Routines feature. It adapts the core concepts from a legacy refactoring plan to serve as the blueprint for this new implementation.

---

## 1. 🎯 Core Philosophy: Build, Don't Re-engineer

Our primary strategy is to build the feature correctly from the ground up, following established best practices. We will focus on creating clean, well-organized, and testable code from the start.

- **Clean Slate**: We will not be constrained by previous implementations.
- **Strong Architecture**: We will apply the lessons from past projects to build a more robust and maintainable codebase.
- **Incremental Build**: We will build the feature piece by piece, starting with the foundational elements.

## 2. 📁 Folder Structure

To ensure scalability and clear separation of concerns, the `features/routines` directory will follow a structured, domain-driven hierarchy.

```
features/routines/
├── api/                # API client layer for routines (e.g., SWR hooks)
├── components/         # SHARED components used across the routines feature
├── constants/          # Constants, enums, etc.
├── contexts/           # Feature-scoped context providers (e.g., RoutineBuilder, WorkoutPlayer)
├── domain/             # Core, pure business logic (no UI, no API calls)
│   ├── calculations/
│   └── transformers/
├── pages/              # Page-level components that orchestrate features
├── services/           # Higher-level services that orchestrate domain logic and API calls
├── types/              # SHARED type definitions for the feature
└── index.ts            # Public API of the routines feature
```

## 3. Component & Hook Strategy

### A. Hyper-Granular Component Decomposition

Large, monolithic components are a primary source of complexity. We will aggressively break them down into smaller, single-purpose components.

- **Orchestrator Components**: Parent components (like `RoutineBuilder` or `WorkoutPlayer`) are responsible for orchestrating hooks and composing smaller UI components. They should contain minimal direct logic.
- **UI Components**: Child components are responsible for rendering and receiving state and handlers as props.
- **File Size**: No component file should exceed 300 lines. A size of 200-300 lines is a strong signal to refactor and extract smaller pieces.

### B. Advanced Hook & Logic Refactoring

We will avoid "god hooks" that manage state, event handlers, and business logic all in one place.

- **State Hooks** (e.g., `useRoutineBuilderState`): These hooks, typically using `useReducer`, are the single source of truth for a feature's state. They are responsible only for managing state updates.
- **Handler/Operations Hooks** (e.g., `useRoutineBuilderHandlers`): These hooks consume the state hook and contain the event handlers (`handleUpdateName`, `addExercise`, etc.) that are passed down to the UI components.
- **Selector Hooks** (e.g., `useCurrentExercise`): For complex contexts, we will provide small, memoized selector hooks to prevent unnecessary re-renders in consumer components.

## 4. Domain and Services Layer

A clear line will be drawn between pure business logic and application logic that deals with external systems.

- **`domain/`**: This directory is for pure, stateless functions. They take data, transform it, and return new data. They have **zero external dependencies** (no API calls, no hooks). This makes them highly reusable and easy to test.
  - Example: `calculateWorkoutVolume(sets)`
- **`services/`**: This directory contains functions that orchestrate domain logic and API calls. They are the bridge between the UI and the backend.
  - Example: `async function createRoutine(routineData)` would use a domain transformer to format the data and then call the API client.

By following these principles, we will build a scalable, maintainable, and highly testable frontend for the Routines feature.
