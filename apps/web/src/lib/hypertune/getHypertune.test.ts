import { describe, it, expect, vi } from 'vitest';
import getHypertune from './getHypertune';

// Mock the generated hypertune module
vi.mock('../../../generated/hypertune', () => ({
  createSource: vi.fn(() => ({
    root: vi.fn(() => ({
      roadmap: vi.fn(() => false),
      flushLogs: vi.fn(),
    })),
  })),
  User: {},
  Context: {},
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => null),
  })),
}));

describe('getHypertune', () => {
  it('should initialize Hypertune with correct configuration', async () => {
    const result = await getHypertune();

    expect(result).toBeDefined();
    expect(typeof result.roadmap).toBe('function');
    expect(typeof result.flushLogs).toBe('function');
  });

  it('should handle missing user cookie gracefully', async () => {
    const result = await getHypertune();

    // Should not throw and should return a valid hypertune instance
    expect(result).toBeDefined();
  });
});
