# Page: Workout Player (`/workout/:sessionId`)

This is the real-time, interactive screen where a user performs and logs a workout session. The primary design goals are clarity, focus, and efficiency to minimize friction during a workout.

## 1. Layout & UX Philosophy

The UI is designed around a "focus, then log" philosophy. During an active set, the user sees a minimal view of the task at hand. During the rest period, the UI presents the inputs for logging the performance of the set just completed. This allows the user to focus on their exercise without distraction and use their rest time efficiently for data entry.

- **Focus Mode**: The layout will be clean and minimal, dominated by the current exercise.
- **Mobile-First**: The design will be optimized for a mobile device, as this is the most likely context for its use.

## 2. Data Fetching

- **Primary Data (`GET`)**: On page load, it will fetch the full `workout_session` object using the `sessionId` from the URL. This object will contain the routine's structure for that specific day (all exercises, sections, and target sets/reps/weights).
- **Offline-First Data Logging**: The player is designed to be fully functional offline.

1.  **Cache on Load**: When the session begins, the entire `workout_session` object is fetched and stored in a local, persistent store (e.g., IndexedDB).
2.  **Log Locally**: During the workout, all performance data (reps, weight, etc.) is saved **only to the local store**. No network requests are made for each set. This ensures a fast, reliable experience even in airplane mode.
3.  **Sync on Finish**: When the user clicks "Finish Workout," the application sends the complete `performanceLog` to the backend via a single `PUT` request to `/api/workout-sessions/:sessionId`. If the user is offline, the session is marked as "pending sync" locally and will be uploaded automatically the next time the app is online.

- **Historical Performance Data (GET)**: To provide contextual guidance (e.g., showing the weight used in the last session), the player will also need to fetch the user's recent performance history for the exercises included in the current workout.

## 3. Component Breakdown

### A. `WorkoutPlayerHeader`

- **Purpose**: A sticky header displaying the name of the workout and the elapsed time.
- **Actions**: Contains a primary "Finish Workout" button.

### B. `ExerciseStepper`

- **Purpose**: The main view during the "doing" phase. It displays a clean summary of the current exercise and set, with a single call to action to complete it.
- **Components**:
  - `ExerciseCard`: Displays the details for the current exercise, including name, equipment, instructions, and a video or image.
  - `SetProgress`: Shows the current set (e.g., "Set 1 of 2").
  - `SetTargetInfo`: Displays the target for the current set. Crucially, it will also provide contextual guidance to help the user perform optimally. For example:
    - **For a standard set**: "Target: 10 reps @ 100 lbs".
    - **For an AMRAP set**: "Target: Perform for 60s". It will also show a suggested weight, either one programmed by the coach or the weight the user lifted in their last session for this exercise (e.g., "Last time: 95 lbs").
- **Action**: A single "Complete Set" or "Complete Left Side" button.

### C. `RestTimerView` (Shared Component)

- **Purpose**: The main view during the "logging" phase. This is a full-screen component that appears after a set is completed.
- **Components**:
  - `RestTimer`: The countdown timer component. See [Rest Timer Documentation](./../../shared/components/rest-timer.md).
  - `SetsLogger`: The form for logging performance data (reps, RPE, notes) for the set that was just completed.
- **Action**: A "Submit Set Data" button that logs the data and prepares the UI for the next set.

### D. `WorkoutProgressBar`

- **Purpose**: A persistent progress bar, likely at the top or bottom of the screen, showing how far the user is through the entire workout (e.g., "Exercise 3 of 8").

### E. `WorkoutSummaryModal`

- **Purpose**: A modal that appears after the user clicks "Finish Workout".
- **Data**: Displays a summary of the session: total time, total volume (weight lifted), exercises completed, and personal records achieved.

## 4. Detailed Scenarios and Behaviors

To handle the complexity of the routines, the Workout Player must adapt its UI based on the structure of the workout.

### A. Section Transitions and Types

- **Clear Signposting**: When a user completes the last exercise of a section, the player will show an interstitial screen (e.g., "Warmup Complete. Next up: Main Workout"). This provides a clear sense of progression.
- **Timed Sections (EMOM/Tabata)**: When entering an EMOM (Every Minute On the Minute) or Tabata section, the primary UI will shift from an exercise stepper to a large, full-screen timer that dictates the user's work and rest periods according to the section's configuration. The specific exercises to be performed will be clearly displayed within this timer view.

### B. `SetsLogger` UI Adaptations

The `SetsLogger` is the most dynamic component and will change its inputs based on the exercise's configuration.

- **Standard Sets**: Displays inputs for `Reps` and `Weight`.
- **Dual Progression**: Displays inputs for a rep range (e.g., "8-12") to guide the user's target.
- **AMRAP (As Many Reps As Possible) / Timed Sets**: The _target_ on the active exercise screen will be displayed as a duration (e.g., "Perform for 60 seconds"). However, the `SetsLogger` form will still provide inputs for the `Reps` and `Weight` the user actually achieved during that time.
- **To Failure Sets**: The `Reps` input is disabled or styled to indicate the goal is maximum effort, not a specific number.
- **Myo-Reps / Widowmaker**: The UI will present a specific guide for these advanced methods, clearly separating the "activation set" from the "mini-sets" for Myo-Reps, or showing the single high-rep target for a Widowmaker.

### C. Guiding Unilateral Exercises

The `SetsLogger` will also adapt for exercises marked as unilateral.

- **`alternating`**: A single set row will have distinct inputs for `Left Reps` and `Right Reps`.
- **`sequential`**: The logger will display separate, clearly labeled rows for each side (e.g., "Set 1 (Left)", "Set 1 (Right)").

## 5. State Management & Hooks

The Workout Player is a complex, stateful, multi-step component. To manage this complexity without prop drilling, we will use a dedicated, feature-scoped React Context. This follows the same successful pattern used for the Routine Builder.

### A. `useWorkoutPlayer` Hook (The Source of Truth)

This is the main hook that will be called **once** at the page level.

- **Responsibilities**:

1. **Reducer**: It will use a `useReducer` to manage the entire complex state of the active workout session, including the current exercise/set index, user-logged performance data, and the rest timer's status.
2. **Data Persistence**: It will be responsible for fetching the initial `workout_session`, saving it to a local persistent store, and updating that local store as the user logs their performance. It will also handle the final "sync on finish" logic.

- **Returns**: The `state` object and the `dispatch` function from the reducer.

### B. `WorkoutPlayerProvider` Component

The page component (`/app/workout/[sessionId]/page.tsx`) will call the `useWorkoutPlayer` hook and wrap the entire UI in this provider. This makes the state and dispatch function available to all descendant components.

### C. Selector Hooks (for Consumers)

To keep child components clean, performant, and decoupled from the main state shape, they will not consume the context directly. Instead, they will use focused selector hooks.

- **`useCurrentExercise()`**: Returns only the data for the exercise currently being displayed, along with handlers to navigate to the next/previous exercise.
- **`useCurrentSet()`**: Returns the target data and logged performance for the specific set being performed. It also provides the `logSet` dispatcher.
- **`useRestTimer()`**: Returns the timer's status (`running`, `finished`), remaining time, and functions to `skip` or `addTime`.

This architecture ensures that all state logic is centralized in the `useWorkoutPlayer` reducer, and components only re-render when the specific slice of state they care about changes.

## 6. User Interaction Flow

1.  User clicks "Start Today's Workout" from the dashboard and navigates to this page.
2.  The `useWorkoutPlayer` hook fetches the session data and saves a full copy to a local persistent store. The first exercise is displayed.
3.  The user sees the **Active Exercise Screen** showing the target for "Set 1". They perform the set.
4.  The user taps the "Complete Set" button.
5.  The view transitions to the **Rest & Log Screen**. The `RestTimer` begins its countdown, and the `SetsLogger` form appears.
6.  During their rest, the user enters their performance data (reps, RPE, etc.) and taps "Submit Set Data". The data is saved to the local store.
7.  Once the rest timer finishes and the data is submitted, the view transitions back to the **Active Exercise Screen**, now showing the target for "Set 2".
8.  This cycle continues until the final exercise is complete.
9.  After the final set, the user clicks "Finish Workout". The app attempts to sync the full performance log with the backend. The `WorkoutSummaryModal` appears, and upon closing it, the user is navigated back to the dashboard.
