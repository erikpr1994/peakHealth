import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import TermsPage from './page';

describe('TermsPage', () => {
  it('renders the terms page with correct content', async () => {
    await act(async () => {
      render(<TermsPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check for main title
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(/Our terms and conditions for using PeakHealth/)
    ).toBeInTheDocument();

    // Check for coming soon section
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Our terms of service are being finalized/)
    ).toBeInTheDocument();

    // Check for features list
    expect(screen.getByText(/What we're working on:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Clear terms of use, user rights and responsibilities/)
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', async () => {
    await act(async () => {
      render(<TermsPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check that the page has proper semantic structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Terms of Service');

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Coming Soon');
  });
});
