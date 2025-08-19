import React from 'react';

import styles from './FeedbackPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const FeedbackPage = (): React.JSX.Element => {
  return (
    <section className={styles.feedback}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Feedback & Suggestions</h1>
          <p className={styles.subtitle}>
            Help shape the future of PeakHealth with your ideas
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.introSection}>
            <h2 className={styles.introTitle}>We Value Your Input</h2>
            <p className={styles.introDescription}>
              Your feedback helps us build a better platform. Share your ideas,
              report issues, and help us prioritize what matters most to our
              community.
            </p>
          </div>

          <div className={styles.mainGrid}>
            <div className={styles.feedbackSection}>
              <h3 className={styles.feedbackTitle}>Current Status</h3>
              <p className={styles.feedbackDescription}>
                Our feedback system is being built. Soon you'll be able to
                submit feature requests, report bugs, and vote on community
                suggestions.
              </p>
            </div>

            <div className={styles.emailSection}>
              <h3 className={styles.emailTitle}>Get in Touch</h3>
              <p className={styles.emailDescription}>
                For now, send your feedback and suggestions directly to our
                team:
              </p>
              <div className={styles.emailContainer}>
                <p className={styles.emailText}>
                  📧{' '}
                  <a
                    href="mailto:info@peakhealth.es"
                    className={styles.emailLink}
                  >
                    info@peakhealth.es
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.categoriesGrid}>
            <div className={styles.category}>
              <div className={styles.categoryIcon}>💡</div>
              <h4 className={styles.categoryTitle}>Feature Requests</h4>
              <p className={styles.categoryDescription}>
                Suggest new features, improvements, or enhancements to make
                PeakHealth better
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.green}`}>🐛</div>
              <h4 className={styles.categoryTitle}>Bug Reports</h4>
              <p className={styles.categoryDescription}>
                Report issues, bugs, or problems you encounter while using the
                platform
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.purple}`}>
                🗳️
              </div>
              <h4 className={styles.categoryTitle}>Vote & Discuss</h4>
              <p className={styles.categoryDescription}>
                Vote on existing suggestions and participate in community
                discussions
              </p>
            </div>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteContainer}>
              <p className={styles.noteText}>
                <strong>Coming Soon:</strong> Our dedicated feedback platform
                will include feature voting, issue tracking, and community
                discussions. For now, please use the email above to share your
                thoughts with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
