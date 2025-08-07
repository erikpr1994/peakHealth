'use client';

import { Button } from '@peakhealth/ui';
import React from 'react';

import styles from '../styles/AuthCard.module.css';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
}): React.JSX.Element => {
  return (
    <div className={styles.authCard}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
  error?: string;
}> = ({ label, children, error }): React.JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  }
> = ({ error, className, ...props }): React.JSX.Element => {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : ''} ${
        className ?? ''
      }`}
      {...props}
    />
  );
};

export { Button };

export const Divider: React.FC<{ text?: string }> = ({
  text = 'or',
}): React.JSX.Element => {
  return (
    <div className={styles.divider}>
      <span>{text}</span>
    </div>
  );
};

export const Link: React.FC<{
  className?: string;
  children: React.ReactNode;
  href: string;
}> = ({ className, children, ...props }): React.JSX.Element => {
  return (
    <a className={`${styles.link} ${className ?? ''}`} {...props}>
      {children}
    </a>
  );
};
