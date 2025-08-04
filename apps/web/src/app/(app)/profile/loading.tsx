import React from 'react';

import styles from '@/features/profile/Profile.module.css';

export default function ProfileLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
      </div>
      <div className={styles.loadingState}>
        <p>Loading profile data...</p>
      </div>
    </div>
  );
}
