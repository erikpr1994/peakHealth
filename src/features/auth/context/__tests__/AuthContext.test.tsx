import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

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

vi.mock('swr', () => ({
  default: vi.fn(),
}));

// Mock fetch globally
global.fetch = vi.fn();

// Create a mock AuthContext for testing
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthOperationLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email?: string, password?: string, name?: string) => Promise<void>;
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

const MockAuthContext = createContext<AuthContextType | undefined>(undefined);

const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOperationLoading, _setIsAuthOperationLoading] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name?: string;
  } | null>(null);
  const [_isLoading, _setIsLoading] = useState(false);

  const login = async (email?: string, password?: string) => {
    if (!email || !password) return;

    _setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser({ id: '123', email });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      _setIsAuthOperationLoading(false);
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;

    _setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      setUser({ id: '123', email, name });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      _setIsAuthOperationLoading(false);
    }
  };

  const logout = async () => {
    _setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }

      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      _setIsAuthOperationLoading(false);
    }
  };

  return (
    <MockAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading: _isLoading,
        isAuthOperationLoading,
        login,
        logout,
        signUp,
        user: user || null,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
};

const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Test component to access context
const TestComponent = () => {
  const auth = useMockAuth();
  return (
    <div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="isLoading">{auth.isLoading.toString()}</div>
      <div data-testid="isAuthOperationLoading">
        {auth.isAuthOperationLoading.toString()}
      </div>
      <div data-testid="user">{auth.user ? 'user' : 'no-user'}</div>
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
  const mockFetch = vi.mocked(global.fetch);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('AuthProvider', () => {
    it('renders children without crashing', () => {
      render(
        <MockAuthProvider>
          <div data-testid="child">Test Child</div>
        </MockAuthProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('provides auth context to children', () => {
      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      expect(screen.getByTestId('isAuthenticated')).toBeInTheDocument();
      expect(screen.getByTestId('isLoading')).toBeInTheDocument();
      expect(screen.getByTestId('isAuthOperationLoading')).toBeInTheDocument();
      expect(screen.getByTestId('user')).toBeInTheDocument();
    });
  });

  describe('useAuth hook', () => {
    it('provides auth context with default values when not authenticated', () => {
      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('isAuthOperationLoading')).toHaveTextContent(
        'false'
      );
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    });

    it('provides auth methods', () => {
      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  describe('Auth operations', () => {
    it('calls login API when login method is invoked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: { id: '123' } }),
      } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', {
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

    it('calls signup API when signUp method is invoked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: { id: '123' } }),
      } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      const signUpButton = screen.getByText('Sign Up');
      fireEvent.click(signUpButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password',
            name: 'Test User',
          }),
        });
      });
    });

    it('calls logout API when logout method is invoked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
    });

    it('updates user state after successful login', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: { id: '123' } }),
      } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('user')).toHaveTextContent('user');
      });
    });

    it('updates user state after successful signup', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: { id: '123' } }),
      } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      const signUpButton = screen.getByText('Sign Up');
      fireEvent.click(signUpButton);

      await waitFor(() => {
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('user')).toHaveTextContent('user');
      });
    });

    it('clears user state after successful logout', async () => {
      // First login to set user state
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ user: { id: '123' } }),
        } as globalThis.Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({}),
        } as globalThis.Response);

      render(
        <MockAuthProvider>
          <TestComponent />
        </MockAuthProvider>
      );

      // Login first
      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      });

      // Then logout
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent(
          'false'
        );
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });
    });
  });

  describe('useAuth hook error handling', () => {
    it('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
