"use client";

import AppSettings from "@/features/settings/AppSettings";
import { useAppContext } from "@/contexts/AppContext";

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
