import { describe, it, expect, vi, beforeEach } from 'vitest';

import { exerciseErrorHandlers } from '../errorHandlers';

describe('ExerciseErrorHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });



  describe('handleDatabaseError', () => {
    it('should log error and throw formatted error message', () => {
      const error = new Error('Database connection failed');
      const operation = 'fetch exercises';

      expect(() => {
        exerciseErrorHandlers.handleDatabaseError(error, operation);
      }).toThrow('Failed to fetch exercises');

      expect(console.error).toHaveBeenCalledWith(
        'Database error during fetch exercises:',
        error
      );
    });

    it('should handle different operation types', () => {
      const error = new Error('Insert failed');
      const operation = 'add to favorites';

      expect(() => {
        exerciseErrorHandlers.handleDatabaseError(error, operation);
      }).toThrow('Failed to add to favorites');

      expect(console.error).toHaveBeenCalledWith(
        'Database error during add to favorites:',
        error
      );
    });

    it('should handle unknown error types', () => {
      const error = 'String error';
      const operation = 'search exercises';

      expect(() => {
        exerciseErrorHandlers.handleDatabaseError(error, operation);
      }).toThrow('Failed to search exercises');

      expect(console.error).toHaveBeenCalledWith(
        'Database error during search exercises:',
        error
      );
    });
  });

  describe('handleValidationError', () => {
    it('should log error and throw formatted validation error message', () => {
      const message = 'Invalid exercise ID';

      expect(() => {
        exerciseErrorHandlers.handleValidationError(message);
      }).toThrow('Validation failed: Invalid exercise ID');

      expect(console.error).toHaveBeenCalledWith('Validation error:', message);
    });

    it('should handle different validation messages', () => {
      const message = 'User ID is required';

      expect(() => {
        exerciseErrorHandlers.handleValidationError(message);
      }).toThrow('Validation failed: User ID is required');

      expect(console.error).toHaveBeenCalledWith('Validation error:', message);
    });
  });

  describe('handleNotFoundError', () => {
    it('should throw error message with resource name only', () => {
      const resource = 'Exercise';

      expect(() => {
        exerciseErrorHandlers.handleNotFoundError(resource);
      }).toThrow('Exercise not found');
    });

    it('should throw error message with resource name and ID', () => {
      const resource = 'Exercise';
      const id = '123';

      expect(() => {
        exerciseErrorHandlers.handleNotFoundError(resource, id);
      }).toThrow('Exercise with ID 123 not found');
    });

    it('should handle different resource types', () => {
      const resource = 'User';
      const id = 'user-456';

      expect(() => {
        exerciseErrorHandlers.handleNotFoundError(resource, id);
      }).toThrow('User with ID user-456 not found');
    });
  });

  describe('handlePermissionError', () => {
    it('should log error and throw formatted permission error message', () => {
      const operation = 'delete exercise';

      expect(() => {
        exerciseErrorHandlers.handlePermissionError(operation);
      }).toThrow("You don't have permission to delete exercise");

      expect(console.error).toHaveBeenCalledWith(
        'Permission denied for operation: delete exercise'
      );
    });

    it('should handle different operation types', () => {
      const operation = 'modify user settings';

      expect(() => {
        exerciseErrorHandlers.handlePermissionError(operation);
      }).toThrow("You don't have permission to modify user settings");

      expect(console.error).toHaveBeenCalledWith(
        'Permission denied for operation: modify user settings'
      );
    });
  });
});
