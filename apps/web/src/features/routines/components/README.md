# Shared Components

This directory contains shared components used across the Routines feature.

## Purpose

- Reusable UI components specific to the Routines feature
- Components that are used in multiple pages or contexts within the feature
- Small, focused components with clear responsibilities

## Guidelines

- Keep components small and focused (under 300 lines)
- Use CSS modules for styling
- Co-locate tests with components
- Extract complex logic to hooks or services

## Examples

```typescript
// RoutineCard.tsx
import styles from './RoutineCard.module.css';
import { Routine } from '../types/routine';

interface RoutineCardProps {
  routine: Routine;
  onClick?: (routine: Routine) => void;
}

export function RoutineCard({ routine, onClick }: RoutineCardProps) {
  // Implementation
}
```
