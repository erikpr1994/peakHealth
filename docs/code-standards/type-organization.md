# PeakHealth TypeScript Type Organization Standards

This document outlines the standard patterns for organizing and using TypeScript types in the PeakHealth codebase. Following these standards ensures consistency, type safety, and improves code readability and maintainability.

## Type Organization Principles

1. **Type Safety First**: Prioritize type safety over convenience
2. **Explicit over Implicit**: Prefer explicit types over inferred types for public APIs
3. **DRY Types**: Reuse types through composition and inheritance
4. **Single Source of Truth**: Define types in a single location
5. **Progressive Disclosure**: Start with simple types and add complexity as needed

## Type File Organization

### Type File Structure

Types should be organized in dedicated files based on their domain:

```
src/
├── types/
│   ├── index.ts           # Re-exports all types
│   ├── api.ts             # API-related types
│   ├── auth.ts            # Authentication-related types
│   ├── user.ts            # User-related types
│   ├── exercise.ts        # Exercise-related types
│   └── ui.ts              # UI-related types
```

### Feature-Specific Types

Feature-specific types should be organized within the feature directory:

```
src/features/
├── exercise/
│   ├── types/
│   │   ├── index.ts       # Re-exports all exercise types
│   │   ├── exercise.ts    # Exercise entity types
│   │   ├── workout.ts     # Workout entity types
│   │   └── api.ts         # Exercise API types
```

### Component-Specific Types

Component-specific types should be defined in the component file or in a separate types file if they are complex:

```tsx
// Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // Component implementation
};
```

For complex components:

```
components/
├── DataTable/
│   ├── DataTable.tsx
│   ├── types.ts           # Component-specific types
│   └── index.ts           # Re-exports component and types
```

## Type Definitions

### Interface vs Type Alias

Use interfaces for object types that will be extended or implemented:

```tsx
// Use interface for objects that will be extended
interface User {
  id: string;
  name: string;
  email: string;
}

// Extending an interface
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}
```

Use type aliases for union types, intersection types, and types that won't be extended:

```tsx
// Use type for unions
type UserRole = 'admin' | 'user' | 'guest';

// Use type for function types
type FetchUserFn = (id: string) => Promise<User>;

// Use type for complex types
type UserWithPosts = User & { posts: Post[] };
```

### Naming Conventions

- **Interfaces**: Use PascalCase, no `I` prefix
  - ✅ `User`, `ButtonProps`, `ApiResponse`
  - ❌ `IUser`, `iButtonProps`, `apiResponse`

- **Type Aliases**: Use PascalCase
  - ✅ `UserRole`, `ApiEndpoint`, `Theme`
  - ❌ `userRole`, `apiEndpoint`, `theme`

- **Enums**: Use PascalCase for enum names, UPPER_CASE for enum values
  - ✅ `enum ButtonSize { SMALL = 'small', MEDIUM = 'medium', LARGE = 'large' }`
  - ❌ `enum buttonSize { small = 'small', medium = 'medium', large = 'large' }`

- **Generic Type Parameters**: Use PascalCase, single letter for simple generics
  - ✅ `function identity<T>(value: T): T`
  - ✅ `interface ApiResponse<Data> { data: Data; status: number }`
  - ❌ `function identity<t>(value: t): t`

### Type Composition

Compose types using intersection types:

```tsx
// Base types
interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// Composed types
type User = Entity & {
  name: string;
  email: string;
};

type Post = Entity & {
  title: string;
  content: string;
  authorId: string;
};
```

### Type Utilities

Use TypeScript's built-in utility types:

```tsx
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit specific properties
type PublicUser = Omit<User, 'password'>;

// Extract types from a union
type AdminRoles = Extract<UserRole, 'admin' | 'superadmin'>;

// Exclude types from a union
type NonAdminRoles = Exclude<UserRole, 'admin' | 'superadmin'>;

// Get return type of a function
type FetchUserResult = ReturnType<typeof fetchUser>;

// Get parameter types of a function
type FetchUserParams = Parameters<typeof fetchUser>;
```

## API Types

### Request and Response Types

Define request and response types for API endpoints:

```tsx
// API request types
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// API response types
interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// API function types
type CreateUserFn = (data: CreateUserRequest) => Promise<UserResponse>;
type UpdateUserFn = (id: string, data: UpdateUserRequest) => Promise<UserResponse>;
type DeleteUserFn = (id: string) => Promise<void>;
```

### API Client Types

Define types for API clients:

```tsx
interface ApiClient {
  get: <T>(url: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(url: string, data?: any) => Promise<T>;
  put: <T>(url: string, data?: any) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

interface UserApiClient {
  getUser: (id: string) => Promise<UserResponse>;
  createUser: CreateUserFn;
  updateUser: UpdateUserFn;
  deleteUser: DeleteUserFn;
}
```

## State Types

### Component State Types

Define types for component state:

```tsx
interface UserFormState {
  name: string;
  email: string;
  password: string;
  isSubmitting: boolean;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    form?: string;
  };
}

const UserForm: React.FC = () => {
  const [state, setState] = useState<UserFormState>({
    name: '',
    email: '',
    password: '',
    isSubmitting: false,
    errors: {},
  });
  
  // Component implementation
};
```

### Context State Types

Define types for context state:

```tsx
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

## Type Guards

Use type guards to narrow types:

```tsx
// Type guard for discriminated unions
interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

interface ErrorResponse {
  status: 'error';
  error: {
    message: string;
    code: string;
  };
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Type guard function
function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.status === 'success';
}

// Usage
function handleResponse<T>(response: ApiResponse<T>): T {
  if (isSuccessResponse(response)) {
    return response.data; // TypeScript knows this is SuccessResponse<T>
  } else {
    throw new Error(response.error.message); // TypeScript knows this is ErrorResponse
  }
}
```

## Generic Types

Use generic types to create reusable type definitions:

```tsx
// Generic API response type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic pagination type
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Generic form state type
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Usage
type UserFormState = FormState<{
  name: string;
  email: string;
  password: string;
}>;

type PaginatedUsers = PaginatedResponse<User>;
```

## Type Assertions

Use type assertions sparingly and only when necessary:

```tsx
// Avoid type assertions when possible
const user = JSON.parse(localStorage.getItem('user') || '{}') as User;

// Better: Use type guards
function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}

const userJson = localStorage.getItem('user') || '{}';
const parsedUser = JSON.parse(userJson);

if (isUser(parsedUser)) {
  // TypeScript knows parsedUser is User
  console.log(parsedUser.name);
} else {
  // Handle the case where parsedUser is not a User
  console.error('Invalid user data in localStorage');
}
```

## Type Imports and Exports

### Type Imports

Use explicit type imports:

```tsx
// Import types explicitly
import type { User, UserRole } from '@/types/user';
import { fetchUser } from '@/api/user';

// Or use inline type imports
import { fetchUser, type User, type UserRole } from '@/api/user';
```

### Type Exports

Export types explicitly:

```tsx
// Export types explicitly
export type User = {
  id: string;
  name: string;
  email: string;
};

export interface UserProps {
  user: User;
  onUpdate: (user: User) => void;
}

// Or use inline type exports
export const fetchUser = async (id: string): Promise<User> => {
  // Implementation
};

export type { User, UserProps };
```

## Type Documentation

Document types using JSDoc comments:

```tsx
/**
 * Represents a user in the system.
 */
interface User {
  /**
   * Unique identifier for the user.
   */
  id: string;
  
  /**
   * Full name of the user.
   */
  name: string;
  
  /**
   * Email address of the user.
   */
  email: string;
  
  /**
   * Whether the user's email has been verified.
   * @default false
   */
  emailVerified?: boolean;
  
  /**
   * Role of the user in the system.
   * @default 'user'
   */
  role?: UserRole;
}
```

## Best Practices

### Do's

- Define types for all public APIs
- Use TypeScript's built-in utility types
- Compose types using intersection types
- Use type guards to narrow types
- Document types using JSDoc comments
- Use explicit type imports and exports
- Use discriminated unions for state management

### Don'ts

- Don't use `any` unless absolutely necessary
- Don't use type assertions (`as`) unless necessary
- Don't define the same type in multiple places
- Don't use complex nested types (prefer composition)
- Don't use `Object` or `{}` as types (use `Record<string, unknown>` instead)
- Don't use `Function` as a type (use specific function types instead)

## Examples

### API Types Example

```tsx
// types/api.ts
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
  code: string;
  details?: Record<string, unknown>;
}

// types/user.ts
import type { ApiResponse, PaginatedResponse } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
}

export type UserResponse = ApiResponse<User>;
export type UsersResponse = ApiResponse<PaginatedResponse<User>>;

// api/user.ts
import type {
  User,
  UserResponse,
  UsersResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/types/user';

export const fetchUser = async (id: string): Promise<UserResponse> => {
  // Implementation
};

export const fetchUsers = async (
  page: number = 1,
  pageSize: number = 10
): Promise<UsersResponse> => {
  // Implementation
};

export const createUser = async (
  data: CreateUserRequest
): Promise<UserResponse> => {
  // Implementation
};

export const updateUser = async (
  id: string,
  data: UpdateUserRequest
): Promise<UserResponse> => {
  // Implementation
};
```

### Component Types Example

```tsx
// components/UserProfile/types.ts
import type { User } from '@/types/user';

export interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  onUpdate?: (user: User) => void;
}

export interface UserProfileState {
  isEditing: boolean;
  formData: {
    name: string;
    email: string;
  };
  errors: {
    name?: string;
    email?: string;
    form?: string;
  };
  isSubmitting: boolean;
}

// components/UserProfile/UserProfile.tsx
import { useState } from 'react';
import type { UserProfileProps, UserProfileState } from './types';
import { updateUser } from '@/api/user';

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isEditable = false,
  onUpdate,
}) => {
  const [state, setState] = useState<UserProfileState>({
    isEditing: false,
    formData: {
      name: user.name,
      email: user.email,
    },
    errors: {},
    isSubmitting: false,
  });
  
  // Component implementation
};
```

### Context Types Example

```tsx
// contexts/auth/types.ts
import type { User } from '@/types/user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

// contexts/auth/AuthContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { AuthState, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Context implementation
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
```

