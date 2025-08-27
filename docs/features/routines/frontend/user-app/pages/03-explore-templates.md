# Page: Routine Library (`/routines/explore`)

This page serves as a full-screen gallery where users can browse, search, and filter all available platform and public `TemplateRoutine`s. It's the primary discovery hub for high-quality, pre-built workout plans.

## 1. Layout

The page will feature a responsive grid layout for the routine cards. The number of columns in the grid will adapt to the screen size:
-   **Mobile**: 1 column
-   **Tablet**: 2-3 columns
-   **Desktop**: 3-4 columns

This ensures an optimal viewing experience across all devices.

## 2. Data Fetching

-   **Primary Data**: Fetches a paginated list of all public `TemplateRoutine`s from the API.

## 3. Component Breakdown

This page demonstrates the power of our shared component architecture.

### A. `FeaturedTrainers`
-   **Purpose**: A section at the top of the page to showcase featured trainers and their routines.
-   **Components**:
    -   `TrainerProfileCard`: A small card with a trainer's photo, name, and a button to "View Routines". Clicking this will filter the list below.

### B. `ExplorePageHeader`
-   **Purpose**: Displays the page title and a brief description.
-   **Components**:
    -   `Title`: "Explore Routines"
    -   `Subtitle`: "Find the perfect plan from our library of expert-curated templates."

### C. `RoutineFilterControls` (Shared Component)
-   **Purpose**: Provides the exact same search, filter, and view-switching capabilities as the dashboard. This component will be imported directly from our shared component library.

### D. `RoutineList`
-   **Purpose**: Displays the grid or list of all available template routines.
-   **Components**:
    -   `ResultCount`: Displays the number of templates found.
    -   `RoutineCard` (Shared Component): The same card used on the dashboard, reused here to display each template's summary. Clicking the card will navigate to the routine detail page (`/routines/:id`).

## 4. State Management & Hooks

### `useExploreRoutines()`

This hook will manage the logic for the Explore page.

-   **Location**: `src/features/routines/explore/hooks/useExploreRoutines.ts`
-   **Responsibilities**:
    1.  **Read URL Parameters**: On initialization, the hook will read URL search parameters (e.g., `?goal=strength`, `?trainerId=123`) to determine if a pre-filtered view is requested.
    2.  **Data Fetching**: It will use SWR to fetch the list of public `TemplateRoutine`s.
    3.  **Filter State**: It will compose the shared `useRoutineFilters` hook, passing in the initial state derived from the URL parameters.
    4.  **Exposed API**: The hook will return the final, filtered list of routines and the `filterControls` object to be passed to the `RoutineFilterControls` component.

## 5. User Interaction Flow

1.  User navigates to the page.
2.  The `useExploreRoutines` hook fetches all templates.
3.  User uses the `RoutineFilterControls` to narrow down the list.
4.  User clicks on a `RoutineCard` that interests them.
5.  User is navigated to the `Routine Detail` page for that template, where they can view it in full and decide to start it (which would create a `routine_assignment`).
