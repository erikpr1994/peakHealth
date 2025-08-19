import { describe, expect, it } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import React from 'react';

import RoadmapPage from './page';

describe('RoadmapPage', () => {
  it('renders the roadmap page with correct content', () => {
    render(<RoadmapPage />);

    // Check for main title
    expect(screen.getByText('Product Roadmap')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(/See what we're building and vote on upcoming features/)
    ).toBeInTheDocument();

    // Check for coming soon section
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Our interactive roadmap is under development/)
    ).toBeInTheDocument();

    // Check for features list
    expect(screen.getByText(/What to expect:/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Feature voting, development timeline, progress tracking/
      )
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<RoadmapPage />);

    // Check that the page has proper semantic structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Product Roadmap');

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Coming Soon');
  });
});
