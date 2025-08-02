export class ExerciseErrorHandlers {
  /**
   * Handle database errors with consistent messaging
   */
  handleDatabaseError(error: unknown, operation: string): never {
    console.error(`Database error during ${operation}:`, error);

    // You can add more sophisticated error handling here
    // For example, logging to external services, retry logic, etc.

    throw new Error(`Failed to ${operation}`);
  }

  /**
   * Handle validation errors
   */
  handleValidationError(message: string): never {
    console.error('Validation error:', message);
    throw new Error(`Validation failed: ${message}`);
  }

  /**
   * Handle not found errors
   */
  handleNotFoundError(resource: string, id?: string): never {
    const message = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    throw new Error(message);
  }

  /**
   * Handle permission errors
   */
  handlePermissionError(operation: string): never {
    console.error(`Permission denied for operation: ${operation}`);
    throw new Error(`You don't have permission to ${operation}`);
  }
}

// Export a singleton instance
export const exerciseErrorHandlers = new ExerciseErrorHandlers();
