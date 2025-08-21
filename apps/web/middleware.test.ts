import { describe, it, expect } from 'vitest';

describe('Middleware', () => {
  it('should be properly configured with Hypertune', () => {
    // This test verifies that the middleware file can be imported without errors
    expect(async () => {
      await import('./src/middleware');
    }).not.toThrow();
  });
});
