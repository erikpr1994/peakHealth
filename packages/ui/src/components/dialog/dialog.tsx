'use client';

import * as React from 'react';
import { cn } from '../../utils';
import './dialog.css';

export interface DialogProps
  extends Omit<React.HTMLAttributes<HTMLDialogElement>, 'title'> {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when the dialog is closed
   */
  onClose?: () => void;
  /**
   * Dialog title
   */
  title?: React.ReactNode;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Whether the dialog should be fullscreen
   */
  fullscreen?: boolean;
  /**
   * Additional class name for the dialog
   */
  className?: string;
  /**
   * Additional class name for the content
   */
  contentClassName?: string;
  /**
   * Children to render inside the dialog
   */
  children: React.ReactNode;
}

/**
 * Dialog component using the native HTML dialog element
 */
export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open = false,
      onClose,
      title,
      showCloseButton = true,
      fullscreen = false,
      className,
      contentClassName,
      children,
      ...props
    },
    ref
  ) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    // Merge refs
    const mergedRef = useMergedRef(ref, dialogRef);

    // Reference to store the close animation timer
    const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Flag to prevent double invocation of onClose
    const isClosingRef = React.useRef(false);

    // Handle the close animation
    const handleClose = React.useCallback(() => {
      if (!dialogRef.current || isClosingRef.current) return;

      // Clear any existing timer to prevent multiple calls
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      isClosingRef.current = true;
      setIsClosing(true);
      closeTimerRef.current = setTimeout(() => {
        dialogRef.current?.close();
        setIsClosing(false);
        onClose?.();
        closeTimerRef.current = null;
        isClosingRef.current = false;
      }, 200); // Match animation duration
    }, [onClose]);

    // Handle opening and closing the dialog
    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
      } else if (!open && dialog.open) {
        handleClose();
      }
    }, [open, handleClose]);

    // Cleanup timeout when component unmounts
    React.useEffect(() => {
      return () => {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
        }
        isClosingRef.current = false;
      };
    }, []);

    // Handle clicking outside the dialog
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialogDimensions = e.currentTarget.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        handleClose();
      }
    };

    return (
      <dialog
        ref={mergedRef}
        className={cn(
          'dialog',
          isClosing && 'dialog--closing',
          fullscreen && 'dialog--fullscreen',
          className
        )}
        onClick={handleBackdropClick}
        onClose={() => {
          // Only call onClose if we're not already in the process of closing
          if (!isClosingRef.current) {
            onClose?.();
          }
        }}
        {...props}
      >
        {title && (
          <div className="dialog__header">
            <h2 className="dialog__title">{title}</h2>
            {showCloseButton && (
              <button
                type="button"
                className="dialog__close"
                onClick={handleClose}
                aria-label="Close dialog"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className={cn('dialog__content', contentClassName)}>
          {children}
        </div>
      </dialog>
    );
  }
);

Dialog.displayName = 'Dialog';

// Helper components
export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('dialog__footer', className)} {...props}>
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

// Helper hook to merge refs
function useMergedRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (value: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T>).current = value;
        }
      });
    },
    [refs]
  );
}

// Fix missing useState import
const { useState } = React;
