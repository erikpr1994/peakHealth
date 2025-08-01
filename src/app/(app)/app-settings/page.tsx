"use client";

import { useAppContext } from "@/contexts/AppContext";
import AppSettings from "@/features/settings/AppSettings";

export default function AppSettingsPage() {
  const {
    hasTrainer,
    toggleTrainer,
    isClubMember,
    toggleClubMembership,
    showWelcomeScreen,
    toggleWelcomeScreen,
  } = useAppContext();

  return (
    <AppSettings
      hasTrainer={hasTrainer}
      onToggleTrainer={toggleTrainer}
      isClubMember={isClubMember}
      onToggleClubMembership={toggleClubMembership}
      showWelcomeScreen={showWelcomeScreen}
      onToggleWelcomeScreen={toggleWelcomeScreen}
    />
  );
}
