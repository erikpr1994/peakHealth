// Suspense is used implicitly by Next.js

import { AuthCard } from '@/features/shared';

const TestPage = (): React.JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <AuthCard
        title="Auth App Test"
        subtitle="Everything is working correctly!"
      >
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>
            ✅ Auth App is Running
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            The centralized authentication system is ready for testing.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/login"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }}
            >
              Test Login
            </a>
            <a
              href="/signup"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }}
            >
              Test Signup
            </a>
            <a
              href="/apps"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }}
            >
              Test App Selection
            </a>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default TestPage;
