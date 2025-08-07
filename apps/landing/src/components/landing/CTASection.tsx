import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import styles from './CTASection.module.css';

import { getSignupUrl } from '@/lib/auth';

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
  }
> = ({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  children,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className ?? ''}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: buttonClasses,
      ...props,
    });
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export const CTASection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to transform your fitness journey?
          </h2>
          <p className={styles.description}>
            Join thousands of users who have already achieved their fitness
            goals with Peak Health. Start your transformation today.
          </p>
          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href={getSignupUrl()}>
                Get Started Free
                <ArrowRight className={styles.arrowIcon} />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
