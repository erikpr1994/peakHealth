import { AuthCard } from '@/features/shared';

const AccessDeniedPage = (): React.JSX.Element => {
  return (
    <AuthCard
      title="Access Denied"
      subtitle="You don't have permission to access this resource"
    >
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h3 style={{ color: '#e53e3e', marginBottom: '1rem' }}>
          ❌ Access Denied
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          You don&apos;t have the necessary permissions to access this
          application.
        </p>
        <a
          href="/apps"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          Back to App Selection
        </a>
      </div>
    </AuthCard>
  );
};

export default AccessDeniedPage;
