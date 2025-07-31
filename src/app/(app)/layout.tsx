import Header from "@/components/layout/Header";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { AppProvider } from "@/contexts/AppContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <NotificationsProvider hasTrainer={false} isClubMember={false}>
        <Header />
        {children}
      </NotificationsProvider>
    </AppProvider>
  );
}
