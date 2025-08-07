'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = (): React.JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'white',
        fontSize: '1.2rem',
      }}
    >
      Redirecting to login...
    </div>
  );
};

export default Home;
