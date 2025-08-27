# User App Component: ActiveRoutineCard

This is a large, featured component displayed at the top of the User App's dashboard page. It provides a detailed, at-a-glance view of the user's currently active routine.

## 1. Visual Mockup

![Active Routine Card Mockup](https://i.imgur.com/your-image-url.png) <!-- Placeholder for a cropped image of the card -->

## 2. Data Requirements (Props)

This component requires a comprehensive `routine` object, as well as information about the next scheduled workout.

```typescript
interface ActiveRoutineCardProps {
  routine: {
    id: string;
    name: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Strength' | 'Hypertrophy' | 'Endurance';
    frequency: string; // e.g., "5 days/week"
    weekProgress: {
      current: number; // e.g., 9
      total: number;   // e.g., 24
    };
    workoutProgress: {
      completed: number; // e.g., 9
      total: number;     // e.g., 24
    };
    objectives: string[];
    // This field is crucial for the conditional logic
    createdBy: 'user' | 'trainer' | 'platform'; 
  };
  // This new prop will drive the dynamic actions
  nextWorkout?: {
    sessionId: string;
    isToday: boolean;
    dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'Tomorrow';
  };
}
```

## 3. Display Logic

-   **Tags**: Displays `Active` and `difficulty` tags.
-   **Progress Bars**: Visualizes both the weekly progress and the overall workout completion progress.
-   **Objectives**: Lists the main program objectives.
-   **Key Metrics**: Shows important stats like `Frequency` and `Goal` in a separate column or area.

## 4. Actions (Dynamic)

The primary action button on the card is dynamic, based on the `nextWorkout` prop.

-   **If `nextWorkout.isToday` is `true`**:
    -   A solid, primary button is displayed with the text **"Start Today's Workout"**.
    -   Clicking it navigates the user to the Workout Player for that session (`/workout/${nextWorkout.sessionId}`).

-   **If `nextWorkout.isToday` is `false`**:
    -   A disabled or secondary-style button is displayed with informative text, e.g., **"Next Workout: {nextWorkout.dayOfWeek}"**.

-   **If there is no `nextWorkout`** (e.g., routine is completed or not scheduled):
    -   The primary action button is hidden or shows a message like "Plan Complete".

The secondary **"View Routine Details"** button is always visible and navigates to the routine's detail page. Rescheduling workouts is handled on the dedicated Calendar page to keep this component focused.

## 5. Conditional Logic (Trainer vs. User)

The component's behavior changes based on the `routine.createdBy` property.

-   If `routine.createdBy` is `'trainer'`, any controls for editing, modifying, or changing the routine are **hidden**. The user can only view and execute the workouts as planned by their trainer.
-   If `routine.createdBy` is `'user'`, the user might have access to an "Edit" button or other controls (TBD on the routine detail page).
