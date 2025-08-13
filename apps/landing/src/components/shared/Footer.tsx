import Link from 'next/link';
import React from 'react';

import styles from './Footer.module.css';

import { getSignupUrl } from '@/lib/auth';
import { Button } from '@peakhealth/ui';

export const Footer = (): React.JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Peak Health</h3>
            <p className={styles.description}>
              Your ultimate fitness companion for tracking workouts, monitoring
              progress, and achieving your fitness goals.
            </p>
            <Button asChild variant="primary" size="sm">
              <Link href={getSignupUrl()}>Get Started</Link>
            </Button>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Product</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/features">Features</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Support</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Connect</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/twitter">Twitter</Link>
              </li>
              <li>
                <Link href="/facebook">Facebook</Link>
              </li>
              <li>
                <Link href="/instagram">Instagram</Link>
              </li>
              <li>
                <Link href="/linkedin">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Peak Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
