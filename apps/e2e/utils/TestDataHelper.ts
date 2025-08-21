import * as crypto from 'crypto';
/**
 * Helper class for generating and managing test data
 */
export class TestDataHelper {
  /**
   * Generate a random string with a prefix
   * @param prefix - The prefix for the string
   * @param length - The length of the random part
   * @returns A random string with the prefix
   */
  static generateRandomString(prefix: string, length: number = 8): string {
    // Use crypto.randomBytes for cryptographically secure random values
    // Generate enough bytes to ensure we get the desired length
    // Each base36 character represents ~5.17 bits, so we need more bytes
    // Limit to 6 bytes max for readUIntBE compatibility
    const maxBytes = Math.min(6, Math.ceil(length * 0.75));
    const bytes = crypto.randomBytes(maxBytes);

    // Convert bytes to a number, then to base36 string
    const number = bytes.readUIntBE(0, bytes.length);
    const randomPart = number.toString(36).toLowerCase().slice(0, length);

    return `${prefix}-${randomPart}`;
  }

  /**
   * Generate test data for a routine
   * @returns Test data for a routine
   */
  static generateRoutineData() {
    const routineName = this.generateRandomString('Routine');

    return {
      name: routineName,
      description: `Description for ${routineName}`,
      difficulty: 'Beginner',
      type: 'Strength',
      goals: ['Build strength', 'Improve endurance'],
      workout: {
        name: `Workout for ${routineName}`,
        objective: 'Build upper body strength',
        section: {
          name: 'Chest and Triceps',
          exercise: {
            name: 'Bench Press',
            sets: [
              { reps: '10', weight: '100' },
              { reps: '8', weight: '110' },
            ],
          },
        },
      },
    };
  }

  /**
   * Generate test data for a user
   * @returns Test data for a user
   */
  static generateUserData() {
    const userId = this.generateRandomString('user');

    return {
      email: `${userId}@example.com`,
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'User',
      username: userId,
    };
  }

  /**
   * Generate test data for a trainer
   * @returns Test data for a trainer
   */
  static generateTrainerData() {
    const trainerId = this.generateRandomString('trainer');

    return {
      email: `${trainerId}@example.com`,
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'Trainer',
      username: trainerId,
      specialization: 'Strength Training',
      experience: '5 years',
    };
  }

  /**
   * Generate test data for an admin
   * @returns Test data for an admin
   */
  static generateAdminData() {
    const adminId = this.generateRandomString('admin');

    return {
      email: `${adminId}@example.com`,
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'Admin',
      username: adminId,
    };
  }
}
