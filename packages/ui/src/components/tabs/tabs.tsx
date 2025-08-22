import * as React from 'react';
import './tabs.css';

import { cn } from '../../utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The default value of the tabs (uncontrolled)
   */
  defaultValue?: string;
  /**
   * The controlled value of the tabs
   */
  value?: string;
  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * The orientation of the tabs
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The children of the tabs
   */
  children: React.ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The children of the tabs list
   */
  children: React.ReactNode;
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The value of the tab
   */
  value: string;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * The children of the tab
   */
  children: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value of the tab content
   */
  value: string;
  /**
   * The children of the tab content
   */
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
} | null>(null);

const useTabs = (): {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
} => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [tabValue, setTabValue] = React.useState<string>(
      value ?? defaultValue ?? ''
    );

    // Update internal state when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setTabValue(value);
      }
    }, [value]);

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setTabValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [onValueChange, value]
    );

    const tabsClasses = cn(
      'peakhealth-tabs',
      `peakhealth-tabs--${orientation}`,
      className
    );

    return (
      <TabsContext.Provider
        value={{
          value: tabValue,
          onValueChange: handleValueChange,
          orientation,
        }}
      >
        <div
          ref={ref}
          role="tablist"
          aria-orientation={orientation}
          className={tabsClasses}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabs();

    const tabsListClasses = cn(
      'peakhealth-tabs__list',
      `peakhealth-tabs__list--${orientation}`,
      className
    );

    return (
      <div ref={ref} className={tabsListClasses} {...props}>
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, orientation } = useTabs();
    const isSelected = selectedValue === value;

    const handleClick = (): void => {
      onValueChange(value);
    };

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ): void => {
      // Handle keyboard navigation
      const triggers = Array.from(
        event.currentTarget.parentElement?.querySelectorAll(
          '[role="tab"]:not([disabled])'
        ) || []
      ) as HTMLButtonElement[];

      const currentIndex = triggers.indexOf(event.currentTarget);
      const lastIndex = triggers.length - 1;

      let nextIndex: number | null = null;

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
        } else if (event.key === 'ArrowRight') {
          nextIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
        }
      } else {
        if (event.key === 'ArrowUp') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
        } else if (event.key === 'ArrowDown') {
          nextIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
        }
      }

      if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = lastIndex;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        triggers[nextIndex].focus();
        onValueChange(triggers[nextIndex].getAttribute('data-value') || '');
      }
    };

    const tabsTriggerClasses = cn(
      'peakhealth-tabs__trigger',
      isSelected && 'peakhealth-tabs__trigger--selected',
      `peakhealth-tabs__trigger--${orientation}`,
      className
    );

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`peakhealth-tabs-content-${value}`}
        tabIndex={isSelected ? 0 : -1}
        data-value={value}
        data-state={isSelected ? 'active' : 'inactive'}
        disabled={disabled}
        className={tabsTriggerClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue } = useTabs();
    const isSelected = selectedValue === value;

    const tabsContentClasses = cn(
      'peakhealth-tabs__content',
      isSelected && 'peakhealth-tabs__content--selected',
      className
    );

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`peakhealth-tabs-content-${value}`}
        aria-labelledby={`peakhealth-tabs-trigger-${value}`}
        hidden={!isSelected}
        tabIndex={0}
        data-state={isSelected ? 'active' : 'inactive'}
        className={tabsContentClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
