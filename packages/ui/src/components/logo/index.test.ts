import { describe, expect, it } from 'vitest';
import * as LogoExports from './index';

describe('Logo exports', () => {
  it('should export Logo component', () => {
    expect(LogoExports).toHaveProperty('Logo');
    expect(typeof LogoExports.Logo).toBe('function');
  });
});
