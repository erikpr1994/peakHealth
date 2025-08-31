declare module '@peakhealth/ui' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
    size?: 'small' | 'medium' | 'large' | 'lg';
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    key?: string | number;
  }

  export const Button: React.FC<ButtonProps>;

  export interface CardProps {
    children: ReactNode;
    title?: string;
    variant?: 'default' | 'outlined' | 'elevated';
    className?: string;
  }

  export const Card: React.FC<CardProps>;

  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'small' | 'medium' | 'large';
    showCloseButton?: boolean;
  }

  export const Modal: React.FC<ModalProps>;

  export interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
  }

  export const Spinner: React.FC<SpinnerProps>;

  export interface TypographyProps {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    color?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
  }

  export const Typography: React.FC<TypographyProps>;

  export interface IconProps {
    name: string;
    size?: 'small' | 'medium' | 'large';
    color?: string;
  }

  export const Icon: React.FC<IconProps>;
}

