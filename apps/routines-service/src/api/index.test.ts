import { describe, it, expect } from 'vitest';
import { Router } from 'express';
import router from './index.js';

describe('API Index Router', () => {
  it('should export a router instance', () => {
    expect(router).toBeInstanceOf(Router);
  });

  it('should have router methods available', () => {
    expect(typeof router.use).toBe('function');
    expect(typeof router.get).toBe('function');
    expect(typeof router.post).toBe('function');
  });
});
