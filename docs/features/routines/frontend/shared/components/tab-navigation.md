# Shared Component: TabNavigation

**File Path**: `packages/ui/src/components/common/TabNavigation.tsx`

## 1. Summary

A reusable component for rendering a set of navigation tabs. It is used on the Routine Detail page to switch between different views of the routine data.

## 2. Props

```typescript
interface TabNavigationProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
}
```

## 3. UI and Interaction

- The component maps over the `tabs` array to render a list of buttons or links.
- The tab corresponding to the `activeTab` prop will have a distinct visual style (e.g., an active indicator underline, different color).
- Clicking a tab will invoke the `onTabClick` callback with the tab's `id`.

## 4. State Management

This is a controlled, presentational component. The parent component is responsible for managing the `activeTab` state and passing it down.
