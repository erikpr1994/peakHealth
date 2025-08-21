'use client';

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { cn } from '../../utils';
import './collapsible.css';

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      children,
      defaultOpen = false,
      open,
      onOpenChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(
      open !== undefined ? open : defaultOpen
    );
    const isControlled = open !== undefined;

    // Update internal state when controlled prop changes
    useEffect(() => {
      if (isControlled) {
        setIsOpen(open);
      }
    }, [isControlled, open]);

    const handleOpenChange = useCallback(
      (value: boolean) => {
        if (!disabled) {
          if (!isControlled) {
            setIsOpen(value);
          }
          onOpenChange?.(value);
        }
      },
      [disabled, isControlled, onOpenChange]
    );

    return (
      <div
        ref={ref}
        className={cn('collapsible', className)}
        data-slot="collapsible"
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? 'true' : undefined}
        {...props}
      >
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;

          if (child.type === CollapsibleTrigger) {
            return React.cloneElement(
              child as React.ReactElement<CollapsibleTriggerProps>,
              {
                onClick: (e: React.MouseEvent) => {
                  child.props.onClick?.(e);
                  handleOpenChange(!isOpen);
                },
                'aria-expanded': isOpen,
                disabled,
              }
            );
          }

          if (child.type === CollapsibleContent) {
            return React.cloneElement(
              child as React.ReactElement<CollapsibleContentProps>,
              {
                isOpen,
              }
            );
          }

          return child;
        })}
      </div>
    );
  }
);
Collapsible.displayName = 'Collapsible';

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, asChild, ...props }, ref) => {
  // If asChild is true, we render the children directly with additional props
  if (
    asChild &&
    React.Children.count(children) === 1 &&
    React.isValidElement(children)
  ) {
    return React.cloneElement(children, {
      ref,
      className: cn(
        'collapsible__trigger',
        className,
        children.props.className
      ),
      'data-slot': 'collapsible-trigger',
      role: 'button',
      ...children.props,
      ...props, // Put props last to ensure they override children.props
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn('collapsible__trigger', className)}
      data-slot="collapsible-trigger"
      {...props}
    >
      {children}
    </button>
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
}

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, isOpen, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [isVisible, setIsVisible] = useState(isOpen);

    // Measure content height for animations
    useEffect(() => {
      if (contentRef.current && typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(entries => {
          setHeight(entries[0].contentRect.height);
        });

        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
      }
    }, []);

    // Handle visibility based on open state
    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
      } else {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 300); // Match animation duration
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    if (!isVisible && !isOpen) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('collapsible__content', className)}
        data-slot="collapsible-content"
        data-state={isOpen ? 'open' : 'closed'}
        style={
          {
            '--content-height': height ? `${height}px` : 'auto',
          } as React.CSSProperties
        }
        {...props}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    );
  }
);
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
