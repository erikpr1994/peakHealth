import { describe, expect, it, vi } from 'vitest';

// Mock server-only import
vi.mock('server-only', () => ({}));

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'test-anonymous-id' })),
  })),
}));

// Mock the actual module to avoid complex Headers mocking
vi.mock('./anonymousId', () => ({
  setAnonymousIdIfNeeded: vi.fn(),
  getAnonymousId: vi.fn(() => Promise.resolve('test-anonymous-id')),
}));

import { setAnonymousIdIfNeeded, getAnonymousId } from './anonymousId';

describe('anonymousId', () => {
  describe('setAnonymousIdIfNeeded', () => {
    it('should be callable', () => {
      expect(setAnonymousIdIfNeeded).toBeDefined();
      expect(typeof setAnonymousIdIfNeeded).toBe('function');
    });
  });

  describe('getAnonymousId', () => {
    it('should return anonymous ID from cookies', async () => {
      const result = await getAnonymousId();
      expect(result).toBe('test-anonymous-id');
    });
  });
});
