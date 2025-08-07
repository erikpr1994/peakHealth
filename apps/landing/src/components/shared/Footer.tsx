import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Peak Health</span>
            </div>
            <p className={styles.tagline}>
              Your ultimate fitness companion for tracking workouts, monitoring
              progress, and achieving your fitness goals.
            </p>
            <div className={styles.social}>
              <a
                href="https://facebook.com/peakhealth"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook className={styles.socialIcon} />
              </a>
              <a
                href="https://twitter.com/peakhealth"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter className={styles.socialIcon} />
              </a>
              <a
                href="https://instagram.com/peakhealth"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram className={styles.socialIcon} />
              </a>
              <a
                href="https://linkedin.com/company/peakhealth"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin className={styles.socialIcon} />
              </a>
              <a
                href="mailto:hello@peakhealth.es"
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail className={styles.socialIcon} />
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Product</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/features" className={styles.link}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className={styles.link}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/pro" className={styles.link}>
                    Pro Platform
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className={styles.link}>
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Resources</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/blog" className={styles.link}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className={styles.link}>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className={styles.link}>
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className={styles.link}>
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/about" className={styles.link}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className={styles.link}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className={styles.link}>
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={styles.link}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Legal</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/privacy" className={styles.link}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={styles.link}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className={styles.link}>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className={styles.link}>
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; 2024 Peak Health. All rights reserved.</p>
          </div>
          <div className={styles.newsletter}>
            <p>Stay updated with fitness tips and news</p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
