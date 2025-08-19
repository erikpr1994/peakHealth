import { describe, expect, it } from 'vitest';
import { render, screen } from './test-utils';
import React from 'react';

// Test component that uses translations
const TestComponent = (): React.JSX.Element => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('test-utils', () => {
  it('should render component with NextIntlClientProvider context', () => {
    render(<TestComponent />);

    // Verify the component renders without errors
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('should accept custom locale and messages', () => {
    const customMessages = {
      test: {
        key: 'Custom Message',
      },
    };

    render(<TestComponent />, {
      locale: 'es',
      messages: customMessages,
    });

    // Verify the component renders without errors
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
});
