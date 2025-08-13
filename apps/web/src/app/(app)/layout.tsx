import Header from '@/components/layout/header/Header';
import { AppProvider } from '@/contexts/AppContext';
import { FeatureFlagProvider } from '@/features/feature-flags';
import { NotificationsProvider } from '@/features/notifications';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement => {
  return (
    <AppProvider>
      <FeatureFlagProvider>
        <NotificationsProvider hasTrainer={false} isClubMember={false}>
          <Header />
          <main style={{ paddingTop: '64px' }}>{children}</main>
        </NotificationsProvider>
      </FeatureFlagProvider>
    </AppProvider>
  );
};

export default AppLayout;
