# PeakHealth State Management Standards

This document outlines the standard state management patterns for the PeakHealth codebase. Following these standards ensures consistency and improves code maintainability and performance.

## State Management Principles

1. **Minimize State**: Only store what you need in state
2. **Localize State**: Keep state as close as possible to where it's used
3. **Derive State**: Calculate derived state on-the-fly rather than storing it
4. **Separate Concerns**: Separate UI state from domain state
5. **Optimize Updates**: Prevent unnecessary re-renders

## State Categories

### Local Component State

Local component state is state that is only relevant to a single component:

- Form input values
- UI state (open/closed, active tab, etc.)
- Component-specific data

### Shared State

Shared state is state that is shared between multiple components:

- User authentication state
- Feature flags
- Theme settings
- Notifications

### Server State

Server state is data that comes from the server:

- API responses
- User data
- Application data

## State Management Approaches

### Local Component State

Use React's built-in `useState` and `useReducer` hooks for local component state:

```tsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};
```

For more complex local state, use `useReducer`:

```tsx
import { useReducer } from 'react';

interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_STEP'; payload: number };

const initialState: CounterState = {
  count: 0,
  step: 1,
};

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <div>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <span>{state.count}</span>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      </div>
      <div>
        <label>
          Step:
          <input
            type="number"
            value={state.step}
            onChange={e =>
              dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })
            }
            min="1"
          />
        </label>
      </div>
    </div>
  );
};
```

### Shared State with Context

Use React Context for shared state that doesn't change frequently:

```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
```

Usage:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

### Server State Management

Use React Query or SWR for server state management:

```tsx
// Using React Query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '@/api/todos';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery('todos', fetchTodos);

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  return {
    todos: todosQuery.data || [],
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
```

Usage:

```tsx
import { useTodos } from '@/hooks/useTodos';

const TodoList = () => {
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } =
    useTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo({ title: 'New Todo', completed: false })}>
        Add Todo
      </button>
    </div>
  );
};
```

## State Management Patterns

### Custom Hooks for Reusable State Logic

Extract reusable state logic into custom hooks:

```tsx
// useCounter.ts
import { useState } from 'react';

interface UseCounterOptions {
  initialCount?: number;
  step?: number;
  min?: number;
  max?: number;
}

interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

export const useCounter = ({
  initialCount = 0,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
}: UseCounterOptions = {}): UseCounterResult => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(prev => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialCount);
  };

  const setCountSafe = (newCount: number) => {
    setCount(Math.max(min, Math.min(newCount, max)));
  };

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: setCountSafe,
  };
};
```

Usage:

```tsx
import { useCounter } from '@/hooks/useCounter';

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter({
    initialCount: 0,
    step: 1,
    min: 0,
    max: 10,
  });

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

### Context + Reducer Pattern

Combine Context and Reducer for complex shared state:

```tsx
// TodoContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: TodoState['filter'] };

interface TodoContextType {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            title: action.payload.title,
            completed: action.payload.completed,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
```

Usage:

```tsx
import { useTodoContext } from '@/contexts/TodoContext';

const TodoList = () => {
  const { state, dispatch } = useTodoContext();

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
              }
            />
            <span>{todo.title}</span>
            <button
              onClick={() =>
                dispatch({ type: 'REMOVE_TODO', payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={e => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.elements.namedItem('title') as HTMLInputElement;

          dispatch({
            type: 'ADD_TODO',
            payload: { title: input.value, completed: false },
          });

          form.reset();
        }}
      >
        <input name="title" placeholder="Add todo" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
```

### State Machines

Use state machines for complex state logic:

```tsx
// useFormState.ts
import { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState<T> {
  status: FormStatus;
  data: T;
  errors: Record<keyof T, string> | null;
  touched: Record<keyof T, boolean>;
}

interface UseFormStateOptions<T> {
  initialData: T;
  onSubmit: (data: T) => Promise<void>;
  validate?: (data: T) => Record<keyof T, string> | null;
}

export const useFormState = <T extends Record<string, any>>({
  initialData,
  onSubmit,
  validate,
}: UseFormStateOptions<T>) => {
  const [state, setState] = useState<FormState<T>>({
    status: 'idle',
    data: initialData,
    errors: null,
    touched: Object.keys(initialData).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<keyof T, boolean>
    ),
  });

  const setData = (field: keyof T, value: any) => {
    const newData = { ...state.data, [field]: value };
    const newTouched = { ...state.touched, [field]: true };

    setState(prev => ({
      ...prev,
      data: newData,
      touched: newTouched,
      errors: validate ? validate(newData) : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(state.data).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );

    // Validate the form
    const errors = validate ? validate(state.data) : null;

    if (errors) {
      setState(prev => ({
        ...prev,
        errors,
        touched: allTouched,
      }));
      return;
    }

    // Submit the form
    setState(prev => ({
      ...prev,
      status: 'submitting',
      touched: allTouched,
    }));

    try {
      await onSubmit(state.data);
      setState(prev => ({
        ...prev,
        status: 'success',
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: 'error',
        errors: {
          ...prev.errors,
          form: error.message,
        },
      }));
    }
  };

  const reset = () => {
    setState({
      status: 'idle',
      data: initialData,
      errors: null,
      touched: Object.keys(initialData).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {} as Record<keyof T, boolean>
      ),
    });
  };

  return {
    state,
    setData,
    handleSubmit,
    reset,
  };
};
```

Usage:

```tsx
import { useFormState } from '@/hooks/useFormState';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const validateForm = (data: SignupFormData) => {
    const errors: Partial<Record<keyof SignupFormData, string>> = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(errors).length > 0
      ? (errors as Record<keyof SignupFormData, string>)
      : null;
  };

  const handleSubmit = async (data: SignupFormData) => {
    // Submit the form data to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
  };

  const {
    state,
    setData,
    handleSubmit: submitForm,
    reset,
  } = useFormState<SignupFormData>({
    initialData: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={state.data.email}
          onChange={e => setData('email', e.target.value)}
        />
        {state.touched.email && state.errors?.email && (
          <div className="error">{state.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={state.data.password}
          onChange={e => setData('password', e.target.value)}
        />
        {state.touched.password && state.errors?.password && (
          <div className="error">{state.errors.password}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={state.data.confirmPassword}
          onChange={e => setData('confirmPassword', e.target.value)}
        />
        {state.touched.confirmPassword && state.errors?.confirmPassword && (
          <div className="error">{state.errors.confirmPassword}</div>
        )}
      </div>

      <div>
        <button type="submit" disabled={state.status === 'submitting'}>
          {state.status === 'submitting' ? 'Submitting...' : 'Sign Up'}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>

      {state.status === 'success' && (
        <div className="success">Form submitted successfully!</div>
      )}

      {state.status === 'error' && state.errors?.form && (
        <div className="error">{state.errors.form}</div>
      )}
    </form>
  );
};
```

## Performance Optimization

### Memoization

Use `useMemo` and `useCallback` to prevent unnecessary re-renders:

```tsx
import { useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ data, onItemClick }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item),
    }));
  }, [data]);

  // Memoize callbacks
  const handleItemClick = useCallback(
    item => {
      onItemClick(item.id);
    },
    [onItemClick]
  );

  return (
    <ul>
      {processedData.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item)}>
          {item.processed}
        </li>
      ))}
    </ul>
  );
};
```

### Context Splitting

Split context into smaller, more focused contexts to prevent unnecessary re-renders:

```tsx
// Instead of one large context
const AppContext = createContext({
  user: null,
  theme: 'light',
  notifications: [],
  settings: {},
});

// Split into smaller contexts
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const NotificationsContext = createContext([]);
const SettingsContext = createContext({});
```

### State Colocation

Keep state as close as possible to where it's used:

```tsx
// Instead of lifting state to a common ancestor
const ParentComponent = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <div>
      <ChildComponent1 value={value1} onChange={setValue1} />
      <ChildComponent2 value={value2} onChange={setValue2} />
    </div>
  );
};

// Keep state in the components that use it
const ParentComponent = () => {
  return (
    <div>
      <ChildComponent1 />
      <ChildComponent2 />
    </div>
  );
};

const ChildComponent1 = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  );
};
```

## Best Practices

### Do's

- Keep state as minimal as possible
- Use the appropriate state management approach for the use case
- Derive state when possible instead of storing it
- Split context into smaller, more focused contexts
- Use memoization to prevent unnecessary re-renders
- Document state management decisions

### Don'ts

- Don't use global state for everything
- Don't store derived state
- Don't use context for state that changes frequently
- Don't use complex state management solutions for simple problems
- Don't mix different state management approaches for the same type of state
