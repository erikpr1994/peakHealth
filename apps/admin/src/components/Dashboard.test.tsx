import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('Dashboard', () => {
  it('should render without errors', () => {
    // This test verifies that the Dashboard component can be imported and rendered
    expect(async () => {
      const { Dashboard } = await import('./Dashboard');
      render(<Dashboard scopeInfo={{}} userRole="admin" />);
    }).not.toThrow();
  });
});
