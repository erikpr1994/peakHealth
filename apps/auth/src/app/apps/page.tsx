import { Suspense } from 'react';

import { AppSelector } from './AppSelector';

import styles from './page.module.css';

const AppsPage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppSelector />
      </Suspense>
    </div>
  );
};

export default AppsPage;
