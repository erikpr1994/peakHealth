import { describe, it, expect } from 'vitest';
import type {
  BaseEntity,
  User,
  Exercise,
  Section,
  Routine,
  WorkoutSession,
  ApiResponse,
  PaginatedResponse,
  ApiError,
} from './routine.js';

describe('Routine Types', () => {
  it('should have BaseEntity type defined', () => {
    const entity: BaseEntity = {
      id: 'test-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(entity.id).toBe('test-id');
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should have User type defined', () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      role: 'user',
    };
    expect(user.id).toBe('user-123');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
  });

  it('should have Exercise type defined', () => {
    const exercise: Exercise = {
      id: 'exercise-123',
      name: 'Push-up',
      description: 'A basic push-up exercise',
      category: 'strength',
      equipment: [],
      muscleGroups: ['chest', 'arms'],
      instructions: ['Start in plank position', 'Lower your body'],
    };
    expect(exercise.id).toBe('exercise-123');
    expect(exercise.name).toBe('Push-up');
    expect(exercise.category).toBe('strength');
  });

  it('should have Section type defined', () => {
    const section: Section = {
      id: 'section-123',
      name: 'Warm-up',
      exercises: [],
    };
    expect(section.id).toBe('section-123');
    expect(section.name).toBe('Warm-up');
    expect(Array.isArray(section.exercises)).toBe(true);
  });

  it('should have Routine type defined', () => {
    const routine: Routine = {
      id: 'routine-123',
      name: 'Morning Workout',
      description: 'A quick morning routine',
      difficulty: 'beginner',
      sections: [],
      createdBy: 'user-123',
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(routine.id).toBe('routine-123');
    expect(routine.name).toBe('Morning Workout');
    expect(routine.difficulty).toBe('beginner');
  });

  it('should have WorkoutSession type defined', () => {
    const session: WorkoutSession = {
      id: 'session-123',
      routineId: 'routine-123',
      userId: 'user-123',
      startedAt: new Date(),
      completedAt: new Date(),
      exercises: [],
    };
    expect(session.id).toBe('session-123');
    expect(session.routineId).toBe('routine-123');
    expect(session.userId).toBe('user-123');
  });

  it('should have ApiResponse type defined', () => {
    const response: ApiResponse<string> = {
      data: 'test data',
      message: 'Success',
      success: true,
      service: 'routines-service',
    };
    expect(response.data).toBe('test data');
    expect(response.success).toBe(true);
    expect(response.service).toBe('routines-service');
  });

  it('should have PaginatedResponse type defined', () => {
    const paginated: PaginatedResponse<string> = {
      data: ['item1', 'item2'],
      pagination: {
        page: 1,
        pageSize: 10,
        totalCount: 2,
        totalPages: 1,
      },
      service: 'routines-service',
    };
    expect(paginated.data).toEqual(['item1', 'item2']);
    expect(paginated.pagination.page).toBe(1);
    expect(paginated.pagination.totalCount).toBe(2);
  });

  it('should have ApiError type defined', () => {
    const error: ApiError = {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input',
      details: { field: 'name' },
      service: 'routines-service',
    };
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.message).toBe('Invalid input');
    expect(error.service).toBe('routines-service');
  });
});
