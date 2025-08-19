import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import ContactPage from './page';

describe('ContactPage', () => {
  it('renders the contact page with correct content', async () => {
    await act(async () => {
      render(<ContactPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check for main title
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText('Get in touch with the PeakHealth team')
    ).toBeInTheDocument();

    // Check for intro section
    expect(screen.getByText("We'd Love to Hear from You")).toBeInTheDocument();

    // Check for contact sections
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();

    // Check for email link
    expect(screen.getByText('info@peakhealth.es')).toBeInTheDocument();

    // Check for categories
    expect(screen.getByText('General Support')).toBeInTheDocument();
    expect(screen.getByText('Feature Requests')).toBeInTheDocument();
    expect(screen.getByText('Partnerships')).toBeInTheDocument();
  });

  it('has correct email link', async () => {
    await act(async () => {
      render(<ContactPage params={Promise.resolve({ locale: 'en' })} />);
    });

    const emailLink = screen.getByText('info@peakhealth.es');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@peakhealth.es');
  });

  it('displays contact form development note', async () => {
    await act(async () => {
      render(<ContactPage params={Promise.resolve({ locale: 'en' })} />);
    });

    expect(
      screen.getByText(/Our contact form is currently being developed/)
    ).toBeInTheDocument();
  });
});
