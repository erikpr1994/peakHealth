import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import GlobalError from './global-error';

// Mock Next.js error component
vi.mock('next/error', () => ({
  default: ({ statusCode }: { statusCode: number }): React.JSX.Element => (
    <div data-testid="next-error">Error {statusCode}</div>
  ),
}));

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}));

describe('GlobalError', () => {
  it('renders NextError component with status code 0', () => {
    const mockError = new Error('Test error');
    render(<GlobalError error={mockError} />);

    expect(screen.getByTestId('next-error')).toBeDefined();
    expect(screen.getByText('Error 0')).toBeDefined();
  });

  it('renders with proper HTML structure', () => {
    const mockError = new Error('Test error');
    const { container } = render(<GlobalError error={mockError} />);

    expect(container.querySelector('html')).toBeDefined();
    expect(container.querySelector('body')).toBeDefined();
  });
});
