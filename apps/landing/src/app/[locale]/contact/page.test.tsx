import { render, screen } from '@testing-library/react';
import ContactPage from './page';

describe('ContactPage', () => {
  it('renders the contact page with correct content', () => {
    render(<ContactPage />);

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

  it('has correct email link', () => {
    render(<ContactPage />);

    const emailLink = screen.getByText('info@peakhealth.es');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@peakhealth.es');
  });

  it('displays contact form development note', () => {
    render(<ContactPage />);

    expect(
      screen.getByText(/Our contact form is currently being developed/)
    ).toBeInTheDocument();
  });
});
