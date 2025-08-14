import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', 'conditional')).toBe('base conditional');
      expect(cn('base')).toBe('base');
    });

    it('should handle arrays and objects', () => {
      expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe(
        'class1 class2 class3'
      );
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
    });

    it('should handle mixed inputs', () => {
      expect(
        cn('base', ['array1', 'array2'], { obj1: true, obj2: false })
      ).toBe('base array1 array2 obj1');
    });
  });
});
