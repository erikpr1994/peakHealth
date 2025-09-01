import { describe, it, expect } from 'vitest';
import { generateId } from './idGenerator';

describe('idGenerator', () => {
  describe('generateId', () => {
    it('should generate a unique string ID', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeDefined();
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with timestamp and random components', () => {
      const id = generateId();

      // Should contain a hyphen separating timestamp and random parts
      expect(id).toContain('-');

      // Should have reasonable length (timestamp + hyphen + random)
      expect(id.length).toBeGreaterThan(10);
    });

    it('should generate different IDs on subsequent calls', () => {
      const ids = new Set();

      // Generate multiple IDs and ensure they're all unique
      for (let i = 0; i < 100; i++) {
        ids.add(generateId());
      }

      expect(ids.size).toBe(100);
    });
  });
});
