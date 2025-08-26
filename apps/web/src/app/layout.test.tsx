import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RootLayout from '../layout';

// Mock the Providers component
vi.mock('@/components/providers/Providers', () => ({
  Providers: ({
    children,
  }: {
    children: React.ReactNode;
  }): React.ReactElement => <div data-testid="providers-mock">{children}</div>,
}));

describe('RootLayout', () => {
  it('should render layout with providers and children', () => {
    render(
      <RootLayout>
        <div data-testid="test-content">Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('providers-mock')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have proper HTML structure', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const html = document.querySelector('html');
    const body = document.querySelector('body');

    expect(html).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
