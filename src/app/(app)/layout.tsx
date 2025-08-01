import Header from "@/components/layout/header/Header";
import { AppProvider } from "@/contexts/AppContext";
import { FeatureFlagProvider } from "@/features/feature-flags";
import { NotificationsProvider } from "@/features/notifications";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <FeatureFlagProvider>
        <NotificationsProvider hasTrainer={false} isClubMember={false}>
          <Header />
          <main style={{ paddingTop: "64px" }}>{children}</main>
        </NotificationsProvider>
      </FeatureFlagProvider>
    </AppProvider>
  );
}
