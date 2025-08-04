import { X, Play, Pause, Square, AlertTriangle, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

import ExerciseView from './ExerciseView';
import { RestType } from './RestTimer';
import RestView from './RestView';
import WorkoutSummary from './WorkoutSummary';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Page } from '@/types/app';

interface WorkoutTrackerProps {
  onNavigate: (page: Page) => void;
  routineId: string;
}

type WorkoutState =
  | 'exercise'
  | 'rest'
  | 'section-rest'
  | 'workout-rest'
  | 'paused'
  | 'completed';

interface SetData {
  id: string;
  exerciseId: string;
  setNumber: number;
  targetReps?: string;
  actualReps?: number;
  targetWeight?: string;
  actualWeight?: number;
  targetDuration?: string;
  actualDuration?: number;
  restTime: number; // in seconds
  notes?: string;
  completed: boolean;
  media?: Array<{
    id: string;
    type: 'photo' | 'video';
    url: string;
  }>;
}

interface WorkoutSection {
  id: string;
  name: string;
  type: 'warmup' | 'main' | 'cooldown';
  exercises: Exercise[];
  restTime: number; // rest time after this section
}

interface Exercise {
  id: string;
  name: string;
  instructions: string;
  muscleGroups: string[];
  sets: Array<{
    id: string;
    type: 'reps' | 'time';
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  restTimeAfter?: number; // rest time after this exercise
}

interface WorkoutData {
  id: string;
  name: string;
  sections: WorkoutSection[];
  restTimeAfter?: number; // rest time after this workout
}

interface WorkoutSession {
  routineId: string;
  routineName: string;
  startTime: Date;
  endTime?: Date;
  totalDuration: number; // in seconds
  workouts: WorkoutData[];
  currentWorkoutIndex: number;
  currentSectionIndex: number;
  currentExerciseIndex: number;
  currentSetIndex: number;
  setData: SetData[];
  workoutNotes: string;
  isPaused: boolean;
  pauseReason?: string;
  pauseStartTime?: Date;
  totalPauseTime: number; // in seconds
}

const WorkoutTracker = ({ onNavigate, routineId }: WorkoutTrackerProps) => {
  const [workoutState, setWorkoutState] = useState<WorkoutState>('exercise');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [restType, setRestType] = useState<RestType>('set');
  const [customRestTime, setCustomRestTime] = useState(60);

  // Mock workout session data - in real app, this would come from the routine
  // For trail running workouts, show a placeholder for now
  const isTrailRunning = routineId.includes('trail-running') || false; // In real app, check actual routine type

  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>({
    routineId,
    routineName: isTrailRunning ? 'Trail Running Adventure' : 'Full Body Split',
    startTime: new Date(),
    totalDuration: 0,
    workouts: isTrailRunning
      ? []
      : [
          {
            id: 'workout-1',
            name: 'Upper Body Workout',
            restTimeAfter: 300, // 5 minutes rest after workout
            sections: [
              {
                id: 'warmup',
                name: 'Warm-up',
                type: 'warmup',
                restTime: 120, // 2 minutes rest after warmup
                exercises: [
                  {
                    id: 'arm-circles',
                    name: 'Arm Circles',
                    instructions:
                      'Extend arms out to sides and make small circles, gradually increasing size.',
                    muscleGroups: ['Shoulders'],
                    sets: [
                      {
                        id: 'set1',
                        type: 'time',
                        duration: '30s',
                        restTime: '30',
                      },
                    ],
                    restTimeAfter: 60,
                  },
                ],
              },
              {
                id: 'main',
                name: 'Main Workout',
                type: 'main',
                restTime: 180, // 3 minutes rest after main workout
                exercises: [
                  {
                    id: 'bench-press',
                    name: 'Barbell Bench Press',
                    instructions:
                      'Lie on a flat bench with your eyes under the bar. Grip the bar with hands slightly wider than shoulder-width. Lower the bar to your chest, then press up to full arm extension.',
                    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
                    sets: [
                      {
                        id: 'set1',
                        type: 'reps',
                        reps: '10',
                        weight: 'Warm-up',
                        restTime: '60',
                      },
                      {
                        id: 'set2',
                        type: 'reps',
                        reps: '8',
                        weight: '135 lbs',
                        restTime: '90',
                      },
                      {
                        id: 'set3',
                        type: 'reps',
                        reps: '6',
                        weight: '155 lbs',
                        restTime: '90',
                      },
                      {
                        id: 'set4',
                        type: 'reps',
                        reps: '6',
                        weight: '155 lbs',
                        restTime: '90',
                      },
                    ],
                    restTimeAfter: 120,
                  },
                  {
                    id: 'bent-over-row',
                    name: 'Bent-Over Barbell Row',
                    instructions:
                      'Stand with feet hip-width apart, hinge at the hips to lean forward. Keep your back straight and pull the bar to your lower chest, squeezing your shoulder blades together.',
                    muscleGroups: ['Back', 'Biceps'],
                    sets: [
                      {
                        id: 'set1',
                        type: 'reps',
                        reps: '8',
                        weight: '115 lbs',
                        restTime: '90',
                      },
                      {
                        id: 'set2',
                        type: 'reps',
                        reps: '8',
                        weight: '125 lbs',
                        restTime: '90',
                      },
                      {
                        id: 'set3',
                        type: 'reps',
                        reps: '6',
                        weight: '135 lbs',
                        restTime: '90',
                      },
                    ],
                    restTimeAfter: 120,
                  },
                ],
              },
              {
                id: 'cooldown',
                name: 'Cool-down',
                type: 'cooldown',
                restTime: 0, // No rest after cooldown
                exercises: [
                  {
                    id: 'stretching',
                    name: 'Upper Body Stretching',
                    instructions:
                      'Perform gentle stretches for chest, shoulders, and back.',
                    muscleGroups: ['Full Body'],
                    sets: [
                      {
                        id: 'set1',
                        type: 'time',
                        duration: '5min',
                        restTime: '0',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
    currentWorkoutIndex: 0,
    currentSectionIndex: 0,
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    setData: [],
    workoutNotes: '',
    isPaused: false,
    totalPauseTime: 0,
  });

  // Timer for workout duration
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!workoutSession.isPaused && workoutState !== 'completed') {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed =
          Math.floor(
            (now.getTime() - workoutSession.startTime.getTime()) / 1000
          ) - workoutSession.totalPauseTime;
        setWorkoutDuration(elapsed);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    workoutSession.isPaused,
    workoutSession.startTime,
    workoutSession.totalPauseTime,
    workoutState,
  ]);

  const currentWorkout =
    workoutSession.workouts[workoutSession.currentWorkoutIndex];
  const currentSection =
    currentWorkout?.sections[workoutSession.currentSectionIndex];
  const currentExercise =
    currentSection?.exercises[workoutSession.currentExerciseIndex];
  const currentSet = currentExercise?.sets[workoutSession.currentSetIndex];

  // Handle trail running workouts
  if (isTrailRunning) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Trail Running Tracker</h2>
          <p className="text-gray-600 mb-6">
            Advanced trail running workout tracking with GPS, elevation, and
            interval management is coming soon!
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('routines')}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Back to Routines
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getTotalSets = () => {
    return workoutSession.workouts.reduce(
      (workoutAcc, workout) =>
        workoutAcc +
        workout.sections.reduce(
          (sectionAcc, section) =>
            sectionAcc +
            section.exercises.reduce(
              (exerciseAcc, exercise) => exerciseAcc + exercise.sets.length,
              0
            ),
          0
        ),
      0
    );
  };

  const totalSets = getTotalSets();
  const completedSets = workoutSession.setData.filter(
    set => set.completed
  ).length;
  const progressPercentage =
    totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseWorkout = () => {
    if (workoutSession.isPaused) {
      // Resume workout
      const pauseDuration = workoutSession.pauseStartTime
        ? Math.floor(
            (new Date().getTime() - workoutSession.pauseStartTime.getTime()) /
              1000
          )
        : 0;

      setWorkoutSession(prev => ({
        ...prev,
        isPaused: false,
        pauseStartTime: undefined,
        totalPauseTime: prev.totalPauseTime + pauseDuration,
      }));
      setWorkoutState('exercise');
    } else {
      // Pause workout
      setShowPauseDialog(true);
    }
  };

  const confirmPause = () => {
    setWorkoutSession(prev => ({
      ...prev,
      isPaused: true,
      pauseReason,
      pauseStartTime: new Date(),
    }));
    setWorkoutState('paused');
    setShowPauseDialog(false);
    setPauseReason('');
  };

  const handleEndWorkout = () => {
    setShowExitDialog(true);
  };

  const confirmEndWorkout = () => {
    setWorkoutSession(prev => ({
      ...prev,
      endTime: new Date(),
      totalDuration: workoutDuration,
    }));
    setWorkoutState('completed');
    setShowExitDialog(false);
  };

  const handleSetCompleted = (setData: Partial<SetData>) => {
    const newSetData: SetData = {
      id: `${currentExercise.id}-${workoutSession.currentSetIndex}`,
      exerciseId: currentExercise.id,
      setNumber: workoutSession.currentSetIndex + 1,
      targetReps: currentSet?.reps,
      targetWeight: currentSet?.weight,
      targetDuration: currentSet?.duration,
      restTime: parseInt(currentSet?.restTime || '60'),
      completed: true,
      ...setData,
    };

    setWorkoutSession(prev => ({
      ...prev,
      setData: [
        ...prev.setData.filter(s => s.id !== newSetData.id),
        newSetData,
      ],
    }));

    // Determine next state and what type of rest
    const hasMoreSets =
      workoutSession.currentSetIndex < currentExercise.sets.length - 1;
    const hasMoreExercises =
      workoutSession.currentExerciseIndex < currentSection.exercises.length - 1;
    const hasMoreSections =
      workoutSession.currentSectionIndex < currentWorkout.sections.length - 1;
    const hasMoreWorkouts =
      workoutSession.currentWorkoutIndex < workoutSession.workouts.length - 1;

    if (hasMoreSets) {
      // Rest between sets
      setWorkoutSession(prev => ({
        ...prev,
        currentSetIndex: prev.currentSetIndex + 1,
      }));
      setRestType('set');
      setCustomRestTime(parseInt(currentSet?.restTime || '60'));
      setWorkoutState('rest');
    } else if (hasMoreExercises) {
      // Rest between exercises
      setWorkoutSession(prev => ({
        ...prev,
        currentExerciseIndex: prev.currentExerciseIndex + 1,
        currentSetIndex: 0,
      }));
      setRestType('exercise');
      setCustomRestTime(currentExercise.restTimeAfter || 120);
      setWorkoutState('rest');
    } else if (hasMoreSections) {
      // Rest between sections
      setWorkoutSession(prev => ({
        ...prev,
        currentSectionIndex: prev.currentSectionIndex + 1,
        currentExerciseIndex: 0,
        currentSetIndex: 0,
      }));
      setRestType('section');
      setCustomRestTime(currentSection.restTime || 180);
      setWorkoutState('section-rest');
    } else if (hasMoreWorkouts) {
      // Rest between workouts
      setWorkoutSession(prev => ({
        ...prev,
        currentWorkoutIndex: prev.currentWorkoutIndex + 1,
        currentSectionIndex: 0,
        currentExerciseIndex: 0,
        currentSetIndex: 0,
      }));
      setRestType('workout');
      setCustomRestTime(currentWorkout.restTimeAfter || 300);
      setWorkoutState('workout-rest');
    } else {
      // Workout completed
      setWorkoutState('completed');
    }
  };

  const handleRestCompleted = () => {
    setWorkoutState('exercise');
  };

  const handleWorkoutCompleted = () => {
    // Save workout data and navigate back
    console.log('Workout completed:', workoutSession);
    onNavigate('routines');
  };

  if (workoutState === 'completed') {
    return (
      <WorkoutSummary
        workoutSession={workoutSession}
        onComplete={handleWorkoutCompleted}
        onNavigate={onNavigate}
      />
    );
  }

  const getRestTitle = () => {
    switch (restType) {
      case 'set':
        return 'Set Rest';
      case 'exercise':
        return 'Exercise Rest';
      case 'section':
        return `${currentSection?.name} Complete`;
      case 'workout':
        return `${currentWorkout?.name} Complete`;
      default:
        return 'Rest';
    }
  };

  const getRestSubtitle = () => {
    switch (restType) {
      case 'set':
        return 'Rest between sets';
      case 'exercise':
        return 'Rest between exercises';
      case 'section':
        return 'Rest between sections';
      case 'workout':
        return 'Rest between workouts';
      default:
        return '';
    }
  };

  const getNextExercise = () => {
    if (restType === 'set') {
      return currentExercise;
    } else if (restType === 'exercise') {
      return currentSection?.exercises[workoutSession.currentExerciseIndex];
    } else if (restType === 'section') {
      const nextSection =
        currentWorkout?.sections[workoutSession.currentSectionIndex];
      return nextSection?.exercises[0];
    } else if (restType === 'workout') {
      const nextWorkout =
        workoutSession.workouts[workoutSession.currentWorkoutIndex];
      return nextWorkout?.sections[0]?.exercises[0];
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEndWorkout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">End Workout</span>
            </Button>
            <div className="text-xs sm:text-sm text-gray-500 truncate">
              {workoutSession.routineName}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Progress - Mobile: Stack, Desktop: Side by side */}
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-500">Progress</div>
              <div className="font-semibold text-sm sm:text-base">
                {completedSets}/{totalSets}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-500">Duration</div>
              <div className="font-semibold text-sm sm:text-lg">
                {formatTime(workoutDuration)}
              </div>
            </div>

            {/* Pause/Resume Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePauseWorkout}
              className={
                workoutSession.isPaused
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : ''
              }
            >
              {workoutSession.isPaused ? (
                <>
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>
              {currentWorkout?.name} - {currentSection?.name} - Exercise{' '}
              {workoutSession.currentExerciseIndex + 1} of{' '}
              {currentSection?.exercises.length || 0}
            </span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {workoutState === 'paused' && (
          <div className="h-full flex items-center justify-center">
            <Card className="p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pause className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Workout Paused</h2>
              {workoutSession.pauseReason && (
                <p className="text-gray-600 mb-4">
                  Reason: {workoutSession.pauseReason}
                </p>
              )}
              <Button onClick={handlePauseWorkout} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Resume Workout
              </Button>
            </Card>
          </div>
        )}

        {workoutState === 'exercise' && currentExercise && currentSet && (
          <ExerciseView
            exercise={currentExercise}
            currentSet={currentSet}
            setNumber={workoutSession.currentSetIndex + 1}
            totalSets={currentExercise.sets.length}
            onSetCompleted={handleSetCompleted}
          />
        )}

        {(workoutState === 'rest' ||
          workoutState === 'section-rest' ||
          workoutState === 'workout-rest') && (
          <RestView
            setData={
              restType === 'set'
                ? workoutSession.setData.find(
                    s =>
                      s.id ===
                      `${currentExercise.id}-${
                        workoutSession.currentSetIndex - 1
                      }`
                  )
                : undefined
            }
            nextExercise={getNextExercise()}
            nextSetNumber={
              restType === 'set' ? workoutSession.currentSetIndex + 1 : 1
            }
            restTime={customRestTime}
            restType={restType}
            onRestCompleted={handleRestCompleted}
            customTitle={getRestTitle()}
            customSubtitle={getRestSubtitle()}
          />
        )}
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              End Workout?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to end this workout? Your progress will be
              saved, but you won&apos;t be able to resume this session.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmEndWorkout}
              variant="destructive"
              className="flex-1"
            >
              <Square className="w-4 h-4 mr-2" />
              End Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pause Dialog */}
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Workout</DialogTitle>
            <DialogDescription>
              Why are you pausing your workout? (Optional)
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="e.g., Quick break, phone call, equipment wait..."
            value={pauseReason}
            onChange={e => setPauseReason(e.target.value)}
            className="mt-4"
          />
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowPauseDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={confirmPause} className="flex-1">
              <Pause className="w-4 h-4 mr-2" />
              Pause Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutTracker;
