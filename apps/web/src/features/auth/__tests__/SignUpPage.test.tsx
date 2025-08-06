import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import SignUpPage from '../SignUpPage';

// Mock the auth context
const mockSignUp = vi.fn();
const mockIsAuthOperationLoading = false;

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
    isAuthOperationLoading: mockIsAuthOperationLoading,
  }),
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form', () => {
    render(<SignUpPage />);

    expect(screen.getByText('Peak Health')).toBeInTheDocument();
    expect(
      screen.getByText('Create your Peak Health account')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce(undefined);

    render(<SignUpPage />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'Password123');
    await user.type(
      screen.getByTestId('confirm-password-input'),
      'Password123'
    );

    const submitButton = screen.getByTestId('signup-button');
    await user.click(submitButton);

    expect(mockSignUp).toHaveBeenCalledWith(
      'john@example.com',
      'Password123',
      'John Doe'
    );
  });

  it('validates password requirements', async () => {
    const user = userEvent.setup();

    render(<SignUpPage />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'short');
    await user.type(screen.getByTestId('confirm-password-input'), 'short');

    const submitButton = screen.getByTestId('signup-button');
    await user.click(submitButton);

    expect(screen.getByTestId('password-error')).toHaveTextContent(
      'Password must be at least 8 characters long'
    );
  });

  it('validates password complexity', async () => {
    const user = userEvent.setup();

    render(<SignUpPage />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.click(submitButton);

    expect(
      screen.getByText(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      )
    ).toBeInTheDocument();
  });

  it('validates password confirmation match', async () => {
    const user = userEvent.setup();

    render(<SignUpPage />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'Password123');
    await user.type(
      screen.getByTestId('confirm-password-input'),
      'DifferentPassword123'
    );

    const submitButton = screen.getByTestId('signup-button');
    await user.click(submitButton);

    expect(screen.getByTestId('confirm-password-error')).toHaveTextContent(
      'Passwords do not match'
    );
  });

  it('handles signup errors', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email already exists';
    mockSignUp.mockRejectedValueOnce(new Error(errorMessage));

    render(<SignUpPage />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'existing@example.com');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles unexpected errors', async () => {
    const user = userEvent.setup();
    mockSignUp.mockRejectedValueOnce('Unexpected error');

    render(<SignUpPage />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('An unexpected error occurred.')
      ).toBeInTheDocument();
    });
  });

  it('clears error message on new submission', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email already exists';
    mockSignUp
      .mockRejectedValueOnce(new Error(errorMessage))
      .mockResolvedValueOnce(undefined);

    render(<SignUpPage />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    // First submission - should show error
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'existing@example.com');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Clear form and submit again - error should be cleared
    await user.clear(nameInput);
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.clear(confirmPasswordInput);
    await user.type(nameInput, 'Jane Doe');
    await user.type(emailInput, 'jane@example.com');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });

  it('navigates to login page', () => {
    render(<SignUpPage />);

    const loginLink = screen.getByRole('link', {
      name: /already have an account/i,
    });
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('calls signUp with correct parameters including name', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce(undefined);

    render(<SignUpPage />);

    const testName = 'John Doe';
    const testEmail = 'john@example.com';
    const testPassword = 'Password123';

    await user.type(screen.getByTestId('name-input'), testName);
    await user.type(screen.getByTestId('email-input'), testEmail);
    await user.type(screen.getByTestId('password-input'), testPassword);
    await user.type(screen.getByTestId('confirm-password-input'), testPassword);

    const submitButton = screen.getByTestId('signup-button');
    await user.click(submitButton);

    expect(mockSignUp).toHaveBeenCalledWith(testEmail, testPassword, testName);
  });
});
