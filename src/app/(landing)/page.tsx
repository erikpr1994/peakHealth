"use client";

import React from "react";
import { useAppState } from "@/hooks/useAppState";
import LandingPage from "@/features/auth/LandingPage";
import AuthPage from "@/features/auth/AuthPage";
import { useRouter } from "next/navigation";
import { AppState } from "@/types/app";

export default function Page() {
  const { appState, handleGetStarted, handleAuthenticated } = useAppState();
  const router = useRouter();

  if (appState === "app") {
    router.push("/dashboard");
  }

  return (
    <AppContent
      appState={appState}
      handleGetStarted={handleGetStarted}
      handleAuthenticated={handleAuthenticated}
    />
  );
}

interface AppContentProps {
  appState: AppState;
  handleGetStarted: () => void;
  handleAuthenticated: () => void;
}

function AppContent({
  appState,
  handleGetStarted,
  handleAuthenticated,
}: AppContentProps) {
  // Landing page
  if (appState === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Auth page
  if (appState === "auth") {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return null;
}
