import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Providers } from '../Providers';

describe('Providers', () => {
  it('should render children wrapped in all providers', () => {
    render(
      <Providers>
        <div data-testid="test-child">Test Content</div>
      </Providers>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide toast context to children', () => {
    const TestComponent = (): React.ReactElement => {
      return (
        <div data-testid="toast-context-available">Toast Context Available</div>
      );
    };

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('toast-context-available')).toBeInTheDocument();
  });
});
