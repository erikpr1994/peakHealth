import { Suspense } from 'react';

// AuthCard is used in SignUpForm component
import styles from './page.module.css';
import { SignUpForm } from './SignUpForm';

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
