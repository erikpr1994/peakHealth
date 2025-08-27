# Page: Routines Dashboard (`/routines`)

This is the main landing page for the Routines feature. It provides a user with an overview of their current and available routines, and serves as the primary navigation point for creating new routines or exploring templates.

## 1. Layout

The page has a main content area that includes a featured active routine, search/filter controls, and a grid/list of other routines.

## 2. Data Fetching

-   **Primary Data**: Fetches a list of the user's assigned and self-created routines. This will likely involve calling an endpoint that queries both `routine_assignments` and `routines` collections, filtered by the current user's ID.
-   **Secondary Data**: May fetch user stats or recommendations.

## 3. Component Breakdown

Based on the mockup, the page is composed of the following components:

### A. `ActiveRoutineCard`
-   **Purpose**: A large, featured component at the top of the page that highlights the user's currently active routine.
-   **Data**: Displays comprehensive details like title, description, progress bars (week, workouts), objectives, and key stats (frequency, goal).
-   **Actions**: Contains primary actions like "Start Today's Workout" and "View Routine Details".

### B. `RoutineFilterControls`
-   **Purpose**: A set of controls below the active routine card for searching, filtering, and changing the view of the routine list.
-   **Components**:
    -   `SearchInput`: Text field for searching routines by name.
    -   `FilterDropdowns`: For filtering by "Levels" and "Goals".
    -   `FavoritesToggle`: To show only favorited routines.
    -   `ViewSwitcher`: Toggles between Grid and List views for the routine list.
-   **Note**: This is a strong candidate for a `shared` component.

### C. `RoutineList`
-   **Purpose**: Displays the grid or list of all other user routines that are not currently active.
-   **Data**: Renders a list of `RoutineCard` components based on the filters applied.
-   **Components**:
    -   `ResultCount`: Displays the number of routines found.
    -   `RoutineCard`: A card for each routine.

### D. `PlatformRoutinesCarousel`
-   **Purpose**: A dedicated carousel to showcase featured routines from the Routine Library, encouraging discovery.
-   **Data**: Fetches a separate list of curated, public `TemplateRoutine`s.
-   **Components**:
    -   `CarouselHeader`: A header with a title (e.g., "Recommended For You") and a "View All" link that navigates to the pre-filtered Routine Library page.
    -   `RoutineCard`: Reuses the shared `RoutineCard` component for each item in the carousel.

### E. `RoutineCard`
-   **Purpose**: A compact card to display summary information for a single routine in the main list.
-   **Data**: Shows title, description, frequency, average duration, difficulty/goal tags, and objectives.
-   **Actions**: Contains buttons to "Set Active" and "View" the routine.
-   **Note**: This is a primary `shared` component.

## 4. State Management & Hooks

The logic for the dashboard will be encapsulated in a dedicated custom hook to keep the component hierarchy clean and maintain a clear separation of concerns.

### `useRoutinesDashboard()`

This hook will be the single source of truth for the Routines Dashboard page.

-   **Location**: `src/features/routines/dashboard/hooks/useRoutinesDashboard.ts`
-   **Responsibilities**:
    1.  **Data Fetching**: It will use SWR to fetch multiple data sets: the user's list of routines and the list of featured "Platform Routines". It will handle all loading and error states.
    2.  **Filter State**: It will compose the shared `useRoutineFilters` hook to manage all state related to searching, filtering, and sorting the routine list.
    3.  **Exposed API**: The hook will return an object containing:
        -   The final, filtered list of `userRoutines`.
        -   The `platformRoutines` data.
        -   `isLoading` and `error` states.
        -   The `filterControls` object returned from the `useRoutineFilters` hook, which can be passed directly to the `RoutineFilterControls` component.

### Page Component (`app/routines/page.tsx`)

The actual page file will be a thin, "dumb" wrapper that:
1.  Calls the `useRoutinesDashboard()` hook.
2.  Passes the data and callbacks down to the presentational components (`ActiveRoutineCard`, `RoutineFilterControls`, `RoutineList`, etc.).

## 5. Conditional Logic (User with Trainer)

The behavior of this page changes significantly if the user has an assigned trainer.

-   **`CreateRoutineButton`**: This button will be **disabled**. The user's workout plan is managed by their trainer.
-   **`ActiveRoutineCard`**: If the active routine was assigned by a trainer, any "Edit" or "Modify" controls will be hidden. The user can view and perform the workout, but not change its structure.
-   **`RoutineCard` Actions**: The **"Set Active"** button on all other `RoutineCard`s will be **disabled**. The trainer is responsible for setting the user's active routine.
