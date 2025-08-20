# PeakHealth API Layer Standards

This document outlines the standard patterns for implementing the API layer in the PeakHealth codebase. Following these standards ensures consistency, maintainability, and reliability when interacting with backend services.

## API Layer Principles

1. **Abstraction**: Abstract API calls behind a clean interface
2. **Type Safety**: Use TypeScript for type-safe API interactions
3. **Error Handling**: Implement consistent error handling
4. **Caching**: Use appropriate caching strategies
5. **Testing**: Make API calls testable

## API Layer Architecture

### Directory Structure

The API layer should be organized in a consistent directory structure:

```
src/
├── api/
│   ├── client.ts          # API client configuration
│   ├── types.ts           # Shared API types
│   ├── auth.ts            # Authentication API
│   ├── user.ts            # User API
│   ├── exercise.ts        # Exercise API
│   └── index.ts           # Re-export API modules
```

For feature-specific API modules:

```
src/features/
├── exercise/
│   ├── api/
│   │   ├── types.ts       # Exercise API types
│   │   ├── exercises.ts   # Exercise API functions
│   │   ├── workouts.ts    # Workout API functions
│   │   └── index.ts       # Re-export API functions
```

### API Client

Create a base API client for handling common concerns:

```tsx
// api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API client configuration
interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API error type
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  data?: any;
}

// Create API client
export const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Get token from storage
      const token = localStorage.getItem('token');
      
      // Add authorization header if token exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      const apiError: ApiError = {
        message: error.message || 'An unknown error occurred',
        status: error.response?.status,
        data: error.response?.data,
      };
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(apiError);
    }
  );

  return client;
};

// Create default API client
export const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.peakhealth.com',
});

// Helper functions for API requests
export const get = async <T>(url: string, params?: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url);
  return response.data;
};

export default {
  get,
  post,
  put,
  delete: del,
};
```

### API Types

Define shared API types:

```tsx
// api/types.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface RequestParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  filter?: Record<string, any>;
}
```

### API Modules

Create API modules for specific domains:

```tsx
// api/user.ts
import { get, post, put, del } from './client';
import type { ApiResponse, PaginatedResponse, RequestParams } from './types';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}

// User API functions
export const getUsers = async (params?: RequestParams): Promise<PaginatedResponse<User>> => {
  return get<PaginatedResponse<User>>('/users', params);
};

export const getUser = async (id: string): Promise<User> => {
  return get<User>(`/users/${id}`);
};

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  return post<User>('/users', data);
};

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<User> => {
  return put<User>(`/users/${id}`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  return del<void>(`/users/${id}`);
};
```

## API Hooks

Create custom hooks for API calls:

```tsx
// hooks/useApi.ts
import { useState, useCallback } from 'react';
import type { ApiError } from '@/api/client';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

interface UseApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseApiResult<T, P extends any[]> extends UseApiState<T> {
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
}

export const useApi = <T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>,
  options?: UseApiOptions<T>
): UseApiResult<T, P> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(
    async (...params: P): Promise<T | null> => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const data = await apiFunction(...params);
        
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
        
        options?.onSuccess?.(data);
        
        return data;
      } catch (error) {
        const apiError = error as ApiError;
        
        setState({
          data: null,
          error: apiError,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
        
        options?.onError?.(apiError);
        
        return null;
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
```

### Query Hooks

Create custom hooks for specific API calls:

```tsx
// hooks/useUser.ts
import { useApi } from './useApi';
import { getUser, updateUser, deleteUser } from '@/api/user';
import type { User, UpdateUserRequest } from '@/api/user';

export const useGetUser = () => {
  return useApi(getUser);
};

export const useUpdateUser = () => {
  return useApi(updateUser);
};

export const useDeleteUser = () => {
  return useApi(deleteUser);
};

// Usage
const UserProfile = ({ userId }) => {
  const {
    data: user,
    error,
    isLoading,
    execute: fetchUser,
  } = useGetUser();
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

## React Query Integration

Use React Query for more advanced data fetching:

```tsx
// api/react-query.ts
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// App.tsx
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@/api/react-query';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>App content</div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
```

### React Query Hooks

Create custom hooks with React Query:

```tsx
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '@/api/user';
import type { User, CreateUserRequest, UpdateUserRequest, RequestParams } from '@/api/user';

export const useUsers = (params?: RequestParams) => {
  return useQuery(['users', params], () => getUsers(params));
};

export const useUser = (id: string) => {
  return useQuery(['user', id], () => getUser(id), {
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }: { id: string; data: UpdateUserRequest }) => updateUser(id, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries(['user', data.id]);
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

// Usage
const UsersList = () => {
  const { data, isLoading, error } = useUsers({ page: 1, pageSize: 10 });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.items.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Error Handling

Implement consistent error handling:

```tsx
// api/error-handling.ts
import type { ApiError } from './client';

// Error handler type
export type ErrorHandler = (error: ApiError) => void;

// Global error handler
let globalErrorHandler: ErrorHandler | null = null;

// Set global error handler
export const setGlobalErrorHandler = (handler: ErrorHandler) => {
  globalErrorHandler = handler;
};

// Handle API error
export const handleApiError = (error: ApiError) => {
  // Log error
  console.error('API Error:', error);
  
  // Call global error handler if exists
  if (globalErrorHandler) {
    globalErrorHandler(error);
  }
  
  // Return error for further handling
  return error;
};

// Error boundary component
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log error
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please try again or contact support if the problem persists.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## API Mocking

Implement API mocking for testing and development:

```tsx
// api/mock.ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
];

// Mock handlers
export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1;
    const pageSize = Number(req.url.searchParams.get('pageSize')) || 10;
    
    return res(
      ctx.status(200),
      ctx.json({
        items: users,
        total: users.length,
        page,
        pageSize,
        totalPages: Math.ceil(users.length / pageSize),
      })
    );
  }),
  
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    
    if (!user) {
      return res(
        ctx.status(404),
        ctx.json({
          message: `User with id ${id} not found`,
          code: 'USER_NOT_FOUND',
        })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(user)
    );
  }),
  
  rest.post('/api/users', (req, res, ctx) => {
    const { name, email, password } = req.body as any;
    
    if (!name || !email || !password) {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Name, email, and password are required',
          code: 'INVALID_REQUEST',
        })
      );
    }
    
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    
    return res(
      ctx.status(201),
      ctx.json(newUser)
    );
  }),
];

// Setup MSW server
export const server = setupServer(...handlers);
```

### Using MSW in Tests

```tsx
// setupTests.ts
import { server } from './api/mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// user.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/api/react-query';
import { useUser } from '@/hooks/useUsers';

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useUser', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  
  it('fetches user data', async () => {
    const { result } = renderHook(() => useUser('1'), { wrapper });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    });
  });
  
  it('handles error when user not found', async () => {
    const { result } = renderHook(() => useUser('999'), { wrapper });
    
    await waitFor(() => expect(result.current.isError).toBe(true));
    
    expect(result.current.error).toEqual({
      message: 'User with id 999 not found',
      code: 'USER_NOT_FOUND',
    });
  });
});
```

## API Documentation

Document API functions with JSDoc comments:

```tsx
/**
 * Fetches a list of users with pagination.
 * 
 * @param {RequestParams} params - Request parameters for pagination, sorting, and filtering
 * @returns {Promise<PaginatedResponse<User>>} Paginated list of users
 * 
 * @example
 * ```tsx
 * const users = await getUsers({ page: 1, pageSize: 10 });
 * ```
 */
export const getUsers = async (params?: RequestParams): Promise<PaginatedResponse<User>> => {
  return get<PaginatedResponse<User>>('/users', params);
};

/**
 * Fetches a single user by ID.
 * 
 * @param {string} id - User ID
 * @returns {Promise<User>} User data
 * 
 * @throws {ApiError} When user is not found or request fails
 * 
 * @example
 * ```tsx
 * const user = await getUser('123');
 * ```
 */
export const getUser = async (id: string): Promise<User> => {
  return get<User>(`/users/${id}`);
};
```

## Best Practices

### Do's

- Use TypeScript for type-safe API interactions
- Create a consistent API client
- Implement proper error handling
- Use React Query for data fetching
- Document API functions with JSDoc
- Write tests for API functions
- Use environment variables for API URLs
- Implement API mocking for testing

### Don'ts

- Don't make API calls directly in components
- Don't use `any` types for API responses
- Don't handle errors inconsistently
- Don't hardcode API URLs
- Don't expose sensitive information in API calls
- Don't use different libraries for API calls in the same project

