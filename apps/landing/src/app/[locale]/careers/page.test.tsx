import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import CareersPage from './page';

describe('CareersPage', () => {
  it('renders the careers page with correct content', async () => {
    await act(async () => {
      render(<CareersPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check for main title
    expect(screen.getByText('Join Our Team')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText('Help us build the future of fitness technology')
    ).toBeInTheDocument();

    // Check for current status section
    expect(screen.getByText('Current Status')).toBeInTheDocument();

    // Check for open CV policy
    expect(screen.getByText(/Open CV Policy/)).toBeInTheDocument();

    // Check for how to apply section
    expect(screen.getByText('How to Apply')).toBeInTheDocument();

    // Check for email link
    expect(screen.getByText('info@peakhealth.es')).toBeInTheDocument();
  });

  it('has correct email link', async () => {
    await act(async () => {
      render(<CareersPage params={Promise.resolve({ locale: 'en' })} />);
    });

    const emailLink = screen.getByText('info@peakhealth.es');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@peakhealth.es');
  });
});
