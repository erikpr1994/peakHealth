"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  hasTrainer: boolean;
  isClubMember: boolean;
  showWelcomeScreen: boolean;
  toggleTrainer: () => void;
  toggleClubMembership: () => void;
  toggleWelcomeScreen: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [hasTrainer, setHasTrainer] = useState(false);
  const [isClubMember, setIsClubMember] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const toggleTrainer = () => {
    setHasTrainer((prev) => !prev);
  };

  const toggleClubMembership = () => {
    setIsClubMember((prev) => !prev);
  };

  const toggleWelcomeScreen = () => {
    setShowWelcomeScreen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        hasTrainer,
        isClubMember,
        showWelcomeScreen,
        toggleTrainer,
        toggleClubMembership,
        toggleWelcomeScreen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
