import { routing } from './routing';

describe('i18n routing', () => {
  it('should export routing configuration with correct locales', () => {
    expect(routing).toBeDefined();
    expect(routing.locales).toEqual(['en', 'es']);
  });

  it('should have English as default locale', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('should have localePrefix set to always', () => {
    expect(routing.localePrefix).toBe('always');
  });

  it('should include both English and Spanish locales', () => {
    expect(routing.locales).toContain('en');
    expect(routing.locales).toContain('es');
  });

  it('should have exactly 2 locales', () => {
    expect(routing.locales).toHaveLength(2);
  });
});
