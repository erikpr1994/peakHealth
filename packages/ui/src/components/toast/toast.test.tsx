import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider, useToast } from './toast';

// Test component to use the toast hook
const TestComponent = (): React.JSX.Element => {
  const { showToast } = useToast();
  return (
    <button
      onClick={() => showToast({ message: 'Test toast', variant: 'success' })}
    >
      Show Toast
    </button>
  );
};

describe('Toast', () => {
  it('renders toast provider', () => {
    render(
      <ToastProvider>
        <div>Test content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows toast when showToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    expect(screen.getByText('Test toast')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    const toast = screen.getByText('Test toast');
    expect(toast.closest('.peakhealth-toast')).toHaveClass(
      'peakhealth-toast--success'
    );
  });

  it('throws error when useToast is used outside provider', () => {
    const TestComponentWithoutProvider = (): React.JSX.Element => {
      const { showToast } = useToast();
      return (
        <button onClick={() => showToast({ message: 'Test' })}>Show</button>
      );
    };

    expect(() => render(<TestComponentWithoutProvider />)).toThrow(
      'useToast must be used within a ToastProvider'
    );
  });
});
