# User App Component: RoutineDetailHeader

**File Path**: `apps/web/src/features/routines/components/detail/RoutineDetailHeader.tsx`

## 1. Summary

This component is a sticky header for the Routine Detail page. It displays the routine's title and provides the main action buttons for the user to interact with the routine.

## 2. Props

It receives the routine's name and a set of handler functions for the action buttons.

```typescript
interface RoutineDetailHeaderProps {
  routineName: string;
  isUserCreated: boolean; // To conditionally show/hide buttons
  handlers: {
    onFavorite: () => void;
    onEdit: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
  };
}
```

## 3. UI and Interaction

- **`BackButton`**: A standard navigation control to go back to the previous page.
- **`RoutineTitle`**: Displays the `routineName`.
- **`ActionButtons`**: A set of icon buttons for the primary actions.
  - The `Edit` and `Delete` buttons will be conditionally rendered based on the `isUserCreated` prop. They will be hidden for routines assigned by a trainer.

## 4. State Management

This is a pure, presentational component. It receives all data and callbacks via props and does not manage any state of its own.
