// Mock implementation of @peakhealth/ui components
import React from 'react';

export const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <button onClick={onClick} data-testid="ui-button">
      {children}
    </button>
  );
};

export const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <div data-testid="ui-card">
      {title && <div data-testid="ui-card-title">{title}</div>}
      {children}
    </div>
  );
};

export const Modal = ({
  children,
  isOpen,
  title,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div data-testid="ui-modal">
      {title && <div data-testid="ui-modal-title">{title}</div>}
      <button onClick={onClose} data-testid="ui-modal-close">
        Close
      </button>
      {children}
    </div>
  );
};

export const Spinner = () => {
  return <div data-testid="ui-spinner">Loading...</div>;
};

export const Typography = ({ children, variant }: { children: React.ReactNode; variant?: string }) => {
  const Tag = variant?.startsWith('h') ? (variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') : 'p';
  return (
    <Tag data-testid={`ui-typography-${variant || 'body'}`}>
      {children}
    </Tag>
  );
};

export const Icon = ({ name }: { name: string }) => {
  return <span data-testid={`ui-icon-${name}`}>{name}</span>;
};

