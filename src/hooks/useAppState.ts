import { useState, useEffect } from 'react';
import { AppState } from '../types/app';

export function useAppState() {
  const [appState, setAppState] = useState<AppState>('landing');

  // Check for existing authentication on startup
  useEffect(() => {
    const user = localStorage.getItem('peak-health-user');
    if (user) {
      setAppState('app');
    }
  }, []);

  const handleGetStarted = () => {
    setAppState('auth');
  };

  const handleAuthenticated = () => {
    setAppState('app');
  };

  return {
    appState,
    handleGetStarted,
    handleAuthenticated
  };
}