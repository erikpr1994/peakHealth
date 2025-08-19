import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import FeedbackPage from './page';

describe('FeedbackPage', () => {
  it('renders the feedback page with correct content', async () => {
    await act(async () => {
      render(<FeedbackPage params={Promise.resolve({ locale: 'en' })} />);
    });

    // Check for main title
    expect(screen.getByText('Feedback & Suggestions')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText('Help shape the future of PeakHealth with your ideas')
    ).toBeInTheDocument();

    // Check for intro section
    expect(screen.getByText('We Value Your Input')).toBeInTheDocument();

    // Check for main sections
    expect(screen.getByText('Current Status')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();

    // Check for email link
    expect(screen.getByText('info@peakhealth.es')).toBeInTheDocument();

    // Check for categories
    expect(screen.getByText('Feature Requests')).toBeInTheDocument();
    expect(screen.getByText('Bug Reports')).toBeInTheDocument();
    expect(screen.getByText('Vote & Discuss')).toBeInTheDocument();
  });

  it('has correct email link', async () => {
    await act(async () => {
      render(<FeedbackPage params={Promise.resolve({ locale: 'en' })} />);
    });

    const emailLink = screen.getByText('info@peakhealth.es');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@peakhealth.es');
  });

  it('displays coming soon message', async () => {
    await act(async () => {
      render(<FeedbackPage params={Promise.resolve({ locale: 'en' })} />);
    });

    expect(
      screen.getByText(/Our feedback system is being built/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Coming Soon/)).toBeInTheDocument();
  });
});
