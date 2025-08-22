import { describe, it, expect } from 'vitest';
import { routing } from './routing';

describe('i18n request configuration', () => {
  it('should import routing configuration', () => {
    expect(routing).toBeDefined();
    expect(routing.locales).toEqual(['en', 'es']);
  });

  it('should have access to routing locales', () => {
    expect(routing.locales).toContain('en');
    expect(routing.locales).toContain('es');
  });

  it('should have access to default locale', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('should have localePrefix set to always', () => {
    expect(routing.localePrefix).toBe('always');
  });
});
