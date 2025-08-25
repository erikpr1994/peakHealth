import { describe, expect, it } from 'vitest';
import { LOGO_ICON_DATA } from './logo-assets';

describe('Logo assets', () => {
  it('should export LOGO_ICON_DATA', () => {
    expect(LOGO_ICON_DATA).toBeDefined();
    expect(typeof LOGO_ICON_DATA).toBe('string');
    expect(LOGO_ICON_DATA).toMatch(/^data:image\/png;base64,/);
  });

  it('should contain valid base64 data', () => {
    const base64Data = LOGO_ICON_DATA.replace('data:image/png;base64,', '');
    expect(base64Data.length).toBeGreaterThan(0);
    // Check if it's valid base64
    expect(() => globalThis.atob(base64Data)).not.toThrow();
  });
});
