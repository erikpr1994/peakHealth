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
    const bytes = crypto.randomBytes(Math.ceil(length * 0.75)); // base36: log2(36) ≈ 5.17 bits/char, so 6 bits/char is safe
    const randomPart = bytes.toString('base36').slice(0, length);
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
      difficulty: 'beginner',
      type: 'strength',
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
