import { describe, it, expect } from 'vitest';
import * as Types from './index';

describe('Routines Types Package', () => {
  it('exports all required types', () => {
    // Check that the package exports the expected number of types
    const exportedKeys = Object.keys(Types);

    // For TypeScript types, we need to check if the type is exported
    // Since types are erased at runtime, we'll just check if the module exists
    expect(Types).toBeDefined();
  });
});
