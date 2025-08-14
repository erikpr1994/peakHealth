import { describe, it, expect } from 'vitest';
import { cn, safeDateConversion, isValidUUID } from './utils';

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
  });

  describe('safeDateConversion', () => {
    it('should convert valid date string to Date object', () => {
      const result = safeDateConversion('2024-01-01');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
    });

    it('should return undefined for invalid date string', () => {
      expect(safeDateConversion('invalid-date')).toBeUndefined();
    });

    it('should return undefined for null or undefined', () => {
      expect(safeDateConversion(null)).toBeUndefined();
      expect(safeDateConversion(undefined)).toBeUndefined();
    });

    it('should return undefined for non-string values', () => {
      expect(safeDateConversion(123)).toBeUndefined();
      expect(safeDateConversion({})).toBeUndefined();
    });
  });

  describe('isValidUUID', () => {
    it('should validate correct UUIDs', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    });

    it('should reject invalid UUIDs', () => {
      expect(isValidUUID('not-a-uuid')).toBe(false);
      expect(isValidUUID('123e4567-e89b-12d3-a456')).toBe(false);
      expect(isValidUUID('')).toBe(false);
    });

    it('should handle case insensitive UUIDs', () => {
      expect(isValidUUID('123E4567-E89B-12D3-A456-426614174000')).toBe(true);
    });
  });
});
