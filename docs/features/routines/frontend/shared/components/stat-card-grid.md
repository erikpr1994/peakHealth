# Shared Component: StatCardGrid

**File Path**: `packages/ui/src/components/common/StatCardGrid.tsx`

## 1. Summary

A simple, reusable layout component that displays a grid of key statistics. It is used in the "Overview" tab of the Routine Detail page.

## 2. Props

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface StatCardGridProps {
  stats: StatCardProps[];
}
```

## 3. UI and Interaction

- The `StatCardGrid` component will use a CSS Grid layout to display the `StatCard` components.
- Each `StatCard` will display a single statistic with its label and value.

## 4. State Management

This is a pure, presentational component that only receives data via props.
