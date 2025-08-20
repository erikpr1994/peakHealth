# PeakHealth Testing Standards

This document outlines the standard patterns for testing in the PeakHealth codebase. Following these standards ensures code reliability, maintainability, and quality.

## Testing Principles

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Isolation**: Tests should be independent and isolated from each other
3. **Readability**: Tests should be easy to read and understand
4. **Maintainability**: Tests should be easy to maintain
5. **Coverage**: Aim for high test coverage, but prioritize critical paths

## Testing Types

### Unit Tests

Unit tests verify that individual units of code work as expected:

- Functions
- Components
- Hooks
- Utilities

### Integration Tests

Integration tests verify that multiple units work together:

- Component interactions
- API integrations
- State management

### End-to-End Tests

End-to-end tests verify that the entire application works as expected:

- User flows
- Critical paths
- Edge cases

## Testing Tools

### Vitest

Use Vitest for unit and integration tests:

```tsx
// sum.test.ts
import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
  
  it('handles zero', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
```

### React Testing Library

Use React Testing Library for component tests:

```tsx
// Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Cypress

Use Cypress for end-to-end tests:

```tsx
// cypress/e2e/login.cy.ts
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  
  it('logs in successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, User').should('be.visible');
  });
  
  it('shows error message with invalid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid email or password').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

### Mock Service Worker (MSW)

Use MSW for API mocking:

```tsx
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ])
    );
  }),
  
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    
    if (id === '1') {
      return res(
        ctx.status(200),
        ctx.json({ id: '1', name: 'John Doe' })
      );
    }
    
    return res(
      ctx.status(404),
      ctx.json({ message: 'User not found' })
    );
  }),
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// setupTests.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Test Organization

### File Structure

Organize tests alongside the code they test:

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
```

For complex components:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAuth.test.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── auth.test.ts
│   │   │   └── index.ts
```

### Test Naming

Use descriptive test names:

```tsx
// Good
it('calls onClick when clicked', () => {
  // Test implementation
});

// Bad
it('test click', () => {
  // Test implementation
});
```

Use the AAA pattern (Arrange, Act, Assert):

```tsx
it('calls onClick when clicked', () => {
  // Arrange
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  // Act
  fireEvent.click(screen.getByText('Click me'));
  
  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Component Testing

### Rendering Components

Render components with React Testing Library:

```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

it('renders correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Testing User Interactions

Test user interactions with fireEvent or userEvent:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from './Button';

it('calls onClick when clicked (fireEvent)', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('calls onClick when clicked (userEvent)', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  await userEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Component Props

Test component props:

```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

it('applies variant class', () => {
  render(<Button variant="primary">Click me</Button>);
  expect(screen.getByText('Click me')).toHaveClass('button--primary');
});

it('applies size class', () => {
  render(<Button size="large">Click me</Button>);
  expect(screen.getByText('Click me')).toHaveClass('button--large');
});

it('applies custom class', () => {
  render(<Button className="custom-class">Click me</Button>);
  expect(screen.getByText('Click me')).toHaveClass('custom-class');
});
```

### Testing Component State

Test component state:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

it('increments count when increment button is clicked', () => {
  render(<Counter initialCount={0} />);
  
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Increment'));
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

it('decrements count when decrement button is clicked', () => {
  render(<Counter initialCount={1} />);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Decrement'));
  
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});
```

### Testing Async Components

Test async components:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

it('loads and displays user data', async () => {
  render(<UserProfile userId="1" />);
  
  // Initial loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  // Check that user data is displayed
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```

## Hook Testing

### Testing Custom Hooks

Test custom hooks with @testing-library/react-hooks:

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(1));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(0);
  });
  
  it('resets count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(0);
  });
});
```

### Testing Context Hooks

Test context hooks:

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  it('initializes with unauthenticated state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
  
  it('logs in user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'user@example.com',
    });
  });
  
  it('logs out user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
```

## API Testing

### Testing API Functions

Test API functions:

```tsx
import { vi } from 'vitest';
import { getUser, getUsers, createUser } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('fetches users', async () => {
    const users = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => users,
    });
    
    const result = await getUsers();
    
    expect(global.fetch).toHaveBeenCalledWith('/api/users');
    expect(result).toEqual(users);
  });
  
  it('fetches user by ID', async () => {
    const user = { id: '1', name: 'John Doe' };
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });
    
    const result = await getUser('1');
    
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
    expect(result).toEqual(user);
  });
  
  it('creates user', async () => {
    const user = { id: '3', name: 'Bob Johnson' };
    const userData = { name: 'Bob Johnson' };
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });
    
    const result = await createUser(userData);
    
    expect(global.fetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    expect(result).toEqual(user);
  });
  
  it('handles API errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ message: 'User not found' }),
    });
    
    await expect(getUser('999')).rejects.toThrow('User not found');
  });
});
```

### Testing with MSW

Test API calls with MSW:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from './mocks/server';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    render(<UserProfile userId="1" />);
    
    // Initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check that user data is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  it('handles error when user not found', async () => {
    // Override the default handler for this test
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ message: 'User not found' })
        );
      })
    );
    
    render(<UserProfile userId="999" />);
    
    // Initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check that error message is displayed
    expect(screen.getByText('Error: User not found')).toBeInTheDocument();
  });
});
```

## Mocking

### Mocking Functions

Mock functions with vi.fn():

```tsx
import { vi } from 'vitest';

const mockFn = vi.fn();
mockFn(); // Call the mock function

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
```

### Mocking Modules

Mock modules with vi.mock():

```tsx
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import { getUser } from './api';

// Mock the api module
vi.mock('./api', () => ({
  getUser: vi.fn(),
}));

describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    // Mock the getUser function
    getUser.mockResolvedValueOnce({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
    
    render(<UserProfile userId="1" />);
    
    // Initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check that user data is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Check that getUser was called with the correct ID
    expect(getUser).toHaveBeenCalledWith('1');
  });
});
```

### Mocking Hooks

Mock hooks:

```tsx
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { useAuth } from './auth';

// Mock the auth hook
vi.mock('./auth', () => ({
  useAuth: vi.fn(),
}));

describe('Dashboard', () => {
  it('displays user information when authenticated', () => {
    // Mock the useAuth hook
    useAuth.mockReturnValueOnce({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    
    render(<Dashboard />);
    
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
  });
  
  it('redirects to login when not authenticated', () => {
    // Mock the useAuth hook
    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
    });
    
    render(<Dashboard />);
    
    expect(screen.getByText('Please log in to view the dashboard')).toBeInTheDocument();
  });
});
```

## Test Coverage

### Coverage Reports

Generate coverage reports:

```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/index.html
```

### Coverage Thresholds

Set coverage thresholds:

```js
// vitest.config.js
export default {
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
};
```

### Coverage Exclusions

Exclude files from coverage:

```js
// vitest.config.js
export default {
  test: {
    coverage: {
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/mocks/**',
        'src/types/**',
      ],
    },
  },
};
```

## Continuous Integration

### GitHub Actions

Set up GitHub Actions for testing:

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### Pre-Commit Hooks

Set up pre-commit hooks for testing:

```bash
# Install husky
npm install --save-dev husky

# Set up pre-commit hook
npx husky add .husky/pre-commit "npm test"
```

## Best Practices

### Do's

- Write tests for critical paths
- Test behavior, not implementation
- Use descriptive test names
- Keep tests simple and focused
- Mock external dependencies
- Use test-driven development (TDD) when appropriate
- Run tests in CI/CD pipelines

### Don'ts

- Don't test implementation details
- Don't write brittle tests
- Don't use snapshot tests excessively
- Don't test third-party libraries
- Don't test configuration files
- Don't write tests that depend on other tests

## Examples

### Testing a Form Component

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });
  
  it('validates email and password', async () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    // Submit form without filling in fields
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
    // Check for validation errors
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    
    // Fill in email field with invalid email
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    });
    
    // Check for email validation error
    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
    
    // Fill in email field with valid email
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    
    // Fill in password field with short password
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' },
    });
    
    // Check for password validation error
    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
  });
  
  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
    // Check that onSubmit was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
  
  it('shows loading state during submission', async () => {
    const handleSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
    // Check that button is in loading state
    expect(screen.getByRole('button', { name: 'Logging In...' })).toBeDisabled();
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Log In' })).not.toBeDisabled();
    });
  });
});
```

### Testing an API Hook

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { server } from './mocks/server';
import { useUsers } from './useUsers';

describe('useUsers', () => {
  it('fetches users successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUsers());
    
    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
    
    // Wait for data to load
    await waitForNextUpdate();
    
    // Check that data was loaded
    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ]);
    expect(result.current.error).toBeNull();
  });
  
  it('handles error when API fails', async () => {
    // Override the default handler for this test
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' })
        );
      })
    );
    
    const { result, waitForNextUpdate } = renderHook(() => useUsers());
    
    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
    
    // Wait for error to be handled
    await waitForNextUpdate();
    
    // Check that error was handled
    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toEqual('Internal server error');
  });
  
  it('refetches data when refetch is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUsers());
    
    // Wait for initial data to load
    await waitForNextUpdate();
    
    // Override the default handler for refetch
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Smith' },
            { id: '3', name: 'Bob Johnson' },
          ])
        );
      })
    );
    
    // Call refetch
    act(() => {
      result.current.refetch();
    });
    
    // Check that loading state is true
    expect(result.current.isLoading).toBe(true);
    
    // Wait for refetch to complete
    await waitForNextUpdate();
    
    // Check that data was updated
    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' },
    ]);
    expect(result.current.error).toBeNull();
  });
});
```

