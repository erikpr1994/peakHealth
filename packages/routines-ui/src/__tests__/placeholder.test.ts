import { describe, it, expect } from 'vitest';
import { ComponentsPlaceholder } from '../components';
import { HooksPlaceholder } from '../hooks';
import * as ContextExports from '../context';

describe('Export tests', () => {
  it('should have placeholder exports for components and hooks', () => {
    expect(ComponentsPlaceholder).toBe('ComponentsPlaceholder');
    expect(HooksPlaceholder).toBe('HooksPlaceholder');
  });

  it('should have routine builder context exports', () => {
    expect(ContextExports).toHaveProperty('RoutineBuilderContext');
    expect(ContextExports).toHaveProperty('RoutineBuilderProvider');
    expect(ContextExports).toHaveProperty('routineBuilderReducer');
  });
});
