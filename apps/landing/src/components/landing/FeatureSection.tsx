import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import styles from './FeatureSection.module.css';

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

const features = [
  {
    title: 'Workout Tracking',
    description:
      'Log your exercises, sets, and reps with our intuitive interface.',
    icon: Check,
  },
  {
    title: 'Progress Analytics',
    description:
      'Visualize your fitness journey with detailed charts and insights.',
    icon: Check,
  },
  {
    title: 'Personalized Plans',
    description:
      'Get custom workout plans tailored to your goals and fitness level.',
    icon: Check,
  },
  {
    title: 'Social Features',
    description:
      'Connect with friends, share achievements, and stay motivated.',
    icon: Check,
  },
  {
    title: 'Nutrition Tracking',
    description:
      "Monitor your diet and ensure you're fueling your workouts properly.",
    icon: Check,
  },
  {
    title: 'Expert Guidance',
    description: 'Access to certified trainers and fitness professionals.',
    icon: Check,
  },
];

export const FeatureSection = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything you need to achieve your fitness goals
          </h2>
          <p className={styles.description}>
            Peak Health provides all the tools and features you need to
            transform your fitness journey and reach your goals faster.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.icon}>
                <feature.icon className={styles.iconSvg} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button asChild variant="primary" size="lg">
            <Link href={getSignupUrl()}>
              Get Started Today
              <ArrowRight className={styles.arrowIcon} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
