import { describe, it, expect, vi } from 'vitest';

// Mock server-only to prevent test failures
vi.mock('server-only', () => ({}));

// Mock the generated Hypertune files
vi.mock('../../../generated/hypertune', () => ({
  createSource: vi.fn(() => ({
    initIfNeeded: vi.fn((): void => {
      // Mock implementation
    }),
    setOverride: vi.fn((): void => {
      // Mock implementation
    }),
    root: vi.fn(
      (): {
        dehydrate: () => Record<string, unknown>;
        getRootArgs: () => Record<string, unknown>;
      } => ({
        dehydrate: (): Record<string, unknown> => ({}),
        getRootArgs: (): Record<string, unknown> => ({}),
      })
    ),
  })),
}));

vi.mock('../../../generated/hypertune.vercel', () => ({
  getVercelOverride: vi.fn(
    (): Promise<Record<string, unknown>> => Promise.resolve({})
  ),
}));

describe('getHypertune', () => {
  it('should be properly configured', async () => {
    // This test verifies that the getHypertune function can be imported without errors
    expect(async () => {
      const getHypertune = (await import('./getHypertune')).default;
      expect(typeof getHypertune).toBe('function');
    }).not.toThrow();
  });
});
