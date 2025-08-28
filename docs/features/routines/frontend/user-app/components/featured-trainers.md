# User App Component: FeaturedTrainers

**File Path**: `apps/web/src/features/routines/components/explore/FeaturedTrainers.tsx`

## 1. Summary

This component is displayed at the top of the Explore page to showcase featured trainers and provide a quick way to filter the routine library by their creations.

## 2. Props

```typescript
interface FeaturedTrainersProps {
  trainers: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  onTrainerSelect: (trainerId: string) => void;
}
```

## 3. UI and Interaction

- The component will render a horizontally scrolling list of `TrainerProfileCard`s.
- Each card will display the trainer's avatar and name.
- Clicking a card will call the `onTrainerSelect` handler, which will be used by the parent page to filter the main routine list.

## 4. State Management

This is a presentational component that receives all data and callbacks via props.
