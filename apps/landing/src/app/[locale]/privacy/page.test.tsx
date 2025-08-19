import { describe, expect, it } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import React from 'react';

import PrivacyPage from './page';

describe('PrivacyPage', () => {
  it('renders the privacy page with correct content', () => {
    render(<PrivacyPage />);

    // Check for main title
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(/How we protect and handle your data/)
    ).toBeInTheDocument();

    // Check for coming soon section
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Our comprehensive privacy policy is being developed/)
    ).toBeInTheDocument();

    // Check for commitment section
    expect(screen.getByText(/Our commitment:/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We value your privacy and will provide clear information/
      )
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<PrivacyPage />);

    // Check that the page has proper semantic structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Privacy Policy');

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Coming Soon');
  });
});
