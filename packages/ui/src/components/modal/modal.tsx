'use client';

import * as React from 'react';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  className,
  contentClassName,
}) => {
  // Prevent body scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Restore scrolling when component unmounts
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalStyles: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const backdropStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    width: '90vw',
    height: '90vh',
    maxWidth: '72rem',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
  };

  const closeButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

  const closeIconStyles: React.CSSProperties = {
    width: '1.5rem',
    height: '1.5rem',
    color: '#6b7280',
  };

  const headerStyles: React.CSSProperties = {
    padding: '1.5rem 1.5rem 0 1.5rem',
    borderBottom: '1px solid #e5e7eb',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111827',
    lineHeight: '1.75rem',
  };

  const bodyStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
  };

  return (
    <div className={className} style={modalStyles}>
      <div style={backdropStyles} onClick={onClose} />
      <div className={contentClassName} style={contentStyles}>
        {showCloseButton && (
          <button
            onClick={onClose}
            style={closeButtonStyles}
            aria-label="Close modal"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={closeIconStyles}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {title && (
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
          </div>
        )}
        <div style={bodyStyles}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
