# Shared Frontend Documentation

This directory contains documentation for frontend components, hooks, and utilities that are designed to be shared across multiple applications (User App, Trainer App, Admin App).

The goal is to build generic, composable pieces that can be adapted for different contexts to maximize code reuse and maintain consistency.

## Areas for Shared Components:

-   **Routine Builder**: The core UI for constructing a routine (adding workouts, sections, exercises) can be shared, with props controlling variations for different user roles (e.g., a trainer might have access to a library of reusable sections, while a user might not).
-   **Routine Viewer**: The component that displays a routine's details is likely identical across apps.
-   **Form Elements**: Inputs, selectors, and other form controls used in the creation/editing process.
-   **Data Display**: Cards for displaying routine, workout, or exercise summaries.
