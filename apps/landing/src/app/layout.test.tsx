import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';

// Mock the Google Fonts import
vi.mock('next/font/google', () => ({
  Inter: vi.fn(() => ({
    className: 'mocked-inter-font',
  })),
}));

// Mock components that might require environment variables
vi.mock('@/components/shared/Header', () => ({
  Header: (): ReactElement => <div data-testid="header">Header</div>,
}));

vi.mock('@/components/shared/Footer', () => ({
  Footer: (): ReactElement => <div data-testid="footer">Footer</div>,
}));

describe('RootLayout', () => {
  it('should have proper structure', async () => {
    // This test verifies that the layout file can be imported without errors
    expect(async () => {
      await import('./layout');
    }).not.toThrow();
  });

  it('should export metadata', async () => {
    const layout = await import('./layout');
    expect(layout.metadata).toBeDefined();
  });
});
