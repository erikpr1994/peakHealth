import * as React from 'react';
import { cn } from '../../utils';

// Auto-import CSS for convenience
import './toast.css';

export interface ToastProps {
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
  showCloseButton?: boolean;
}

export interface ToastContextType {
  showToast: (
    props: Omit<ToastProps, 'children'> & { message: string }
  ) => void;
  hideToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastItem {
  id: string;
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
  showCloseButton?: boolean;
  timeoutId?: NodeJS.Timeout;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const hideToast = React.useCallback((id: string) => {
    setToasts(prev => {
      const toastToRemove = prev.find(toast => toast.id === id);
      if (toastToRemove?.timeoutId) {
        clearTimeout(toastToRemove.timeoutId);
      }
      return prev.filter(toast => toast.id !== id);
    });
  }, []);

  const showToast = React.useCallback(
    (props: Omit<ToastProps, 'children'> & { message: string }): void => {
      const id = Math.random().toString(36).substr(2, 9);
      const { message, duration = 5000, ...toastProps } = props;

      let timeoutId: NodeJS.Timeout | undefined;

      if (duration > 0) {
        timeoutId = setTimeout(() => {
          hideToast(id);
        }, duration);
      }

      const newToast: ToastItem = {
        id,
        message,
        duration,
        timeoutId,
        ...toastProps,
      };

      setToasts(prev => [...prev, newToast]);
    },
    [hideToast]
  );

  // Cleanup all timeouts on unmount
  React.useEffect((): (() => void) => {
    return (): void => {
      setToasts(prev => {
        prev.forEach(toast => {
          if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
          }
        });
        return [];
      });
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="peakhealth-toast-container">
      {toasts.map(toast => (
        <ToastItemComponent
          key={toast.id}
          toast={toast}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};

interface ToastItemComponentProps {
  toast: ToastItem;
  onClose: () => void;
}

const ToastItemComponent: React.FC<ToastItemComponentProps> = ({
  toast,
  onClose,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const exitTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return (): void => clearTimeout(timer);
  }, []);

  // Cleanup exit timeout on unmount
  React.useEffect((): (() => void) => {
    return (): void => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = (): void => {
    setIsVisible(false);
    exitTimeoutRef.current = setTimeout(onClose, 200); // Wait for exit animation
  };

  const getIcon = (): React.ReactNode => {
    switch (toast.variant) {
      case 'success':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      case 'error':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18.364 18.364A9 9 0 1 1 5.636 5.636a9 9 0 0 1 12.728 12.728zM12 8v4m0 4h.01" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'info':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'peakhealth-toast',
        `peakhealth-toast--${toast.variant || 'default'}`,
        isVisible && 'peakhealth-toast--visible',
        toast.className
      )}
    >
      <div className="peakhealth-toast-content">
        {getIcon() && <div className="peakhealth-toast-icon">{getIcon()}</div>}
        <div className="peakhealth-toast-message">{toast.message}</div>
        {toast.showCloseButton !== false && (
          <button
            className="peakhealth-toast-close"
            onClick={handleClose}
            aria-label="Close toast"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Standalone Toast component for direct usage
export const Toast: React.FC<ToastProps> = ({
  children,
  variant = 'default',
  className,
  showCloseButton = true,
  onClose,
}) => {
  const handleClose = (): void => {
    onClose?.();
  };

  const getIcon = (): React.ReactNode => {
    switch (variant) {
      case 'success':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      case 'error':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18.364 18.364A9 9 0 1 1 5.636 5.636a9 9 0 0 1 12.728 12.728zM12 8v4m0 4h.01" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'info':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'peakhealth-toast',
        `peakhealth-toast--${variant}`,
        className
      )}
    >
      <div className="peakhealth-toast-content">
        {getIcon() && <div className="peakhealth-toast-icon">{getIcon()}</div>}
        <div className="peakhealth-toast-message">{children}</div>
        {showCloseButton && (
          <button
            className="peakhealth-toast-close"
            onClick={handleClose}
            aria-label="Close toast"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
