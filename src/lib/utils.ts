import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely converts a date string to a Date object
 * @param dateString - The date string to convert
 * @returns Date object if valid, undefined if invalid or null/undefined
 */
export function safeDateConversion(dateString: unknown): Date | undefined {
  if (!dateString || typeof dateString !== 'string') {
    return undefined;
  }

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
}
