import React from "react";
import { useAppState } from "@/hooks/useAppState";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useTrainerAndClub } from "@/hooks/useTrainerAndClub";
import { MOCK_ONBOARDING_DATA } from "@/constants/mockData";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  const { appState, handleGetStarted, handleAuthenticated } = useAppState();
  const { currentPage, selectedItemId, handleNavigate } = useAppNavigation();
  const {
    hasTrainer,
    isClubMember,
    handleToggleTrainer,
    handleToggleClubMembership,
  } = useTrainerAndClub();

  return (
    <AuthProvider>
      <AppContent
        appState={appState}
        handleGetStarted={handleGetStarted}
        handleAuthenticated={handleAuthenticated}
        currentPage={currentPage}
        selectedItemId={selectedItemId}
        handleNavigate={handleNavigate}
        hasTrainer={hasTrainer}
        isClubMember={isClubMember}
        handleToggleTrainer={handleToggleTrainer}
        handleToggleClubMembership={handleToggleClubMembership}
        MOCK_ONBOARDING_DATA={MOCK_ONBOARDING_DATA}
      />
    </AuthProvider>
  );
}

function AppContent({
  appState,
  handleGetStarted,
  handleAuthenticated,
  currentPage,
  selectedItemId,
  handleNavigate,
  hasTrainer,
  isClubMember,
  handleToggleTrainer,
  handleToggleClubMembership,
  MOCK_ONBOARDING_DATA,
}) {
  // Landing page
  if (appState === "landing") {
    const LandingPage = React.lazy(() => import("@/features/auth/LandingPage"));
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <LandingPage onGetStarted={handleGetStarted} />
      </React.Suspense>
    );
  }

  // Auth page
  if (appState === "auth") {
    const AuthPage = React.lazy(() => import("@/features/auth/AuthPage"));
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <AuthPage onAuthenticated={handleAuthenticated} />
      </React.Suspense>
    );
  }

  // Main app
  const MainApp = React.lazy(() => import("@/app/MainApp"));
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <MainApp
        currentPage={currentPage}
        selectedItemId={selectedItemId}
        onNavigate={handleNavigate}
        hasTrainer={hasTrainer}
        isClubMember={isClubMember}
        onboardingData={MOCK_ONBOARDING_DATA}
        onToggleTrainer={handleToggleTrainer}
        onToggleClubMembership={handleToggleClubMembership}
      />
    </React.Suspense>
  );
}
