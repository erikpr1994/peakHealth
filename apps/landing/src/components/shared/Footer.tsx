'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSignupUrl } from '@/lib/auth';
import styles from './Footer.module.css';

export const Footer = (): React.JSX.Element => {
  const [currentYear, setCurrentYear] = useState('');
  const [signupUrl, setSignupUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Set values on client side only to prevent hydration mismatches
  useEffect((): void => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear().toString());
    setSignupUrl(getSignupUrl());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.title}>PeakHealth</div>
            <p className={styles.description}>
              Transform your fitness journey with personalized workouts, expert
              guidance, and a supportive community.
            </p>
            <Link
              href={isMounted ? signupUrl : '#'}
              className={styles.ctaButton}
            >
              Get Started
            </Link>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Product</h3>
            <div className={styles.links}>
              <Link href="/features">Features</Link>
              <Link href="/roadmap">Roadmap</Link>
              <Link href="/feedback">Feedback</Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <div className={styles.links}>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Support</h3>
            <div className={styles.links}>
              <Link href="/help">Help Center</Link>
              <Link href="/feedback">Feedback</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {isMounted ? currentYear : '2025'} PeakHealth. All rights
            reserved.
          </div>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
