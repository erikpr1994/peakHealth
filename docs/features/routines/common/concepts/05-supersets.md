# 5. Supersets

A superset is a form of strength training where you move directly from one exercise to a separate exercise without taking a break in between.

## How it works in PeakHealth

In our system, a Superset is not a section type but rather a **grouping of exercises** within a `MainStrengthSection`.

### A. Data Model Impact

- The `StrengthExercise` object in our state will have an optional `supersetGroupId: string` property.
- Exercises that share the same `supersetGroupId` are considered part of the same superset.

### B. Routine Builder UI

- **Grouping**: The `MainStrengthSection` will allow users to drag and drop `StrengthExercise` components on top of each other to create a superset group.
- **Visual Indicator**: The UI will visually group these components together (e.g., with a shared border or background) to indicate they are part of a superset.
- **Rest Periods**: The "Rest Between Sets" input will be defined at the group level, not for the individual exercises within the group.

### C. Workout Player UI

- **Flow**: When the player encounters a superset, it will guide the user through the flow correctly.
  1.  User performs **Set 1 of Exercise A**. Clicks "Complete Set."
  2.  The player **immediately** transitions to **Set 1 of Exercise B** (no rest timer).
  3.  User performs **Set 1 of Exercise B**. Clicks "Complete Set."
  4.  The `RestTimer` now appears for the rest period defined for the superset group.
  5.  The cycle repeats for the subsequent sets.
