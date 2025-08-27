# Shared Component: RoutineCard

This component is the primary display for a single routine summary in a list or grid. It is designed to be reusable across the User App (Dashboard, Explore) and Trainer App (Template Library).

## 1. Visual Mockup

![Routine Card Mockup](https://i.imgur.com/your-image-url.png) <!-- Placeholder for a cropped image of the card -->

## 2. Data Requirements (Props)

The component will need to accept a `routine` object with the following structure. This prop should be a subset of the main `Routine` type defined in the `common/data-models`.

```typescript
interface RoutineCardProps {
  routine: {
    id: string;
    name: string;
    description: string;
    frequency: string; // e.g., "3 days/week"
    avgDuration: string; // e.g., "60-75 min"
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Strength' | 'Hypertrophy' | 'Endurance';
    objectives: string[];
    isFavorite: boolean;
  };
}
```

## 3. Display Logic

-   **Icon**: The icon at the top-left seems to be generic for now, but could potentially change based on `routine.goal` or another property.
-   **Favorite Button**: The heart icon in the top-right should toggle the `isFavorite` state. Clicking it should trigger an API call.
-   **Tags**: The `difficulty` and `goal` properties are displayed as colored tags.
-   **Objectives**: The card should display the first 2-3 objectives and indicate if there are more (e.g., "+1 more objective").
-   **Actions**: The three buttons at the bottom will have different behaviors based on the context (e.g., in the User App vs. Trainer App), which can be handled by emitting events or passing in handler functions as props.

## 4. Actions (Buttons)

The card will feature two primary action buttons.

-   **`Set Active`**: Marks this routine as the user's primary, active routine. This will likely trigger a state change that promotes it to the large `ActiveRoutineCard` on the dashboard. **Note**: This button should be disabled if the user has an assigned trainer.
-   **`View`**: Navigates the user to the detailed routine view page (`/routines/:id`).

## 5. States

-   **Default**: Standard display.
-   **Favorited**: The heart icon is filled in.
-   **Hover**: A subtle shadow or border effect to indicate it's interactive.
