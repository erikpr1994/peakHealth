import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders with default variant', () => {
    render(<Alert>Alert content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('peakhealth-alert');
    expect(alert).toHaveClass('peakhealth-alert--default');
    expect(alert).toHaveTextContent('Alert content');
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Alert content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('peakhealth-alert--destructive');
  });

  it('applies additional className', () => {
    render(<Alert className="custom-class">Alert content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('passes additional props', () => {
    render(<Alert data-testid="test-alert">Alert content</Alert>);
    expect(screen.getByTestId('test-alert')).toBeInTheDocument();
  });
});

describe('AlertTitle', () => {
  it('renders correctly', () => {
    render(<AlertTitle>Alert Title</AlertTitle>);
    const title = screen.getByText('Alert Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('peakhealth-alert__title');
  });

  it('applies additional className', () => {
    render(<AlertTitle className="custom-class">Alert Title</AlertTitle>);
    const title = screen.getByText('Alert Title');
    expect(title).toHaveClass('custom-class');
  });
});

describe('AlertDescription', () => {
  it('renders correctly', () => {
    render(<AlertDescription>Alert Description</AlertDescription>);
    const description = screen.getByText('Alert Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('peakhealth-alert__description');
  });

  it('applies additional className', () => {
    render(
      <AlertDescription className="custom-class">
        Alert Description
      </AlertDescription>
    );
    const description = screen.getByText('Alert Description');
    expect(description).toHaveClass('custom-class');
  });
});

describe('Alert composition', () => {
  it('renders a complete alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Description')).toBeInTheDocument();
  });
});
