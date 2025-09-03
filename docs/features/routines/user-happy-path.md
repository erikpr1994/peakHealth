# User Happy Path for the Routines Feature

This document outlines the ideal, step-by-step user journey for a new user interacting with the Routines feature. It serves as a narrative guide for understanding the intended user flow and as a script for end-to-end (E2E) and manual testing.

---

## Happy Path #1: The new user

**Persona**: A user who is new to the platform and is looking for a structured workout plan.

--

## **Step 1: Discovery on the Dashboard (`/routines`)**

1.  **Action**: The user logs in and lands on the Routines Dashboard.
2.  **Observation**:
    - They see they have no "Active Routine."
    - They see a prominent call-to-action to either **`[Create a Routine]`** or **`[Explore Templates]`**.
    - They see a carousel of "Recommended For You" routines, showcasing high-quality `TemplateRoutine`s.

## **Step 2: Exploring the Library (`/routines/explore`)**

1.  **Action**: The user clicks the **`[Explore Templates]`** button.
2.  **Observation**:
    - They are navigated to the Routine Library page.
    - They see a grid of `RoutineCard` components.
    - They use the `RoutineFilterControls` to narrow the selection, filtering by `Goal: Strength` and `Difficulty: Beginner`.
    - They find a routine that looks interesting: "Beginner Strength Foundation."

## **Step 3: Viewing the Routine Details (`/routines/:id`)**

1.  **Action**: The user clicks the **`[View]`** button on the "Beginner Strength Foundation" `RoutineCard`.
2.  **Observation**:
    - They are navigated to the Routine Detail page for that template.
    - They review the **Overview Tab**, noting the duration and objectives.
    - They click the **Workouts Tab** to see the full breakdown of exercises and sets for each day.
    - They are happy with the plan.

## **Step 4: Starting the Routine**

1.  **Action**: The user clicks the primary call-to-action button in the header, **`[Start This Routine]`**.
2.  **Observation**:
    - A `routine_assignment` is created in the backend, linking the user to this specific version of the `TemplateRoutine`.
    - The system generates the `workout_sessions` for the entire duration of the plan.
    - The user is navigated back to their dashboard (`/routines`).

## **Step 5: The Updated Dashboard (`/routines`)**

1.  **Action**: The user lands back on their dashboard.
2.  **Observation**:
    - The dashboard now looks different. The large `ActiveRoutineCard` is populated with the "Beginner Strength Foundation" routine.
    - The card shows their progress (e.g., "Workout 0 of 24 completed").
    - The primary action button on the card reads **`[Start Today's Workout]`**, as the first workout is scheduled for today.

## **Step 6: Starting a Workout (`/workout/:sessionId`)**

1.  **Action**: The user clicks **`[Start Today's Workout]`**.
2.  **Observation**:
    - They are navigated to the Workout Player page. The player loads the data for the first workout session.
    - The UI is in "focus mode," showing the first set of the first exercise (e.g., "Warm-up: Jumping Jacks, Set 1 of 1").

## **Step 7: Executing and Logging a Workout**

1.  **Action**: The user performs the set of Jumping Jacks. They tap the **`[Complete Set]`** button.
2.  **Observation**:
    - The view transitions to the `RestTimerView`. The rest timer begins counting down, and the `SetsLogger` form appears.
    - The user enters their performance data (e.g., they confirm they did the target reps). They tap **`[Submit Set Data]`**.
    - This data is saved to the local, offline-first store.
    - The timer finishes, and the view transitions back to the "focus mode," showing the next exercise.
3.  **Action**: The user continues this "do, then log" cycle until they complete all exercises.
4.  **Action**: The user taps the **`[Finish Workout]`** button in the header.
5.  **Observation**:
    - The application attempts to sync the locally stored performance log with the backend.
    - The `WorkoutSummaryModal` appears, showing their stats for the session.
    - The user closes the modal and is navigated back to the dashboard.

## **Step 8: Final State on the Dashboard**

1.  **Action**: The user is back on the dashboard.
2.  **Observation**:
    - The `ActiveRoutineCard` has updated to show their new progress (e.g., "Workout 1 of 24 completed").
    - The primary action button is now disabled and reads **`[Next Workout: Wednesday]`**.

This completes the happy path for a new user successfully starting and completing their first workout.

---

## Happy Path #2: The Self-Starter

**Persona**: A user who knows what they want and prefers to build their own workout plan from scratch.

---

### **Step 1: Discovery on the Dashboard (`/routines`)**

1.  **Action**: The user logs in and lands on the Routines Dashboard.
2.  **Observation**:
    - Seeing no active routine, they decide to create their own and click the **`[Create a Routine]`** button.

### **Step 2: Building a New Routine (`/routines/new`)**

1.  **Action**: The user is navigated to the Routine Builder page.
2.  **Observation**:
    - They enter a name for their routine (e.g., "My Push Day").
    - They use the "Add Exercise" button to open the Exercise Library modal, search for exercises like "Bench Press" and "Overhead Press," and add them to their routine.
    - For each exercise, they configure the sets, reps, and progression method.
    - They save the routine.

### **Step 3: Reviewing the New Routine (`/routines/:id`)**

1.  **Action**: After saving, the user is automatically redirected to the detail page for their newly created routine.
2.  **Observation**:
    - They see the full overview of the plan they just built.
    - The routine is automatically set as their "Active Routine."

### **Step 4: Starting the First Workout**

1.  **Action**: The user navigates back to the dashboard.
2.  **Observation**:
    - They now see their "My Push Day" routine in the "Active Routine" section.
    - They click **`[Start Today's Workout]`** and proceed with the workout as described in **Happy Path #1**.
