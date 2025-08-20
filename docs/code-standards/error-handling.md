# PeakHealth Error Handling Standards

This document outlines the standard error handling patterns for the PeakHealth codebase. Following these standards ensures consistency and improves code reliability and user experience.

## Error Handling Principles

1. **Be Explicit**: Handle errors explicitly rather than letting them propagate
2. **Be Informative**: Provide meaningful error messages
3. **Be User-Friendly**: Present errors in a way that users can understand
4. **Be Recoverable**: Allow users to recover from errors when possible
5. **Be Consistent**: Use consistent error handling patterns throughout the codebase

## Error Types

### Client-Side Errors

#### Network Errors

Network errors occur when the client fails to communicate with the server:

- Request timeouts
- Network disconnections
- CORS errors
- Server unavailability

#### Validation Errors

Validation errors occur when user input fails to meet the required criteria:

- Required fields missing
- Invalid format (email, phone number, etc.)
- Value out of range
- Invalid combination of values

#### Runtime Errors

Runtime errors occur during the execution of client-side code:

- JavaScript exceptions
- Rendering errors
- Memory issues
- Browser compatibility issues

### Server-Side Errors

#### API Errors

API errors are returned by the server in response to API requests:

- Authentication errors (401)
- Authorization errors (403)
- Resource not found (404)
- Validation errors (422)
- Server errors (500)

#### Database Errors

Database errors occur when interacting with the database:

- Connection errors
- Query errors
- Constraint violations
- Timeout errors

## Error Handling Strategies

### React Error Boundaries

Use React Error Boundaries to catch and handle errors in the component tree:

```tsx
import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
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

    // Log the error to an error reporting service
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

export default ErrorBoundary;
```

Usage:

```tsx
import ErrorBoundary from '@/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};
```

### API Error Handling

Use a consistent pattern for handling API errors:

```tsx
import { useState } from 'react';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

interface UseApiResult<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
  execute: () => Promise<void>;
}

const useApi = <T>(apiCall: () => Promise<T>): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.message || 'An unknown error occurred',
        code: err.code,
        status: err.status,
        details: err.details,
      };

      setError(apiError);

      // Log the error
      console.error('API Error:', apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useApi;
```

Usage:

```tsx
import useApi from '@/hooks/useApi';
import { fetchUser } from '@/api/user';

const UserProfile = ({ userId }) => {
  const {
    data: user,
    error,
    isLoading,
    execute,
  } = useApi(() => fetchUser(userId));

  useEffect(() => {
    execute();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading user profile</h2>
        <p>{error.message}</p>
        <button onClick={execute}>Try Again</button>
      </div>
    );
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      {/* Rest of the user profile */}
    </div>
  );
};
```

### Form Validation Errors

Use a consistent pattern for handling form validation errors:

```tsx
import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

interface UseFormValidationResult {
  errors: Record<string, string>;
  validateField: (
    field: string,
    value: any,
    rules: ValidationRule[]
  ) => boolean;
  validateForm: (
    formData: Record<string, any>,
    validationRules: Record<string, ValidationRule[]>
  ) => boolean;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
}

interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
}

const useFormValidation = (): UseFormValidationResult => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: string,
    value: any,
    rules: ValidationRule[]
  ): boolean => {
    for (const rule of rules) {
      let isValid = true;

      switch (rule.type) {
        case 'required':
          isValid = value !== undefined && value !== null && value !== '';
          break;
        case 'email':
          isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          break;
        case 'minLength':
          isValid = value.length >= rule.value;
          break;
        case 'maxLength':
          isValid = value.length <= rule.value;
          break;
        case 'pattern':
          isValid = new RegExp(rule.value).test(value);
          break;
        case 'custom':
          isValid = rule.validator ? rule.validator(value) : true;
          break;
      }

      if (!isValid) {
        setErrors(prev => ({ ...prev, [field]: rule.message }));
        return false;
      }
    }

    clearFieldError(field);
    return true;
  };

  const validateForm = (
    formData: Record<string, any>,
    validationRules: Record<string, ValidationRule[]>
  ): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const fieldIsValid = validateField(
        field,
        formData[field],
        validationRules[field]
      );

      if (!fieldIsValid) {
        isValid = false;
        newErrors[field] = errors[field];
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errors, validateField, validateForm, clearErrors, clearFieldError };
};

export default useFormValidation;
```

Usage:

```tsx
import { useState } from 'react';
import useFormValidation from '@/hooks/useFormValidation';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { errors, validateField, validateForm, clearErrors } =
    useFormValidation();

  const validationRules = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minLength',
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Please confirm your password' },
      {
        type: 'custom',
        message: 'Passwords do not match',
        validator: value => value === formData.password,
      },
    ],
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value, validationRules[name]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    clearErrors();

    if (validateForm(formData, validationRules)) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};
```

### Async/Await Error Handling

Use try/catch blocks for handling errors in async functions:

```tsx
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};
```

## Error Reporting

### Client-Side Error Reporting

Implement a centralized error reporting service:

```tsx
// errorReporting.ts
interface ErrorReportingOptions {
  context?: Record<string, any>;
  tags?: Record<string, string>;
  user?: {
    id?: string;
    email?: string;
    username?: string;
  };
}

class ErrorReportingService {
  private static instance: ErrorReportingService;

  private constructor() {
    // Initialize error reporting service
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }

    return ErrorReportingService.instance;
  }

  private setupGlobalErrorHandlers(): void {
    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      this.reportError(event.reason, {
        context: { type: 'unhandledRejection' },
      });
    });

    // Capture global errors
    window.addEventListener('error', event => {
      this.reportError(event.error, { context: { type: 'globalError' } });
    });
  }

  public reportError(
    error: Error | string,
    options?: ErrorReportingOptions
  ): void {
    const errorObject = typeof error === 'string' ? new Error(error) : error;

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error reported:', errorObject, options);
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service (e.g., Sentry, LogRocket, etc.)
      // This is a placeholder for the actual implementation
      this.sendToErrorService(errorObject, options);
    }
  }

  private sendToErrorService(
    error: Error,
    options?: ErrorReportingOptions
  ): void {
    // Implementation depends on the error reporting service being used
    // Example with a hypothetical API:
    /*
    errorReportingAPI.captureException(error, {
      context: options?.context,
      tags: options?.tags,
      user: options?.user,
    });
    */
  }
}

export const errorReporting = ErrorReportingService.getInstance();
```

Usage:

```tsx
import { errorReporting } from '@/lib/errorReporting';

try {
  // Some code that might throw an error
} catch (error) {
  errorReporting.reportError(error, {
    context: { component: 'UserProfile', action: 'fetchUserData' },
    user: { id: userId },
  });

  // Show user-friendly error message
}
```

## Error UI Components

### Error Message Component

Create a reusable error message component:

```tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  details,
  onRetry,
  className,
}) => {
  return (
    <div className={`error-message ${className || ''}`}>
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">{message}</h3>
        {details && <p className="error-details">{details}</p>}
        {onRetry && (
          <button className="error-retry" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
```

### Error Page Component

Create a reusable error page component:

```tsx
import React from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  title: string;
  message: string;
  code?: string | number;
  showHomeLink?: boolean;
  showBackLink?: boolean;
  showRetry?: boolean;
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  message,
  code,
  showHomeLink = true,
  showBackLink = true,
  showRetry = false,
  onRetry,
}) => {
  return (
    <div className="error-page">
      {code && <div className="error-code">{code}</div>}
      <h1 className="error-title">{title}</h1>
      <p className="error-message">{message}</p>

      <div className="error-actions">
        {showRetry && onRetry && (
          <button className="error-retry" onClick={onRetry}>
            Try Again
          </button>
        )}

        {showBackLink && (
          <button className="error-back" onClick={() => window.history.back()}>
            Go Back
          </button>
        )}

        {showHomeLink && (
          <Link href="/" className="error-home">
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
```

## Best Practices

### Do's

- Use error boundaries to catch and handle rendering errors
- Implement consistent error handling for API calls
- Provide user-friendly error messages
- Log errors for debugging and monitoring
- Use typed error objects
- Handle errors at the appropriate level
- Provide recovery options when possible

### Don'ts

- Don't swallow errors without handling them
- Don't expose sensitive information in error messages
- Don't use generic error messages that don't help users understand the problem
- Don't let errors propagate to the global scope
- Don't mix error handling strategies across the codebase
