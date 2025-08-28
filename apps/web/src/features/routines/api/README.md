# API Client Layer

This directory contains API client functions and SWR hooks for the Routines feature.

## Purpose

- API client functions for interacting with the backend
- SWR hooks for data fetching and caching
- Request and response handling

## Examples

```typescript
// routinesApi.ts
import useSWR from 'swr';
import { Routine, RoutineListResponse } from '../types/routine';

export function useRoutines() {
  return useSWR<RoutineListResponse>('/api/routines');
}

export function useRoutine(id: string) {
  return useSWR<Routine>(id ? `/api/routines/${id}` : null);
}

export async function createRoutine(routineData: RoutineCreateRequest) {
  // Implementation
}

export async function updateRoutine(
  id: string,
  routineData: RoutineUpdateRequest
) {
  // Implementation
}

export async function deleteRoutine(id: string) {
  // Implementation
}
```
