# PeakHealth Component Structure and Composition Standards

This document outlines the standard patterns for structuring and composing React components in the PeakHealth codebase. Following these standards ensures consistency, reusability, and maintainability.

## Component Structure Principles

1. **Single Responsibility**: Components should have a single responsibility
2. **Composition over Inheritance**: Prefer component composition over inheritance
3. **Encapsulation**: Components should encapsulate their internal state and logic
4. **Reusability**: Components should be designed for reuse
5. **Testability**: Components should be easy to test

## Component Types

### UI Components

UI components are presentational components that render UI elements:

- Buttons, inputs, cards, modals, etc.
- Focus on appearance and behavior
- Accept props for customization
- Minimal or no internal state
- No direct API calls or business logic

### Container Components

Container components manage data and state:

- Fetch and manage data
- Handle business logic
- Pass data and callbacks to UI components
- Connect to global state (context, etc.)
- Handle side effects

### Page Components

Page components represent entire pages or views:

- Compose container and UI components
- Handle routing parameters
- Manage page-level state
- Handle page-level side effects

### Layout Components

Layout components define the structure of the page:

- Header, footer, sidebar, etc.
- Define the overall layout
- Handle responsive behavior
- Minimal or no internal state

## Component Organization

### File Structure

Components should be organized in a consistent file structure:

```
components/
├── Button/
│   ├── Button.tsx         # Component implementation
│   ├── Button.module.css  # Component styles
│   ├── Button.test.tsx    # Component tests
│   ├── Button.stories.tsx # Component stories
│   └── index.ts           # Re-export the component
```

For complex components:

```
components/
├── DataTable/
│   ├── DataTable.tsx      # Main component
│   ├── components/        # Sub-components
│   │   ├── Header.tsx
│   │   ├── Row.tsx
│   │   ├── Cell.tsx
│   │   └── Pagination.tsx
│   ├── hooks/             # Component-specific hooks
│   │   ├── useSort.ts
│   │   └── usePagination.ts
│   ├── utils.ts           # Component-specific utilities
│   ├── types.ts           # Component-specific types
│   ├── DataTable.module.css
│   ├── DataTable.test.tsx
│   ├── DataTable.stories.tsx
│   └── index.ts           # Re-export the component and types
```

### Directory Structure

Components should be organized by type and domain:

```
src/
├── components/            # Shared components
│   ├── ui/                # UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   ├── layout/            # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── common/            # Common components
│       ├── UserAvatar/
│       ├── Pagination/
│       └── ErrorBoundary/
├── features/              # Feature-specific components
│   ├── auth/
│   │   ├── components/    # Auth-specific components
│   │   │   ├── LoginForm/
│   │   │   └── SignupForm/
│   ├── exercise/
│   │   ├── components/    # Exercise-specific components
│   │   │   ├── ExerciseList/
│   │   │   └── ExerciseDetail/
```

## Component Implementation

### Component Structure

Components should follow a consistent structure:

```tsx
// Import statements
import React, { useState, useEffect } from 'react';
import styles from './ComponentName.module.css';

// Types
interface ComponentNameProps {
  // Props definition
}

// Component implementation
export const ComponentName: React.FC<ComponentNameProps> = ({ 
  // Destructured props
}) => {
  // State
  const [state, setState] = useState(initialState);
  
  // Effects
  useEffect(() => {
    // Effect implementation
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Event handler implementation
  };
  
  // Render helpers
  const renderItem = (item) => {
    // Render helper implementation
  };
  
  // Component render
  return (
    // JSX
  );
};

// Default export
export default ComponentName;
```

### Props

Props should be well-defined and documented:

```tsx
interface ButtonProps {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * The content of the button
   */
  children: React.ReactNode;
  
  /**
   * Callback fired when the button is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional class name
   */
  className?: string;
}
```

Use default props for optional props:

```tsx
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  className,
}) => {
  // Component implementation
};
```

### State Management

Use appropriate state management based on complexity:

```tsx
// Simple state
const [count, setCount] = useState(0);

// Object state
const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
});

// Update object state
setForm(prev => ({
  ...prev,
  name: 'John',
}));

// Complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### Side Effects

Handle side effects with useEffect:

```tsx
// Fetch data on mount
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchSomeData();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

// Update document title when title changes
useEffect(() => {
  document.title = title;
}, [title]);

// Clean up resources
useEffect(() => {
  const subscription = subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Event Handling

Handle events consistently:

```tsx
// Event handler
const handleClick = () => {
  // Event handler implementation
};

// Event handler with parameters
const handleItemClick = (id: string) => {
  // Event handler implementation
};

// Usage
<button onClick={handleClick}>Click me</button>
<div onClick={() => handleItemClick(item.id)}>Click item</div>
```

### Conditional Rendering

Use consistent patterns for conditional rendering:

```tsx
// Conditional rendering with &&
{isLoading && <Spinner />}

// Conditional rendering with ternary operator
{isLoading ? <Spinner /> : <Content />}

// Conditional rendering with early return
if (isLoading) {
  return <Spinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

return <Content />;
```

### List Rendering

Render lists with keys:

```tsx
<ul>
  {items.map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

## Component Composition

### Composition Patterns

#### Props

Pass props to customize component behavior:

```tsx
// Button component
const Button = ({ variant, size, children, ...props }) => {
  // Component implementation
};

// Usage
<Button variant="primary" size="large">
  Click me
</Button>
```

#### Children

Use children for flexible composition:

```tsx
// Card component
const Card = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

// Usage
<Card title="User Profile">
  <UserProfile user={user} />
</Card>
```

#### Render Props

Use render props for flexible rendering:

```tsx
// List component
const List = ({ items, renderItem }) => {
  return (
    <ul className={styles.list}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

// Usage
<List
  items={users}
  renderItem={user => (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  )}
/>
```

#### Compound Components

Use compound components for complex components:

```tsx
// Tabs component
const TabContext = createContext();

const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles.tabs}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

const TabList = ({ children }) => {
  return (
    <div className={styles.tabList}>
      {children}
    </div>
  );
};

const Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  
  return (
    <button
      className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }) => {
  return (
    <div className={styles.tabPanels}>
      {children}
    </div>
  );
};

const TabPanel = ({ id, children }) => {
  const { activeTab } = useContext(TabContext);
  
  if (activeTab !== id) {
    return null;
  }
  
  return (
    <div className={styles.tabPanel}>
      {children}
    </div>
  );
};

// Compose the components
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

// Usage
<Tabs defaultTab="profile">
  <Tabs.TabList>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanels>
    <Tabs.TabPanel id="profile">
      <UserProfile user={user} />
    </Tabs.TabPanel>
    <Tabs.TabPanel id="settings">
      <UserSettings user={user} />
    </Tabs.TabPanel>
  </Tabs.TabPanels>
</Tabs>
```

#### Higher-Order Components (HOCs)

Use HOCs sparingly for cross-cutting concerns:

```tsx
// withAuth HOC
const withAuth = (Component) => {
  const WithAuth = (props) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <Spinner />;
    }
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    return <Component user={user} {...props} />;
  };
  
  WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return WithAuth;
};

// Usage
const UserProfile = ({ user }) => {
  // Component implementation
};

export default withAuth(UserProfile);
```

#### Custom Hooks

Extract reusable logic into custom hooks:

```tsx
// useForm hook
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(values);
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

// Usage
const SignupForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    name: '',
    email: '',
    password: '',
  });
  
  const onSubmit = async (values) => {
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.name && errors.name && <div>{errors.name}</div>}
      
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && <div>{errors.email}</div>}
      
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
};
```

## Component Optimization

### Memoization

Use React.memo for pure components:

```tsx
const UserCard = React.memo(({ user }) => {
  return (
    <div className={styles.card}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

Use useMemo for expensive calculations:

```tsx
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

Use useCallback for callbacks:

```tsx
const handleClick = useCallback(() => {
  // Event handler implementation
}, [dependencies]);
```

### Code Splitting

Use React.lazy and Suspense for code splitting:

```tsx
const UserProfile = React.lazy(() => import('./UserProfile'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile user={user} />
    </Suspense>
  );
};
```

### Performance Monitoring

Use the React DevTools Profiler to identify performance issues:

- Record renders
- Identify components that render too often
- Identify expensive renders
- Optimize components that are causing performance issues

## Component Testing

### Unit Tests

Write unit tests for components:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
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

### Integration Tests

Write integration tests for component interactions:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm', () => {
  it('submits the form with user data', async () => {
    const handleSubmit = jest.fn();
    render(<UserForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });
});
```

### Snapshot Tests

Use snapshot tests for UI components:

```tsx
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot when disabled', () => {
    const { container } = render(<Button disabled>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

## Component Documentation

### Component Stories

Use Storybook to document components:

```tsx
// Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

### JSDoc Comments

Document components with JSDoc comments:

```tsx
/**
 * Button component for user interaction.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  className,
}) => {
  // Component implementation
};
```

## Best Practices

### Do's

- Keep components small and focused
- Use composition to build complex components
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Write tests for components
- Document components with JSDoc and Storybook
- Use consistent naming conventions
- Optimize components for performance

### Don'ts

- Don't create large, monolithic components
- Don't use inheritance for component reuse
- Don't mix UI and business logic in the same component
- Don't use inline styles (use CSS modules instead)
- Don't use class components (use functional components with hooks)
- Don't use HOCs excessively (prefer hooks and composition)
- Don't use index as key for lists
- Don't mutate props or state directly

