import {
  Routine,
  RoutineData,
  StrengthWorkout,
  RunningWorkout,
  WorkoutDay,
} from './index';

describe('Routine Types', () => {
  describe('Routine', () => {
    it('should have correct structure', () => {
      const mockWorkoutDays: WorkoutDay[] = [
        {
          id: 'day-1',
          name: 'Monday',
          exercises: [],
          estimatedTime: '45 min',
          difficulty: 'Beginner',
        },
        {
          id: 'day-2',
          name: 'Wednesday',
          exercises: [],
          estimatedTime: '45 min',
          difficulty: 'Beginner',
        },
      ];

      const routine: Routine = {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Beginner',
        goal: 'Strength',
        isActive: true,
        isFavorite: false,
        progress: {
          current: 5,
          total: 12,
        },
        objectives: ['Build strength'],
        totalWorkouts: 12,
        completedWorkouts: 5,
        estimatedDuration: '45-60 min',
        workoutDays: mockWorkoutDays,
      };

      expect(routine.id).toBe('routine-1');
      expect(routine.name).toBe('Test Routine');
      expect(routine.difficulty).toBe('Beginner');
      expect(routine.goal).toBe('Strength');
      expect(routine.isActive).toBe(true);
      expect(routine.isFavorite).toBe(false);
      expect(routine.progress.current).toBe(5);
      expect(routine.progress.total).toBe(12);
      expect(routine.objectives).toEqual(['Build strength']);
      expect(routine.totalWorkouts).toBe(12);
      expect(routine.completedWorkouts).toBe(5);
      expect(routine.estimatedDuration).toBe('45-60 min');
      expect(routine.workoutDays).toEqual(mockWorkoutDays);
    });
  });

  describe('RoutineData', () => {
    it('should have correct structure', () => {
      const mockWorkoutDays: WorkoutDay[] = [
        {
          id: 'day-1',
          name: 'Monday',
          exercises: [],
          estimatedTime: '45 min',
          difficulty: 'Beginner',
        },
        {
          id: 'day-2',
          name: 'Wednesday',
          exercises: [],
          estimatedTime: '45 min',
          difficulty: 'Beginner',
        },
      ];

      const routineData: RoutineData = {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        duration: 12,
        difficulty: 'Beginner',
        goal: 'Strength',
        isActive: true,
        isFavorite: false,
        objectives: ['Build strength'],
        progress: {
          currentWeek: 3,
          totalWeeks: 12,
          completedWorkouts: 8,
          totalWorkouts: 24,
        },
        workoutDays: mockWorkoutDays,
        createdDate: '2024-01-01',
        lastModified: '2024-01-01',
      };

      expect(routineData.id).toBe('routine-1');
      expect(routineData.name).toBe('Test Routine');
      expect(routineData.duration).toBe(12);
      expect(routineData.difficulty).toBe('Beginner');
      expect(routineData.goal).toBe('Strength');
      expect(routineData.isActive).toBe(true);
      expect(routineData.isFavorite).toBe(false);
      expect(routineData.objectives).toEqual(['Build strength']);
      expect(routineData.progress.currentWeek).toBe(3);
      expect(routineData.progress.totalWeeks).toBe(12);
      expect(routineData.progress.completedWorkouts).toBe(8);
      expect(routineData.progress.totalWorkouts).toBe(24);
      expect(routineData.workoutDays).toEqual(mockWorkoutDays);
      expect(routineData.createdDate).toBe('2024-01-01');
      expect(routineData.lastModified).toBe('2024-01-01');
    });
  });

  describe('StrengthWorkout', () => {
    it('should have correct structure', () => {
      const strengthWorkout: StrengthWorkout = {
        id: 'workout-1',
        name: 'Upper Body',
        type: 'strength',
        objective: 'Build upper body strength',
        schedule: {
          repeatPattern: 'weekdays',
          repeatValue: '',
          selectedDays: ['Monday', 'Wednesday'],
          time: 'Morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Chest and Triceps',
            type: 'basic',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Bench Press',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    setType: 'normal',
                    repType: 'fixed',
                    reps: 10,
                    weight: 100,
                    rpe: null,
                    notes: '',
                  },
                ],
                restTimer: '90s',
                restAfter: '120s',
                notes: '',
                progressionMethod: 'linear',
              },
            ],
            restAfter: '180s',
          },
        ],
      };

      expect(strengthWorkout.id).toBe('workout-1');
      expect(strengthWorkout.name).toBe('Upper Body');
      expect(strengthWorkout.objective).toBe('Build upper body strength');
      expect(strengthWorkout.schedule.selectedDays).toEqual([
        'Monday',
        'Wednesday',
      ]);
      expect(strengthWorkout.schedule.time).toBe('Morning');
      expect(strengthWorkout.sections).toHaveLength(1);
      expect(strengthWorkout.sections[0].name).toBe('Chest and Triceps');
      expect(strengthWorkout.sections[0].type).toBe('basic');
    });
  });

  describe('RunningWorkout', () => {
    it('should have correct structure', () => {
      const runningWorkout: RunningWorkout = {
        id: 'workout-1',
        name: 'Cardio Session',
        type: 'running',
        objective: 'Improve endurance',
        schedule: {
          repeatPattern: 'weekdays',
          repeatValue: '',
          selectedDays: ['Tuesday', 'Thursday'],
          time: 'Evening',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Warm Up',
            type: 'warmup',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Light Jog',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    setType: 'normal',
                    repType: 'fixed',
                    reps: null,
                    weight: null,
                    rpe: null,
                    notes: '',
                  },
                ],
                restTimer: '60s',
                restAfter: '120s',
                notes: '',
                progressionMethod: 'linear',
              },
            ],
            restAfter: '180s',
          },
        ],
      };

      expect(runningWorkout.id).toBe('workout-1');
      expect(runningWorkout.name).toBe('Cardio Session');
      expect(runningWorkout.objective).toBe('Improve endurance');
      expect(runningWorkout.schedule.selectedDays).toEqual([
        'Tuesday',
        'Thursday',
      ]);
      expect(runningWorkout.schedule.time).toBe('Evening');
      expect(runningWorkout.sections).toHaveLength(1);
      expect(runningWorkout.sections[0].name).toBe('Warm Up');
      expect(runningWorkout.sections[0].type).toBe('warmup');
    });
  });
});
