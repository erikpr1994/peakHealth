import React from "react";
import { Page, NavigateFunction, OnboardingData } from "@/types/app";
import Header from "./Header";
import AppRouter from "./AppRouter";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

interface MainAppProps {
  currentPage: Page;
  selectedItemId: string | null;
  onNavigate: NavigateFunction;
  hasTrainer: boolean;
  isClubMember: boolean;
  onboardingData: OnboardingData;
  onToggleTrainer: () => void;
  onToggleClubMembership: () => void;
}

export default function MainApp({
  currentPage,
  selectedItemId,
  onNavigate,
  hasTrainer,
  isClubMember,
  onboardingData,
  onToggleTrainer,
  onToggleClubMembership,
}: MainAppProps) {
  return (
    <NotificationsProvider hasTrainer={hasTrainer} isClubMember={isClubMember}>
      <div className="min-h-screen bg-background">
        <Header
          currentPage={currentPage}
          onNavigate={onNavigate}
          hasTrainer={hasTrainer}
          onToggleTrainer={onToggleTrainer}
          isClubMember={isClubMember}
          onToggleClubMembership={onToggleClubMembership}
        />
        <main>
          <AppRouter
            currentPage={currentPage}
            selectedItemId={selectedItemId}
            onNavigate={onNavigate}
            hasTrainer={hasTrainer}
            isClubMember={isClubMember}
            onboardingData={onboardingData}
          />
        </main>
      </div>
    </NotificationsProvider>
  );
}
