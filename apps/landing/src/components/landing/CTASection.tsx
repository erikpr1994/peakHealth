import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSignupUrl } from '@/lib/auth';
import styles from './CTASection.module.css';

export const CTASection = (): React.JSX.Element => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className={styles.description}>
            Join thousands of users who have already achieved their fitness
            goals with PeakHealth. Start your free trial today and experience
            the difference.
          </p>
          <div className={styles.actions}>
            <Link href={getSignupUrl()} className={styles.primaryButton}>
              Get Started Free
              <ArrowRight />
            </Link>
            <Link href="/features" className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
