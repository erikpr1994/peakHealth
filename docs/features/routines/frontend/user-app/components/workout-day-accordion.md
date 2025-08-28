# User App Component: WorkoutDayAccordion

**File Path**: `apps/web/src/features/routines/components/detail/WorkoutDayAccordion.tsx`

## 1. Summary

This component is used in the "Workouts" tab of the Routine Detail page. It acts as an expandable container for a single day's workout, showing a high-level summary in its header and the full exercise list in its body. It is built using the shared `Accordion` component.

## 2. Props

```typescript
interface WorkoutDayAccordionProps {
  workout: {
    id: string;
    name: string; // e.g., "Day 1: Upper Body"
    summary: string; // e.g., "3 exercises, 9 sets"
    sections: {
      id: string;
      name: string;
      exercises: {
        id: string;
        name: string;
        setsSummary: string; // e.g., "3x 8-12"
      }[];
    }[];
  };
}
```

## 3. UI and Interaction

- **Header**: The `Accordion.Header` will display the `workout.name` and `workout.summary`.
- **Body**: When expanded, the `Accordion.Body` will display the list of sections and exercises for that day. It will likely reuse a simple `ExerciseRow` component to display each exercise's details.

## 4. State Management

This is a presentational component that receives the `workout` object as a prop.
