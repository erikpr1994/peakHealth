# Services

This directory contains service functions for the Routines feature.

## Purpose

- Higher-level services that orchestrate domain logic and API calls
- Bridge between UI and backend
- Complex operations that involve multiple steps

## Guidelines

- Services should be stateless
- Use domain functions for business logic
- Use API functions for data fetching
- Handle errors and edge cases

## Examples

```typescript
// routineService.ts
import { createRoutine, updateRoutine } from '../api/routinesApi';
import { transformRoutineForApi } from '../domain/transformers/routineTransformers';
import { validateRoutine } from '../domain/validators/routineValidators';
import { RoutineFormData, RoutineValidationError } from '../types/routine';

export async function createNewRoutine(routineData: RoutineFormData) {
  // Validate the routine data
  const validationErrors = validateRoutine(routineData);
  if (validationErrors.length > 0) {
    throw new RoutineValidationError(validationErrors);
  }

  // Transform the data for the API
  const apiData = transformRoutineForApi(routineData);

  // Call the API
  return createRoutine(apiData);
}

export async function updateExistingRoutine(
  id: string,
  routineData: RoutineFormData
) {
  // Validate the routine data
  const validationErrors = validateRoutine(routineData);
  if (validationErrors.length > 0) {
    throw new RoutineValidationError(validationErrors);
  }

  // Transform the data for the API
  const apiData = transformRoutineForApi(routineData);

  // Call the API
  return updateRoutine(id, apiData);
}
```
