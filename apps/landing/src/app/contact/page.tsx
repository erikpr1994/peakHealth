import React from 'react';

import styles from './ContactPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const ContactPage = (): React.JSX.Element => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>Get in touch with the PeakHealth team</p>
        </div>

        <div className={styles.content}>
          <div className={styles.introSection}>
            <h2 className={styles.introTitle}>We'd Love to Hear from You</h2>
            <p className={styles.introDescription}>
              Whether you have questions about our platform, want to provide
              feedback, or are interested in partnerships, we're here to help.
            </p>
          </div>

          <div className={styles.mainGrid}>
            <div className={styles.contactSection}>
              <h3 className={styles.contactTitle}>Get in Touch</h3>
              <p className={styles.contactDescription}>
                For general inquiries, support, or feedback:
              </p>
              <div className={styles.emailContainer}>
                <p className={styles.emailLink}>
                  📧{' '}
                  <a href="mailto:info@peakhealth.es" className={styles.emailLink}>
                    info@peakhealth.es
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.responseSection}>
              <h3 className={styles.responseTitle}>Response Time</h3>
              <p className={styles.responseDescription}>
                We typically respond to all inquiries within 24-48 hours during
                business days. For urgent matters, please include "URGENT" in your
                subject line.
              </p>
            </div>
          </div>

          <div className={styles.categoriesGrid}>
            <div className={styles.category}>
              <div className={styles.categoryIcon}>💬</div>
              <h4 className={styles.categoryTitle}>General Support</h4>
              <p className={styles.categoryDescription}>
                Questions about features, account issues, or general help
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.green}`}>💡</div>
              <h4 className={styles.categoryTitle}>Feature Requests</h4>
              <p className={styles.categoryDescription}>
                Suggestions for new features or improvements
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.purple}`}>🤝</div>
              <h4 className={styles.categoryTitle}>Partnerships</h4>
              <p className={styles.categoryDescription}>
                Business opportunities and collaboration inquiries
              </p>
            </div>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteContainer}>
              <p className={styles.noteText}>
                <strong>Note:</strong> Our contact form is currently being
                developed. For now, please use the email address above to reach us
                directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
