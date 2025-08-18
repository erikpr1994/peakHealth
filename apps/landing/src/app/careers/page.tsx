import React from 'react';

import styles from './CareersPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const CareersPage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Join Our Team</h1>
        <p className={styles.subtitle}>
          Help us build the future of fitness technology
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.statusSection}>
          <h2 className={styles.statusTitle}>Current Status</h2>
          <p className={styles.statusDescription}>
            We're currently not actively searching for new employees, but we're
            always interested in connecting with talented individuals who share
            our passion for fitness and technology.
          </p>
          <div className={styles.openCvPolicy}>
            <p className={styles.openCvPolicyText}>
              <strong>Open CV Policy:</strong> We welcome and review all open
              CVs from passionate developers, designers, and fitness enthusiasts
              who want to make a difference in the fitness industry.
            </p>
          </div>
        </div>

        <div className={styles.applySection}>
          <h3 className={styles.applyTitle}>How to Apply</h3>
          <p className={styles.applyDescription}>
            Send your CV and a brief introduction to:
          </p>
          <div className={styles.emailContainer}>
            <p className={styles.emailLink}>
              📧{' '}
              <a href="mailto:info@peakhealth.es" className={styles.emailLink}>
                info@peakhealth.es
              </a>
            </p>
          </div>
          <p className={styles.applyNote}>
            We'll review your application and reach out if there's a potential
            fit for future opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
