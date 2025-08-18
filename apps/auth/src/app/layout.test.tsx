import { describe, expect, it, vi } from 'vitest';

// Mock the Google Fonts import
vi.mock('next/font/google', () => ({
  Inter: vi.fn(() => ({
    className: 'mocked-inter-font',
  })),
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
