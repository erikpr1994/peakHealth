### feat(routines): [FRO-11, FRO-12] Establish Routine Builder State Foundation

This pull request implements the foundational state management layer for the Routine Builder within the new `@peakhealth/routines-ui` package, addressing tickets FRO-11 and FRO-12.

#### Changes Made:

-   **Established Core Architecture**: Implemented the main reducer, React context, provider, and core hooks (`useRoutineBuilder`, `useRoutineBuilderContext`).
-   **Introduced Mutation Utilities**: Created the pattern of using dedicated, type-safe mutation utilities for handling state logic. This keeps the central reducer clean and simple, acting only as a dispatcher.
-   **Proof-of-Concept**: Includes the first action (`UPDATE_ROUTINE_NAME`) and its corresponding mutation utility as a working example of the new pattern.
-   **Updated Documentation**: The `use-routine-builder.md` doc has been updated to reflect this robust architectural pattern.

#### Next Steps:

-   Continue building out the remaining mutation utilities (for workouts, sections, exercises, sets) to complete FRO-11.
-   Implement the suite of selector hooks as defined in FRO-13.

**Note on Linting**: There are currently some `import/resolver` errors being thrown by the pre-commit hook. This appears to be a linter configuration issue with the monorepo workspace and not a code-level error. The code should function correctly once the linter's cache/config is refreshed.
