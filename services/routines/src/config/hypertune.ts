import { Hypertune } from 'hypertune';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the targeting attributes interface
export interface TargetingAttributes {
  userId?: string;
  userRole?: string;
  environment?: string;
}

// Initialize Hypertune with API key from environment variables
const apiKey = process.env.HYPERTUNE_API_KEY;

if (!apiKey) {
  console.warn(
    'HYPERTUNE_API_KEY is not set. Feature flags will use fallback values.'
  );
}

// Create and export the Hypertune instance
export const hypertune = new Hypertune({
  apiKey,
  // Optional: Set environment for targeting
  environment: process.env.NODE_ENV || 'development',
});

// Initialize Hypertune
export const initializeHypertune = async (): Promise<void> => {
  try {
    await hypertune.initialize();
    console.log('Hypertune initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Hypertune:', error);
  }
};

// Helper function to evaluate a feature flag with targeting attributes
export const evaluateFlag = <T>(
  flagName: string,
  attributes: TargetingAttributes,
  fallback: T
): T => {
  try {
    // This is a simplified implementation since we don't have the auto-generated client yet
    // In a real implementation, you would use the auto-generated client for type safety
    return hypertune.evaluate(flagName, attributes, fallback);
  } catch (error) {
    console.error(`Error evaluating flag ${flagName}:`, error);
    return fallback;
  }
};

// Shutdown function to clean up Hypertune when the application exits
export const shutdownHypertune = async (): Promise<void> => {
  try {
    await hypertune.shutdown();
    console.log('Hypertune shut down successfully');
  } catch (error) {
    console.error('Error shutting down Hypertune:', error);
  }
};
