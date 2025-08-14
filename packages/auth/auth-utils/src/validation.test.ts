import { describe, it, expect } from 'vitest';
import { validateEmail } from './validation';

describe('validation', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('123@numbers.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
      expect(validateEmail('test@com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });
});
