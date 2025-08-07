'use client';

import React from 'react';

import styles from './BlogHeader.module.css';

interface BlogHeaderProps {
  title: string;
  description?: string;
  date?: string;
  author?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  description,
  date,
  author,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.meta}>
          {date && <span className={styles.date}>{date}</span>}
          {author && <span className={styles.author}>By {author}</span>}
        </div>
      </div>
    </header>
  );
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
