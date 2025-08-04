import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import React from 'react';
import useSWR from 'swr';
import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';

import { AuthProvider, useAuth } from '../AuthContext';
import { AuthContextType, ExtendedUser } from '../AuthContext';

// Mock external dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  }),
}));

vi.mock('swr');

const mockUseSWR = useSWR as Mock;

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Test component to access context
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="isAuthOperationLoading">
        {auth.isAuthOperationLoading.toString()}
      </div>
      <div data-testid="user">{auth.user ? auth.user.email : 'no-user'}</div>
      <button onClick={() => auth.login('test@example.com', 'password')}>
        Login
      </button>
      <button
        onClick={() => auth.signUp('test@example.com', 'password', 'Test User')}
      >
        Sign Up
      </button>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  let mutateUser: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mutateUser = vi.fn();
    mockUseSWR.mockReturnValue({
      data: null,
      mutate: mutateUser,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderWithAuthProvider = (user: ExtendedUser | null = null) => {
    mockUseSWR.mockReturnValue({
      data: user,
      mutate: mutateUser,
    });

    return render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  };

  describe('AuthProvider', () => {
    it('renders children and provides context', () => {
      renderWithAuthProvider();
      expect(screen.getByTestId('isAuthenticated')).toBeInTheDocument();
    });

    it('shows authenticated state correctly', () => {
      renderWithAuthProvider({
        id: '123',
        email: 'test@example.com',
        created_at: '',
        app_metadata: {},
        user_metadata: {},
        aud: '',
      });
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });
  });

  describe('Auth operations', () => {
    it('optimistically updates user on successful login', async () => {
      const user = { id: '123', email: 'test@example.com' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user }),
      });

      renderWithAuthProvider();

      fireEvent.click(screen.getByText('Login'));

      await waitFor(() => {
        expect(mutateUser).toHaveBeenCalledWith(user, false);
      });
    });

    it('optimistically updates user on successful signup', async () => {
      const user = { id: '123', email: 'test@example.com', name: 'Test User' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user }),
      });

      renderWithAuthProvider();

      fireEvent.click(screen.getByText('Sign Up'));

      await waitFor(() => {
        expect(mutateUser).toHaveBeenCalledWith(user, false);
      });
    });

    it('clears user on successful logout', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      renderWithAuthProvider({
        id: '123',
        email: 'test@example.com',
        created_at: '',
        app_metadata: {},
        user_metadata: {},
        aud: '',
      });

      fireEvent.click(screen.getByText('Logout'));

      await waitFor(() => {
        expect(mutateUser).toHaveBeenCalledWith(null, false);
      });
    });

    it('handles login failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      });

      let auth: AuthContextType;
      const TestComponentWithAuth = () => {
        auth = useAuth();
        return <TestComponent />;
      };

      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      await act(async () => {
        await expect(auth.login('test@test.com', 'password')).rejects.toThrow(
          'Invalid credentials'
        );
      });
    });
  });

  describe('useAuth hook error handling', () => {
    it('throws error when used outside AuthProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        /* do nothing */
      });

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
