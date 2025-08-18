'use client';

import * as React from 'react';

import './modal.css';
import { cn } from '../../utils';

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

  return (
    <div className={cn('peakhealth-modal', className)}>
      <div className="peakhealth-modal-backdrop" onClick={onClose} />
      <div className={cn('peakhealth-modal-content', contentClassName)}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="peakhealth-modal-close-button"
            aria-label="Close modal"
          >
            <svg
              className="peakhealth-modal-close-icon"
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
          <div className="peakhealth-modal-header">
            <h2 className="peakhealth-modal-title">{title}</h2>
          </div>
        )}
        <div className="peakhealth-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
