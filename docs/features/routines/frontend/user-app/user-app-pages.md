# User App - Page Structure

This document outlines the primary pages for the Routines feature within the User App.

## 1. `/routines` - My Routines Dashboard
-   **Purpose**: The main landing page for the feature. It lists all of the user's active routines, both self-created and those assigned from templates.
-   **Backend Interaction**: Fetches data from `routine_assignments` and user-specific `routines` collections.

## 2. `/routines/explore` - Routine Library
-   **Purpose**: A gallery where users can discover and browse public `TemplateRoutine`s. They can select a template to start, which would create a `routine_assignment`.
-   **Backend Interaction**: Fetches public `TemplateRoutine`s. `POST` to `/api/routine-assignments` when a user starts one.

## 3. `/routines/new` - Create Routine Page
-   **Purpose**: A builder for a user to create a personal `UserCreatedRoutine` from scratch.
-   **Backend Interaction**: `POST` to a user-facing `/api/routines` endpoint.

## 4. `/routines/:id` - Routine Detail Page
-   **Purpose**: Displays the complete structure of a single routine (its workouts, sections, and exercises). This is where a user would initiate a workout session.
-   **Backend Interaction**: `GET` a specific routine or routine assignment.

## 5. `/routines/:id/edit` - Edit Routine Page
-   **Purpose**: Allows a user to modify a routine they created themselves.
-   **Backend Interaction**: `PUT` to a user-facing `/api/routines/:id` endpoint.

## 6. `/workout/:sessionId` - Workout Player
-   **Purpose**: The active screen for performing and logging a scheduled workout session in real-time.
-   **Backend Interaction**: `GET` a specific `workout_session` and `PUT` updates to log performance via `/api/workout-sessions/:id`.
