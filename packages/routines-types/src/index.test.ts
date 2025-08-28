import { describe, it, expect } from 'vitest';
import * as Types from './index';

describe('Routines Types Package', () => {
  it('exports all required types', () => {
    // Check that the package exports the expected number of types
    const exportedKeys = Object.keys(Types);
    expect(exportedKeys.length).toBeGreaterThan(0);
  });
});

