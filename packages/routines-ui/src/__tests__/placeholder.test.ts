import { describe, it, expect } from 'vitest';
import { ComponentsPlaceholder } from '../components';
import { HooksPlaceholder } from '../hooks';
import { ContextPlaceholder } from '../context';

describe('Placeholder tests', () => {
  it('should have placeholder exports', () => {
    expect(ComponentsPlaceholder).toBe('ComponentsPlaceholder');
    expect(HooksPlaceholder).toBe('HooksPlaceholder');
    expect(ContextPlaceholder).toBe('ContextPlaceholder');
  });
});

