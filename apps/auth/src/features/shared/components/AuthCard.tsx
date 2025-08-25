'use client';

import React from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from '../styles/AuthCard.module.css';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'full-width';
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
}): React.JSX.Element => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authInfo}>
        <h2>Welcome to PeakHealth</h2>
        <p>
          Track your workouts, monitor your progress, and achieve your fitness
          goals with our comprehensive fitness platform.
        </p>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>✓</div>
            <span>Create custom workout routines</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>✓</div>
            <span>Track your progress with detailed analytics</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>✓</div>
            <span>Connect with fitness community</span>
          </div>
        </div>
      </div>
      <div
        className={`${styles.authCard} ${variant === 'full-width' ? styles.fullWidth : ''}`}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            {title.split(' ').map((word, index, array) =>
              index === array.length - 1 ? (
                <span key={index} className={styles.gradientText}>
                  {word}
                </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {children}
      </div>
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

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}): React.JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

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
