import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('should have jest-dom matchers available', () => {
    // This test verifies that jest-dom matchers are working
    const element = document.createElement('div');
    element.className = 'test-class';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-class');

    document.body.removeChild(element);
  });
});
