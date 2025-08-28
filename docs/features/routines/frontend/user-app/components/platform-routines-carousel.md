# User App Component: PlatformRoutinesCarousel

**File Path**: `apps/web/src/features/routines/components/dashboard/PlatformRoutinesCarousel.tsx`

## 1. Summary

This component is used on the Routines Dashboard to showcase a curated list of featured `TemplateRoutine`s. Its purpose is to drive discovery and encourage users to explore high-quality, pre-built plans.

## 2. Props

The component requires a list of routines to display.

```typescript
interface PlatformRoutinesCarouselProps {
  routines: RoutineCardProps['routine'][]; // Array of routine data
}
```

## 3. UI and Interaction

The component consists of two main parts:

### A. `CarouselHeader`

- **Title**: A clear title, such as "Recommended For You" or "Explore Our Library".
- **"View All" Link**: A link or button that navigates the user to the full `/routines/explore` page.

### B. `Carousel`

- **Functionality**: A horizontally scrolling container that displays a list of `RoutineCard` components.
- **Component Re-use**: It will re-use the shared `RoutineCard` component for each item, ensuring a consistent look and feel with the rest of the app.

## 4. State Management

This is a "dumb" presentational component.

- It receives the `routines` array as a prop from its parent (the Dashboard page).
- It does not fetch its own data.
- The parent page, which uses the `useRoutinesDashboard` hook, is responsible for fetching the list of platform routines and passing it to this component.
