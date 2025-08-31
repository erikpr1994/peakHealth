// Mock implementation of @peakhealth/ui components
import * as React from 'react';

export const Button = (props: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  size?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} data-testid="ui-button">
      {props.children}
    </button>
  );
};

export const Card = (props: {
  children: React.ReactNode;
  title?: string;
  variant?: string;
  className?: string;
}) => {
  return (
    <div data-testid="ui-card">
      {props.title && <div data-testid="ui-card-title">{props.title}</div>}
      {props.children}
    </div>
  );
};

export const Modal = (props: {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  size?: string;
  showCloseButton?: boolean;
}) => {
  if (!props.isOpen) return null;
  return (
    <div data-testid="ui-modal">
      {props.title && <div data-testid="ui-modal-title">{props.title}</div>}
      <button onClick={props.onClose} data-testid="ui-modal-close">
        Close
      </button>
      {props.children}
    </div>
  );
};

export const Spinner = () => {
  return <div data-testid="ui-spinner">Loading...</div>;
};

export const Typography = (props: {
  children: React.ReactNode;
  variant?: string;
  color?: string;
  align?: string;
  className?: string;
}) => {
  const Tag = props.variant?.startsWith('h') ? (props.variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') : 'p';
  return (
    <Tag data-testid={`ui-typography-${props.variant || 'body'}`}>
      {props.children}
    </Tag>
  );
};

export const Icon = (props: {
  name: string;
  size?: string;
  color?: string;
}) => {
  return <span data-testid={`ui-icon-${props.name}`}>{props.name}</span>;
};

