import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Import the component
import RootPage from './page';

describe('RootPage', () => {
  it('should redirect to /en', async () => {
    const { redirect } = await import('next/navigation');

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Verify that redirect was called with '/en'
    expect(redirect).toHaveBeenCalledWith('/en');
  });
});
