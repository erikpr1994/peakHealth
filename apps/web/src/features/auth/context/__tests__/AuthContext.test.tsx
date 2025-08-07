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

// Mock fetch globally
global.fetch = vi.fn();

// Mock Supabase client with proper auth methods
const mockSupabaseAuth = {
  onAuthStateChange: vi.fn(() => ({
    data: { subscription: { unsubscribe: vi.fn() } },
  })),
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
};

const mockSupabaseClient = {
  auth: mockSupabaseAuth,
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

vi.mock('swr');

const mockUseSWR = useSWR as Mock;

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

    // Reset Supabase auth mocks
    mockSupabaseAuth.signInWithPassword.mockResolvedValue({ error: null });
    mockSupabaseAuth.signUp.mockResolvedValue({ error: null });
    mockSupabaseAuth.signOut.mockResolvedValue({ error: null });

    // Reset fetch mock
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ user: null }),
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
        app_metadata: {
          user_types: ['regular'],
          primary_user_type: 'regular',
          subscription_tier: 'free',
          groups: ['early_access'],
          permissions: {},
          features: [],
          data_access_rules: {},
        },
        user_metadata: {},
        aud: '',
        created_at: '',
      } as ExtendedUser);

      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });
  });

  describe('Auth operations', () => {
    it('calls login API route on login', async () => {
      renderWithAuthProvider();

      fireEvent.click(screen.getByText('Login'));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password',
          }),
        });
      });
    });

    it('calls signup API route on signup', async () => {
      renderWithAuthProvider();

      fireEvent.click(screen.getByText('Sign Up'));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password',
            user_metadata: {
              name: 'Test User',
            },
          }),
        });
      });
    });

    it('calls Supabase signOut on logout', async () => {
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
        expect(mockSupabaseAuth.signOut).toHaveBeenCalled();
      });
    });

    it('handles login failure', async () => {
      // Mock fetch to return an error response
      global.fetch = vi.fn().mockResolvedValue({
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

  describe('New JWT claims properties', () => {
    it('provides new JWT claims properties', () => {
      const user = {
        id: '123',
        email: 'test@example.com',
        app_metadata: {
          user_types: ['regular', 'trainer'],
          primary_user_type: 'regular',
          subscription_tier: 'premium',
          groups: ['early_access', 'beta_testers'],
          permissions: { view_exercises: true, manage_clients: true },
          features: ['advanced_analytics', 'client_management'],
          data_access_rules: {
            own_profile: 'full',
            client_profiles: 'training_only',
          },
        },
        user_metadata: {},
        aud: '',
        created_at: '',
      } as ExtendedUser;

      // Mock SWR to return our test user BEFORE rendering
      mockUseSWR.mockReturnValue({
        data: user,
        mutate: mutateUser,
      });

      let auth: AuthContextType | undefined;
      const TestComponentWithAuth = () => {
        auth = useAuth();
        return <TestComponent />;
      };

      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      expect(auth!.userTypes).toEqual(['regular', 'trainer']);
      expect(auth!.primaryUserType).toBe('regular');
      expect(auth!.subscriptionTier).toBe('premium');
      expect(auth!.permissions).toEqual({
        view_exercises: true,
        manage_clients: true,
      });
      expect(auth!.features).toEqual([
        'advanced_analytics',
        'client_management',
      ]);
      expect(auth!.dataAccessRules).toEqual({
        own_profile: 'full',
        client_profiles: 'training_only',
      });
    });

    it('provides utility functions for new claims', () => {
      const user = {
        id: '123',
        email: 'test@example.com',
        app_metadata: {
          user_types: ['regular', 'trainer'],
          primary_user_type: 'regular',
          subscription_tier: 'premium',
          groups: ['early_access'],
          permissions: { view_exercises: true, manage_clients: true },
          features: ['advanced_analytics'],
          data_access_rules: { own_profile: 'full' },
        },
        user_metadata: {},
        aud: '',
        created_at: '',
      } as ExtendedUser;

      // Mock SWR to return our test user BEFORE rendering
      mockUseSWR.mockReturnValue({
        data: user,
        mutate: mutateUser,
      });

      let auth: AuthContextType | undefined;
      const TestComponentWithAuth = () => {
        auth = useAuth();
        return <TestComponent />;
      };

      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      expect(auth!.hasPermission('view_exercises')).toBe(true);
      expect(auth!.hasPermission('invalid_permission')).toBe(false);
      expect(auth!.hasFeature('advanced_analytics')).toBe(true);
      expect(auth!.hasFeature('invalid_feature')).toBe(false);
      expect(auth!.hasUserType('trainer')).toBe(true);
      expect(auth!.hasUserType('doctor')).toBe(false);
      expect(auth!.hasSubscriptionTier('premium')).toBe(true);
      expect(auth!.hasSubscriptionTier('free')).toBe(false);
      expect(auth!.canAccessData('own_profile', 'full')).toBe(true);
      expect(auth!.canAccessData('own_profile', 'read_only')).toBe(true);
      expect(auth!.canAccessData('client_profiles', 'full')).toBe(false);
    });
  });
});
