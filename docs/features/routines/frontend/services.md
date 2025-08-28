# Frontend Services Layer

This document defines the key functions that will make up the "Services Layer" for the Routines feature, as outlined in the **[Frontend Technical Specification](./technical-spec.md)**.

The services layer acts as the crucial intermediary between the UI (hooks and components) and the backend (API). Its functions are responsible for orchestrating business logic, validating data, and making the actual API calls.

---

## 1. `RoutineService`

This service will handle all operations related to managing a user's routines.

### `async function createRoutine(routineData: Routine): Promise<Routine>`

- **Orchestration**:
  1.  Calls a `validateRoutine(routineData)` function from the `domain/validators` module. Throws an error if validation fails.
  2.  Calls a `transformRoutineForApi(routineData)` function from the `domain/transformers` module to format the data for the backend.
  3.  Makes the `POST /api/routines` request using the transformed data.
- **Called From**: The `useRoutineBuilder` hook's `saveRoutine` handler.

### `async function updateRoutine(routineId: string, routineData: Partial<Routine>): Promise<Routine>`

- **Orchestration**:
  1.  Validates and transforms the `routineData`.
  2.  Makes the `PUT /api/routines/:id` request.
- **Called From**: The `useRoutineBuilder` hook's `saveRoutine` handler when in "edit" mode.

### `async function deleteRoutine(routineId: string): Promise<void>`

- **Orchestration**: Makes the `DELETE /api/routines/:id` request.
- **Called From**: The `useRoutineDetail` hook's `handleDelete` handler.

---

## 2. `WorkoutSessionService`

This service will handle the logic for the Workout Player.

### `async function startWorkoutSession(sessionId: string): Promise<WorkoutSession>`

- **Orchestration**:
  1.  Fetches the session data from `GET /api/workout-sessions/:id`.
  2.  Fetches the user's performance history for all exercises in the session via `GET /api/exercises/:id/history`.
  3.  Combines this data into a single state object.
  4.  Saves the combined state object to the local persistent store (IndexedDB).
- **Called From**: The `useWorkoutPlayer` hook on its initial load.

### `async function syncWorkoutSession(sessionData: WorkoutSession): Promise<WorkoutSession>`

- **Orchestration**:
  1.  Transforms the locally stored performance log into the format expected by the backend.
  2.  Makes the `PUT /api/workout-sessions/:id` request with the performance log.
  3.  On success, it clears the session data from the local persistent store.
- **Called From**: The `useWorkoutPlayer` hook when the user clicks "Finish Workout". It will also be called by a background sync mechanism if the initial sync fails due to being offline.
