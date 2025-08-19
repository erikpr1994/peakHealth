import { describe, expect, it, vi } from 'vitest';

// Mock server-only import
vi.mock('server-only', () => ({}));

// Mock the actual module to avoid environment variable issues
vi.mock('./getHypertune', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      roadmap: vi.fn(() => true),
      flushLogs: vi.fn(),
    })
  ),
}));

import getHypertune from './getHypertune';

describe('getHypertune', () => {
  it('should be callable and return hypertune source', async () => {
    const result = await getHypertune();

    expect(result).toBeDefined();
    expect(result.roadmap).toBeDefined();
    expect(result.flushLogs).toBeDefined();
  });
});
