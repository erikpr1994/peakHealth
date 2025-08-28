# Shared Component: RestTimer

**File Path**: `packages/ui/src/components/workout-player/RestTimer.tsx`

## 1. Summary

The `RestTimer` is a crucial component of the Workout Player experience. It is a modal overlay that appears automatically after a user logs a set, providing a clear, focused countdown for their rest period.

## 2. Props

The component is self-contained and does not require any direct props. It sources all of its data and actions from a dedicated selector hook.

```typescript
interface RestTimerProps {}
```

## 3. UI and Interaction

The `RestTimer` is designed to be a "focus mode" that takes over the screen to ensure the user rests appropriately.

- **Visuals**: It will be a large, circular progress indicator with the remaining time displayed prominently in the center in `MM:SS` format.
- **Sound**: A distinct sound will play when the timer completes to alert the user that it's time for their next set.
- **Visibility**: The component is only rendered when the rest timer is active. The parent component will control this based on the `status` from the `useRestTimer` hook.

### Interactive Controls

To provide flexibility during a workout, the timer will feature simple, large buttons:

- **`[ Skip Timer ]`**: A primary button to immediately end the rest period.
- **`[ +15s ]`**: A secondary button to add 15 seconds to the current countdown.
- **`[ -15s ]`**: A secondary button to subtract 15 seconds from the countdown.

## 4. State Management

The component is a "dumb" consumer of the `WorkoutPlayerContext`.

- **Hook**: It will use the `useRestTimer()` selector hook exclusively.
- **Data Consumed**:
  - `remainingTime`: To display the countdown.
  - `status`: To know when it should be visible (`'running'`).
- **Actions Dispatched**:
  - `skipTimer()`
  - `addTime(15)`
  - `subtractTime(15)`

This keeps the component itself simple and presentational, with all the timer logic managed centrally in the main `useWorkoutPlayer` reducer.
