/**
 * Utility functions for handling time formatting in the routines feature
 */

/**
 * Converts seconds to a display string
 * If seconds >= 60, shows as minutes (e.g., "2:30" for 150 seconds)
 * If seconds < 60, shows as seconds (e.g., "45s" for 45 seconds)
 */
export const formatTimeDisplay = (seconds: number): string => {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}s`;
};

/**
 * Converts a display string back to seconds
 * Handles formats like "2:30", "45s", "1:05", etc.
 */
export const parseTimeDisplay = (display: string): number => {
  if (!display || display.trim() === '') return 0;

  const trimmed = display.trim();

  // Handle "X:YY" format (minutes:seconds)
  if (trimmed.includes(':')) {
    const [minutes, seconds] = trimmed.split(':').map(Number);
    return minutes * 60 + (seconds || 0);
  }

  // Handle "Xs" format (seconds)
  if (trimmed.endsWith('s')) {
    return parseInt(trimmed.slice(0, -1)) || 0;
  }

  // Handle plain number (assume seconds)
  return parseInt(trimmed) || 0;
};

/**
 * Validates if a time display string is valid
 */
export const isValidTimeDisplay = (display: string): boolean => {
  if (!display || display.trim() === '') return true; // Allow empty

  const trimmed = display.trim();

  // Handle "X:YY" format
  if (trimmed.includes(':')) {
    const parts = trimmed.split(':');
    if (parts.length !== 2) return false;

    const [minutes, seconds] = parts.map(Number);
    return (
      !isNaN(minutes) &&
      !isNaN(seconds) &&
      minutes >= 0 &&
      seconds >= 0 &&
      seconds < 60
    );
  }

  // Handle "Xs" format
  if (trimmed.endsWith('s')) {
    const seconds = parseInt(trimmed.slice(0, -1));
    return !isNaN(seconds) && seconds >= 0;
  }

  // Handle plain number
  const seconds = parseInt(trimmed);
  return !isNaN(seconds) && seconds >= 0;
};
