# Page: Routine Detail (`/routines/:id`)

This page provides a comprehensive, detailed view of a single routine. It is the central place for a user to understand their workout plan, see every workout and exercise, and initiate a workout session.

## 1. Layout & UX Philosophy

To avoid information overload, this page will use a **tabbed interface**. This organizes the content into logical sections, allowing the user to focus on one aspect of the routine at a time: the high-level overview, the weekly schedule, or the detailed workout breakdown.

## 2. Data Fetching

-   **Primary Data**: Fetches a single, fully-populated routine document by its ID. This must contain the complete, deeply-nested structure of all `workouts`, `sections`, and `exercises`.

## 3. Component Breakdown

### A. `RoutineDetailHeader`
-   **Purpose**: A sticky header with the routine's name, description, and primary actions.
-   **Components**: `BackButton`, `RoutineTitle`, `ActionButtons` (Favorite, Edit, Duplicate, Delete, Start).

### B. `TabNavigation`
-   **Purpose**: Allows the user to switch between the "Overview", "Weekly Schedule", and "Workouts" tabs.

### C. `OverviewTab` (Default)
-   **Purpose**: Displays the high-level summary of the routine.
-   **Components**:
    -   `StatCardGrid`: A grid of `StatCard` components (Duration, Frequency, Avg. Duration).
    -   `ProgressTracker`: Shows the two progress bars for overall and workout completion.
    -   `ObjectivesList`: A list of the routine's objectives.

### D. `WeeklyScheduleTab`
-   **Purpose**: Provides a visual calendar view of the workouts for the week.
-   **Components**:
    -   `WeekCalendar`: A 7-day view with `WorkoutScheduleCard`s on the appropriate days.

### E. `WorkoutsTab`
-   **Purpose**: The main content of the page, showing the full details of every workout.
-   **Components**:
    -   `WorkoutList`: Contains a list of expandable `WorkoutDayAccordion` components for each workout in the routine.
    -   `WorkoutDayAccordion`: When expanded, reveals the sections and exercises for that day.
    -   `ExerciseRow`: Displays a single exercise with its sets, reps, weight, and rest info. (Shared Component)

## 4. State Management & Hooks

The logic for this page will be encapsulated in a dedicated custom hook to keep the component hierarchy clean and maintain a clear separation of concerns, following project conventions.

### `useRoutineDetail(routineId: string)`

This hook will be the single source of truth for the Routine Detail page.

-   **Location**: `src/features/routines/routine-detail/hooks/useRoutineDetail.ts`
-   **Responsibilities**:
    1.  **Data Fetching**: It will use SWR to fetch the complete routine object from the API using the provided `routineId`. It will handle loading and error states.
    2.  **UI State**: It will use a `useState` hook to manage the currently active tab (e.g., `'overview'`, `'schedule'`, or `'workouts'`).
    3.  **Exposed API**: The hook will return an object containing:
        -   The fetched `routine` data.
        -   `isLoading` and `error` states from SWR.
        -   The `activeTab` state.
        -   A `setActiveTab` function for the `TabNavigation` component to call.
        -   Handler functions for the `ActionButtons` in the header (e.g., `handleFavorite`, `handleDelete`).

### Page Component (`app/routines/[id]/page.tsx`)

The actual page file will be a thin, "dumb" wrapper that does the following:
1.  Gets the `routineId` from the URL parameters.
2.  Calls the `useRoutineDetail(routineId)` hook to get all the data and logic.
3.  Passes the data and callbacks down to the presentational components (`RoutineDetailHeader`, `TabNavigation`, etc.).

## 5. Conditional Logic (User with Trainer)

-   If the routine is assigned by a trainer (`createdBy: 'trainer'`):
    -   The `ActionButtons` in the header will not include "Edit" or "Delete".
    -   Other actions like "Set Active" might also be disabled.
