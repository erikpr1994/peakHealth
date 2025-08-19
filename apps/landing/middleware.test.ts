import { describe, expect, it, vi } from 'vitest';

// Mock next-intl/middleware
vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => 'mocked-middleware'),
}));

// Mock the routing import
vi.mock('./src/i18n/routing', () => ({
  routing: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
}));

// Mock server-only imports
vi.mock('./src/lib/hypertune/getHypertune', () => ({
  default: vi.fn(() => ({
    roadmap: vi.fn(() => true),
    flushLogs: vi.fn(),
  })),
}));

vi.mock('./src/lib/hypertune/anonymousId', () => ({
  setAnonymousIdIfNeeded: vi.fn(),
}));

describe('Middleware', () => {
  it('should export middleware with correct configuration', async () => {
    const middleware = await import('./middleware');

    // Verify that the middleware is exported
    expect(middleware.default).toBeDefined();

    // Verify that the config is exported
    expect(middleware.config).toBeDefined();
    expect(middleware.config.matcher).toBeDefined();
  });

  it('should have correct matcher configuration', async () => {
    const { config } = await import('./middleware');

    // Verify the matcher includes the root path and locale paths
    expect(config.matcher).toBe('/((?!api|_next|_vercel|.*\\..*).*)');
  });
});
