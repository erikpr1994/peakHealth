import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { Types } from 'mongoose';
import { db } from '../utils/database';
import {
  RoutineAssignmentModel,
  RoutineAssignmentDocument,
} from './RoutineAssignment';

describe('RoutineAssignment Model', () => {
  beforeAll(async () => {
    await db.connect({
      uri: 'mongodb://localhost:27017/routines-v2-test',
    });
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clean up test data
    await RoutineAssignmentModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await RoutineAssignmentModel.deleteMany({});
  });

  describe('Basic CRUD Operations', () => {
    it('should create a routine assignment with required fields', async () => {
      const assignmentData = {
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        trainerId: new Types.ObjectId(),
      };

      const assignment = new RoutineAssignmentModel(assignmentData);
      await assignment.save();

      expect(assignment.routineVersionId.toString()).toBe(
        assignmentData.routineVersionId.toString()
      );
      expect(assignment.parentRoutineId.toString()).toBe(
        assignmentData.parentRoutineId.toString()
      );
      expect(assignment.userId.toString()).toBe(
        assignmentData.userId.toString()
      );
      expect(assignment.trainerId?.toString()).toBe(
        assignmentData.trainerId.toString()
      );
      expect(assignment.status).toBe('active');
      expect(assignment.assignedAt).toBeInstanceOf(Date);
      expect(assignment.progress.completedWorkouts).toBe(0);
      expect(assignment.progress.totalWorkouts).toBe(0);
    });

    it('should validate required fields', async () => {
      const assignment = new RoutineAssignmentModel({});

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.routineVersionId).toBeDefined();
      expect(error.errors.parentRoutineId).toBeDefined();
      expect(error.errors.userId).toBeDefined();
    });

    it('should validate status enum values', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        status: 'invalid' as any,
      });

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.status.message).toContain(
        'must be active, completed, paused, or cancelled'
      );
    });
  });

  describe('Date Validations', () => {
    it('should validate start date is not in the past', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        startDate: yesterday,
      });

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.startDate.message).toContain('cannot be in the past');
    });

    it('should allow start date to be today or future', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        startDate: tomorrow,
      });

      await assignment.save();
      expect(assignment.startDate).toEqual(tomorrow);
    });

    it('should validate end date is after start date', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        startDate: dayAfterTomorrow, // Later date
        endDate: tomorrow, // Earlier date
      });

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.endDate.message).toContain(
        'must be after start date'
      );
    });
  });

  describe('Progress Tracking', () => {
    it('should validate progress values', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: -1, // Invalid
          totalWorkouts: 10,
        },
      });

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors['progress.completedWorkouts'].message).toContain(
        'cannot be negative'
      );
    });

    it('should prevent completed workouts from exceeding total', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: 15,
          totalWorkouts: 10,
        },
      });

      let error: any;
      try {
        await assignment.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.message).toContain('cannot exceed total workouts');
    });

    it('should auto-complete when all workouts are done', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        status: 'active',
        progress: {
          completedWorkouts: 10,
          totalWorkouts: 10,
        },
      });

      await assignment.save();
      expect(assignment.status).toBe('completed');
    });
  });

  describe('Virtual Properties', () => {
    it('should calculate completion percentage correctly', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: 7,
          totalWorkouts: 10,
        },
      });

      await assignment.save();
      expect(assignment.completionPercentage).toBe(70);
    });

    it('should return 0% when no total workouts', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: 5,
          totalWorkouts: 0,
        },
      });

      await assignment.save();
      expect(assignment.completionPercentage).toBe(0);
    });

    it('should calculate days since assignment', async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        assignedAt: threeDaysAgo,
      });

      await assignment.save();
      expect(assignment.daysSinceAssignment).toBe(3);
    });

    it('should identify overdue assignments', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        status: 'active',
        endDate: yesterday,
      });

      await assignment.save();
      expect(assignment.isOverdue).toBe(true);
    });

    it('should not mark completed assignments as overdue', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        status: 'completed',
        endDate: yesterday,
      });

      await assignment.save();
      expect(assignment.isOverdue).toBe(false);
    });
  });

  describe('Instance Methods', () => {
    let assignment: RoutineAssignmentDocument;

    beforeEach(async () => {
      assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: 5,
          totalWorkouts: 10,
        },
      });
      await assignment.save();
    });

    it('should update progress correctly', async () => {
      await assignment.updateProgress(7, 12, 'Great progress!');

      expect(assignment.progress.completedWorkouts).toBe(7);
      expect(assignment.progress.totalWorkouts).toBe(12);
      expect(assignment.progress.feedback).toBe('Great progress!');
      expect(assignment.progress.lastWorkoutDate).toBeInstanceOf(Date);
    });

    it('should mark assignment as complete', async () => {
      await assignment.markComplete('Excellent work!');

      expect(assignment.status).toBe('completed');
      expect(assignment.progress.feedback).toBe('Excellent work!');
    });

    it('should pause active assignment', async () => {
      assignment.status = 'active';
      await assignment.save();

      await assignment.pause();
      expect(assignment.status).toBe('paused');
    });

    it('should not pause non-active assignment', async () => {
      assignment.status = 'completed';
      await assignment.save();

      let error: any;
      try {
        await assignment.pause();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.message).toContain('Can only pause active assignments');
    });

    it('should resume paused assignment', async () => {
      assignment.status = 'paused';
      await assignment.save();

      await assignment.resume();
      expect(assignment.status).toBe('active');
    });

    it('should not resume non-paused assignment', async () => {
      assignment.status = 'active';
      await assignment.save();

      let error: any;
      try {
        await assignment.resume();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.message).toContain('Can only resume paused assignments');
    });
  });

  describe('Static Methods', () => {
    let userId: Types.ObjectId;
    let trainerId: Types.ObjectId;

    beforeEach(async () => {
      userId = new Types.ObjectId();
      trainerId = new Types.ObjectId();

      // Create test assignments
      const assignments = [
        {
          routineVersionId: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          userId,
          trainerId,
          status: 'active' as const,
          startDate: new Date(),
        },
        {
          routineVersionId: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          userId,
          status: 'completed' as const,
        },
        {
          routineVersionId: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          userId: new Types.ObjectId(), // Different user
          trainerId,
          status: 'active' as const,
        },
      ];

      await RoutineAssignmentModel.insertMany(assignments);
    });

    it('should find active assignments by user', async () => {
      const activeAssignments =
        await RoutineAssignmentModel.findActiveByUser(userId);

      expect(activeAssignments).toHaveLength(1);
      expect(activeAssignments[0].userId.toString()).toBe(userId.toString());
      expect(activeAssignments[0].status).toBe('active');
    });

    it('should find assignments by trainer', async () => {
      const trainerAssignments =
        await RoutineAssignmentModel.findByTrainer(trainerId);

      expect(trainerAssignments).toHaveLength(2);
      trainerAssignments.forEach(assignment => {
        expect(assignment.trainerId?.toString()).toBe(trainerId.toString());
      });
    });

    it('should find assignments by trainer with status filter', async () => {
      const activeTrainerAssignments =
        await RoutineAssignmentModel.findByTrainer(trainerId, 'active');

      expect(activeTrainerAssignments).toHaveLength(2);
      activeTrainerAssignments.forEach(assignment => {
        expect(assignment.trainerId?.toString()).toBe(trainerId.toString());
        expect(assignment.status).toBe('active');
      });
    });

    it('should find overdue assignments', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Create an overdue assignment
      await RoutineAssignmentModel.create({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        status: 'active',
        endDate: yesterday,
      });

      const overdueAssignments = await RoutineAssignmentModel.findOverdue();

      expect(overdueAssignments).toHaveLength(1);
      expect(overdueAssignments[0].isOverdue).toBe(true);
    });
  });

  describe('JSON Transformation', () => {
    it('should transform ObjectIds to strings in JSON', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        trainerId: new Types.ObjectId(),
        progress: {
          lastWorkoutDate: new Date(),
        },
      });

      await assignment.save();
      const json = assignment.toJSON();

      expect(typeof json._id).toBe('string');
      expect(typeof json.routineVersionId).toBe('string');
      expect(typeof json.parentRoutineId).toBe('string');
      expect(typeof json.userId).toBe('string');
      expect(typeof json.trainerId).toBe('string');
      expect(typeof json.assignedAt).toBe('string');
      expect(typeof json.createdAt).toBe('string');
      expect(typeof json.updatedAt).toBe('string');
      expect(typeof json.progress.lastWorkoutDate).toBe('string');
    });

    it('should include virtual properties in JSON', async () => {
      const assignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        progress: {
          completedWorkouts: 3,
          totalWorkouts: 10,
        },
      });

      await assignment.save();
      const json = assignment.toJSON();

      expect(json.completionPercentage).toBe(30);
      expect(typeof json.daysSinceAssignment).toBe('number');
      expect(typeof json.isOverdue).toBe('boolean');
    });
  });
});
