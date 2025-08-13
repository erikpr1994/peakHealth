import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import styles from './CTASection.module.css';

import { getSignupUrl } from '@/lib/auth';
import { Button } from '@peakhealth/ui';

export const CTASection = (): React.JSX.Element => {
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
                <ArrowRight />
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
