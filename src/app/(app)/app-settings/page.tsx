"use client";

import AppSettings from "@/features/settings/AppSettings";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";

export default function AppSettingsPage() {
  const router = useRouter();
  const {
    hasTrainer,
    toggleTrainer,
    isClubMember,
    toggleClubMembership,
    showWelcomeScreen,
    toggleWelcomeScreen,
  } = useAppContext();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <AppSettings
      onNavigate={handleNavigate}
      hasTrainer={hasTrainer}
      onToggleTrainer={toggleTrainer}
      isClubMember={isClubMember}
      onToggleClubMembership={toggleClubMembership}
      showWelcomeScreen={showWelcomeScreen}
      onToggleWelcomeScreen={toggleWelcomeScreen}
    />
  );
}
