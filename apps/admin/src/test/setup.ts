import { vi, beforeEach, afterEach } from 'vitest';
import React from 'react'; // Needed for React.createElement

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: (): Record<string, unknown> => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: (): URLSearchParams => new URLSearchParams(),
  usePathname: (): string => '/',
}));

// Mock Next.js image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>): React.ReactElement =>
    React.createElement('img', props),
}));

// Global test setup
beforeEach((): void => {
  vi.clearAllMocks();
});

afterEach((): void => {
  vi.resetAllMocks();
});
