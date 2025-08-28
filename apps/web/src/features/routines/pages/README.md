# Pages

This directory contains page-level components for the Routines feature.

## Purpose

- Page-level components that orchestrate features
- Components that correspond to routes in the application
- Composition of smaller components and hooks

## Guidelines

- Keep page components focused on orchestration
- Extract complex logic to hooks or services
- Use smaller components for UI rendering
- Keep pages thin and delegate to feature components

## Examples

```typescript
// RoutineListPage.tsx
import { useRoutines } from '../api/routinesApi';
import { RoutineList } from '../components/RoutineList';
import { RoutineFilters } from '../components/RoutineFilters';

export function RoutineListPage() {
  const { data, error, isLoading } = useRoutines();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>My Routines</h1>
      <RoutineFilters />
      <RoutineList routines={data.routines} />
    </div>
  );
}

// RoutineDetailPage.tsx
import { useRouter } from 'next/router';
import { useRoutine } from '../api/routinesApi';
import { RoutineDetail } from '../components/RoutineDetail';

export function RoutineDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useRoutine(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <RoutineDetail routine={data} />;
}
```
