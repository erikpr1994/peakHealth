import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import HelpPage from './page';

describe('HelpPage', () => {
  it('renders the help page with correct content', async () => {
    await act(async () => {
      render(<HelpPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check for main title
    expect(screen.getByText('Help Center')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(/Find answers to your questions and get support/)
    ).toBeInTheDocument();

    // Check for coming soon section
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Our comprehensive help center is being built/)
    ).toBeInTheDocument();

    // Check for features list
    expect(screen.getByText(/What you'll find here:/)).toBeInTheDocument();
    expect(
      screen.getByText(/User guides, tutorials, frequently asked questions/)
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', async () => {
    await act(async () => {
      render(<HelpPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check that the page has proper semantic structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Help Center');

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Coming Soon');
  });
});
