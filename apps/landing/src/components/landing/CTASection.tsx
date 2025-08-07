import { Button } from '@peakhealth/ui';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import styles from './CTASection.module.css';

import { getSignupUrl } from '@/lib/auth';

export const CTASection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to transform your
            <span className={styles.gradientText}> fitness journey?</span>
          </h2>

          <p className={styles.description}>
            Join thousands of users who have already achieved their fitness
            goals with Peak Health. Start your free trial today and experience
            the difference.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Check className={styles.checkIcon} />
              <span>Free 14-day trial</span>
            </div>
            <div className={styles.feature}>
              <Check className={styles.checkIcon} />
              <span>No credit card required</span>
            </div>
            <div className={styles.feature}>
              <Check className={styles.checkIcon} />
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href={getSignupUrl()}>
                Start Free Trial
                <ArrowRight className={styles.arrowIcon} />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <p className={styles.disclaimer}>
            * Free trial includes all premium features. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
};
