import { Suspense } from 'react';

// AuthCard is used in SignUpForm component
import { SignUpForm } from '@/features/auth';
import styles from '@/features/auth/components/page.module.css';

const SignUpPage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
