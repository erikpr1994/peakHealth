# User-Facing API Endpoints

This document defines the API contract required by the **User App frontend**. These endpoints are distinct from the admin/trainer-focused endpoints used for managing templates and content libraries.

---

## 1. Routines

### `GET /api/routines`

Fetches all routines associated with the currently authenticated user. This includes routines they created themselves and those assigned to them.

- **Query Params**:
  - `?type=active`: Returns only the user's single active routine.
  - `?type=user`: Returns only routines created by the user.
  - `?type=assigned`: Returns only routines assigned to the user.
- **Response (200 OK)**: `{ routines: Routine[] }`

### `POST /api/routines`

Creates a new `UserCreatedRoutine`.

- **Request Body**: A `Routine` object (without `id`).
- **Response (201 Created)**: The newly created `Routine` document.

### `GET /api/routines/:id`

Fetches a single, fully populated routine document by its ID.

- **Response (200 OK)**: The `Routine` document.

### `PUT /api/routines/:id`

Updates a `UserCreatedRoutine` that the user owns.

- **Request Body**: A partial `Routine` object.
- **Response (200 OK)**: The updated `Routine` document.

### `DELETE /api/routines/:id`

Deletes a `UserCreatedRoutine` that the user owns.

- **Response (204 No Content)**

### `POST /api/routines/:id/favorite`

Toggles the favorite status for a routine.

- **Response (200 OK)**: `{ isFavorite: boolean }`

---

## 2. Template Library (Explore)

### `GET /api/templates/routines`

Fetches all public `TemplateRoutine`s for the Explore page.

- **Query Params**:
  - `?page=1&limit=20` (for pagination)
  - `?goal=strength` (for filtering)
  - `?difficulty=intermediate` (for filtering)
  - `?search=push-pull` (for text search)
- **Response (200 OK)**: A paginated response object with `{ templates: TemplateRoutine[], total: number }`.

---

## 3. Workout Sessions & Performance

### `GET /api/workout-sessions/:id`

Fetches the specific workout session plan before the user begins the workout.

- **Response (200 OK)**: The `WorkoutSession` document.

### `PUT /api/workout-sessions/:id`

Saves the results of a completed workout. This is the sync endpoint for the offline-first player.

- **Request Body**: The full `performanceLog` object.
- **Response (200 OK)**: The updated `WorkoutSession` document.

### `GET /api/exercises/:id/history`

Fetches the user's recent performance history for a single exercise to provide guidance in the workout player.

- **Query Params**: `?limit=5` (to get the last 5 performances).
- **Response (200 OK)**: `{ history: PerformanceLogEntry[] }`
