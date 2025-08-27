# Frontend Documentation

This directory contains frontend documentation for the Routines feature, organized by application.

## Structure

-   [**Shared Components**](./shared/README.md): Documentation for reusable components, hooks, and utilities shared across all apps.
-   [**User App**](./user-app/README.md): Documentation for the main consumer-facing application.
-   **Admin App**: (Placeholder for future documentation)
-   **Trainer App**: (Placeholder for future documentation)

## Architectural Principles

### 1. Single Source of Truth via Page-Level Hooks

To ensure a predictable and maintainable application, we will adhere to a "single source of truth" principle for our page-level state.

-   **Page-Level Hooks**: Each primary page (e.g., Dashboard, Routine Detail) will have a single, dedicated custom hook (e.g., `useRoutinesDashboard`). This hook is the "container" for the page's logic.
-   **Responsibilities**: This main hook is responsible for all data fetching (using SWR), state management (using `useState` or composed hooks like `useRoutineFilters`), and exposing the necessary data and callback functions.
-   **Top-Down Data Flow**: The page component itself will call this single hook. It then passes the necessary data and functions down to its child components as props.
-   **"Dumb" Components**: Child components should be primarily presentational. They should not call page-level data-fetching hooks themselves. This prevents state desynchronization and multiple, redundant API calls, creating a clear, top-down data flow.

### 2. Component Composition to Avoid Prop Drilling

While the page-level hook acts as a single source of truth, we will actively avoid "prop drilling" (passing props through many intermediate components).

-   **The Solution**: We will use **Component Composition**. Instead of passing data down through the component tree, the top-level page component will assemble the components that need the data and pass them as props (or `children`) to the layout components.
-   **Benefit**: This keeps intermediate layout components simple and unaware of the data they are rendering, leading to a cleaner and more maintainable component tree.
-   **When to Use Context/Zustand**: Following project rules, Context is reserved for truly global state (e.g., theme, session), and libraries like Zustand are a last resort for complex client-side state. Component Composition is the preferred solution for avoiding prop drilling with page-level data.
