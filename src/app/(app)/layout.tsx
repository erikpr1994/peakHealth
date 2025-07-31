import Header from "@/components/layout/header/Header";
import { NotificationsProvider } from "@/features/notifications";
import { AppProvider } from "@/contexts/AppContext";
import { FeatureFlagProvider } from "@/features/feature-flags";

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
