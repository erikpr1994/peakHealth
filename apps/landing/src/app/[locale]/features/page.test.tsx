import { describe, expect, it } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import React from 'react';

import FeaturesPage from './page';

describe('FeaturesPage', () => {
  it('renders the features page with correct content', () => {
    render(<FeaturesPage />);

    // Check for main title
    expect(screen.getByText('Features')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(
        /Discover what makes PeakHealth the ultimate workout tracking platform/
      )
    ).toBeInTheDocument();

    // Check for coming soon section
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/We're working hard to bring you detailed information/)
    ).toBeInTheDocument();

    // Check for core features
    expect(screen.getByText(/Core Features:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Workout logging, progress tracking, personal records/)
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<FeaturesPage />);

    // Check that the page has proper semantic structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Features');

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Coming Soon');
  });
});
