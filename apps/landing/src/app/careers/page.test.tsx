import { render, screen } from '@testing-library/react';
import CareersPage from './page';

describe('CareersPage', () => {
  it('renders the careers page with correct content', () => {
    render(<CareersPage />);

    // Check for main title
    expect(screen.getByText('Join Our Team')).toBeInTheDocument();

    // Check for subtitle
    expect(screen.getByText('Help us build the future of fitness technology')).toBeInTheDocument();

    // Check for current status section
    expect(screen.getByText('Current Status')).toBeInTheDocument();

    // Check for open CV policy
    expect(screen.getByText(/Open CV Policy/)).toBeInTheDocument();

    // Check for how to apply section
    expect(screen.getByText('How to Apply')).toBeInTheDocument();

    // Check for email link
    expect(screen.getByText('info@peakhealth.es')).toBeInTheDocument();
  });

  it('has correct email link', () => {
    render(<CareersPage />);
    
    const emailLink = screen.getByText('info@peakhealth.es');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@peakhealth.es');
  });
});

