'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Timer,
  Repeat,
  TrendingUp,
  History,
  Target,
} from 'lucide-react';
import { RestTimer } from '@/features/workout-tracking/rest-timer';
import { WorkoutReview } from '@/features/workout-tracking/workout-review';
import { ProgressionMethodInfo } from '@/features/workout-tracking/progression-method-info';
import { ExerciseInstructions } from '@/features/workout-tracking/exercise-instructions'; // Added import for ExerciseInstructions
import { SectionTransition } from '@/features/workout-tracking/section-transition';
import type {
  WorkoutRoutine,
  CompletedSet,
  SectionType,
} from '@/features/workout-tracking/workout';

const mockRoutine: WorkoutRoutine = {
  id: '1',
  name: 'Upper Body Strength',
  estimatedTime: 45,
  totalExercises: 8,
  sections: [
    {
      id: 'warmup-1',
      name: 'Dynamic Warm-up',
      type: 'warm-up',
      exercises: [
        {
          id: '1',
          name: 'Arm Circles',
          sets: 2,
          reps: '10 each direction',
          weight: 'Bodyweight',
          rpe: 3,
          restTime: 30,
          progressionMethod: 'linear',
          setTypes: ['warm-up'],
          muscleGroups: ['Shoulders'],
          instructions:
            'Make large circles with your arms, forward and backward.',
          isUnilateral: true,
          unilateralMode: 'alternating',
          equipmentType: 'bodyweight',
        },
        {
          id: '2',
          name: 'Band Pull-aparts',
          sets: 2,
          reps: '15',
          weight: 'Light band',
          rpe: 4,
          restTime: 30,
          progressionMethod: 'linear',
          setTypes: ['warm-up'],
          muscleGroups: ['Rear Delts', 'Rhomboids'],
          instructions:
            'Pull the band apart at chest level, squeezing your shoulder blades.',
          equipmentType: 'band',
          bandType: 'light',
        },
      ],
    },
    {
      id: 'main-1',
      name: 'Main Strength Work',
      type: 'basic',
      exercises: [
        {
          id: '3',
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          weight: '80kg',
          rpe: 8,
          restTime: 180,
          progressionMethod: 'dual',
          setTypes: ['working'],
          muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
          instructions:
            'Keep your feet flat on the floor, maintain a slight arch in your back, and lower the bar to your chest with control.',
          lastWorkoutData: {
            date: '2024-01-15',
            sets: [
              { setNumber: 1, weight: '77.5kg', reps: 10, rpe: 8 },
              { setNumber: 2, weight: '77.5kg', reps: 9, rpe: 8 },
              { setNumber: 3, weight: '77.5kg', reps: 8, rpe: 9 },
              { setNumber: 4, weight: '77.5kg', reps: 8, rpe: 9 },
            ],
          },
          equipmentType: 'barbell',
          detailedInstructions: {
            stepByStep: [
              {
                title: 'Starting Position',
                description:
                  'Lie flat on the bench with your feet planted firmly on the floor. Your eyes should be directly under the barbell.',
              },
              {
                title: 'Grip',
                description:
                  'Grip the barbell with hands slightly wider than shoulder-width apart. Wrap your thumbs around the bar for safety.',
              },
              {
                title: 'Lowering Phase',
                description:
                  'Lower the bar slowly and under control to your mid-chest. Keep your elbows at approximately a 45-75 degree angle.',
              },
              {
                title: 'Pressing Phase',
                description:
                  'Push the bar back up to the starting position by extending your arms. Focus on pushing through your chest muscles.',
              },
              {
                title: 'Breathing',
                description:
                  'Inhale during the lowering phase and exhale during the pressing phase.',
              },
            ],
            proTips: [
              'Keep your wrists straight and directly above your elbows.',
              'Maintain a slight arch in your lower back, but keep your butt on the bench.',
              'Drive through your feet for stability and added power.',
              'Keep your shoulder blades retracted and "tucked" throughout the movement.',
              'Focus on pushing yourself away from the bar, rather than pushing the bar away from you.',
            ],
            commonMistakes: [
              'Bouncing the bar off your chest, which can lead to injury.',
              'Lifting your butt off the bench, which reduces stability.',
              'Flaring your elbows out too wide, which can strain your shoulders.',
              'Not lowering the bar to chest level, which reduces the effectiveness.',
              'Using too much weight and sacrificing proper form.',
            ],
          },
        },
        {
          id: '4',
          name: 'Pull-ups',
          sets: 3,
          reps: '6-8',
          weight: 'Bodyweight',
          rpe: 7,
          restTime: 120,
          progressionMethod: 'linear',
          setTypes: ['working'],
          muscleGroups: ['Lats', 'Biceps'],
          instructions:
            'Start from a dead hang, pull your chest to the bar, and lower with control.',
          lastWorkoutData: {
            weight: 'Bodyweight',
            reps: '8, 7, 6',
            rpe: 7,
            date: '2024-01-15',
          },
          equipmentType: 'bodyweight',
        },
      ],
    },
    {
      id: 'emom-1',
      name: 'EMOM Finisher',
      type: 'emom',
      intervalTime: 60,
      exercises: [
        {
          id: '5',
          name: 'Push-ups',
          sets: 8,
          reps: '10',
          weight: 'Bodyweight',
          rpe: 6,
          restTime: 0,
          progressionMethod: 'linear',
          setTypes: ['working'],
          muscleGroups: ['Chest', 'Triceps'],
          instructions: 'Perform 10 push-ups at the start of each minute.',
          equipmentType: 'bodyweight',
        },
      ],
    },
    {
      id: 'amrap-1',
      name: 'AMRAP Circuit',
      type: 'amrap',
      duration: 300, // 5 minutes
      amrapRestTime: 20, // Added rest time between AMRAP rounds
      exercises: [
        {
          id: '6',
          name: 'Burpees',
          sets: 1,
          reps: '5',
          weight: 'Bodyweight',
          rpe: 7,
          restTime: 0,
          progressionMethod: 'amrap',
          setTypes: ['working'],
          muscleGroups: ['Full Body'],
          instructions: 'Complete 5 burpees, then move to mountain climbers.',
          equipmentType: 'bodyweight',
        },
        {
          id: '7',
          name: 'Mountain Climbers',
          sets: 1,
          reps: '10',
          weight: 'Bodyweight',
          rpe: 6,
          restTime: 0,
          progressionMethod: 'amrap',
          setTypes: ['working'],
          muscleGroups: ['Core', 'Shoulders'],
          instructions:
            '10 mountain climbers (5 each leg), then rest 20 seconds.',
          equipmentType: 'bodyweight',
        },
      ],
    },
  ],
};

interface WorkoutExecutionProps {
  workoutId: string;
}

export const WorkoutExecution = ({ workoutId }: WorkoutExecutionProps) => {
  const [routine] = useState<WorkoutRoutine>(mockRoutine);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [sectionTime, setSectionTime] = useState(0);
  const [emomIntervalTime, setEmomIntervalTime] = useState(0);
  const [amrapRounds, setAmrapRounds] = useState(0);
  const [amrapRestTime, setAmrapRestTime] = useState(0);
  const [isAmrapResting, setIsAmrapResting] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [completedSets, setCompletedSets] = useState<CompletedSet[]>([]);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [workoutStartTime] = useState(new Date());
  const [currentSide, setCurrentSide] = useState<'left' | 'right' | 'both'>(
    'both'
  );
  const [unilateralSetComplete, setUnilateralSetComplete] = useState(false);
  const [showSectionTransition, setShowSectionTransition] = useState(false); // Added state for section transition

  const currentSection = routine.sections?.[currentSectionIndex];
  const currentExercise = currentSection?.exercises?.[currentExerciseIndex];

  const totalSets = routine.sections.reduce(
    (acc, section) =>
      acc +
      section.exercises.reduce(
        (exerciseAcc, exercise) => exerciseAcc + exercise.sets,
        0
      ),
    0
  );
  const completedSetsCount = completedSets.length;
  const progress = (completedSetsCount / totalSets) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
        setSectionTime(prev => prev + 1);

        if (currentSection?.type === 'emom') {
          setEmomIntervalTime(prev => {
            const newTime = prev + 1;
            if (newTime >= (currentSection.intervalTime || 60)) {
              return 0;
            }
            return newTime;
          });
        } else if (currentSection?.type === 'amrap') {
          if (isAmrapResting) {
            setAmrapRestTime(prev => {
              const newTime = prev + 1;
              if (newTime >= (currentSection.amrapRestTime || 0)) {
                setIsAmrapResting(false);
                setAmrapRestTime(0);
                return 0;
              }
              return newTime;
            });
          } else {
            const remainingTime =
              (currentSection.duration || 300) - sectionTime;
            if (remainingTime <= 0) {
              handleSectionComplete();
            }
          }
        } else {
          setExerciseTime(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    isTimerRunning,
    currentSection?.type,
    sectionTime,
    currentSection?.intervalTime,
    currentSection?.duration,
    isAmrapResting,
    currentSection?.amrapRestTime,
  ]);

  useEffect(() => {
    if (currentSection?.type === 'emom' && currentSectionIndex > 0) {
      setIsTimerRunning(true);
    }
  }, [currentSectionIndex, currentSection?.type]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionComplete = () => {
    if (currentSectionIndex < routine.sections.length - 1) {
      setShowSectionTransition(true);
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(false);
      setWorkoutComplete(true);
    }
  };

  const handleSectionTransitionContinue = () => {
    setShowSectionTransition(false);
    setCurrentSectionIndex(prev => prev + 1);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setSectionTime(0);
    setExerciseTime(0);
    setEmomIntervalTime(0);
    setAmrapRounds(0);
    setAmrapRestTime(0);
    setIsAmrapResting(false);
    setCurrentSide('both');
    setUnilateralSetComplete(false);
    setIsTimerRunning(true);
  };

  const handleSetComplete = () => {
    if (
      currentExercise?.isUnilateral &&
      currentExercise.unilateralMode !== 'sequential'
    ) {
      if (currentSide === 'both') {
        setCurrentSide('left');
        return;
      } else if (currentSide === 'left') {
        if (currentExercise.unilateralMode === 'rest-between') {
          setShowRestTimer(true);
          setIsTimerRunning(false);
          return;
        } else {
          setCurrentSide('right');
          return;
        }
      } else if (currentSide === 'right') {
        setCurrentSide('both');
        setUnilateralSetComplete(true);
      }
    }

    if (currentSection?.type === 'amrap') {
      if (currentExerciseIndex === currentSection.exercises.length - 1) {
        if (currentSection.amrapRestTime && currentSection.amrapRestTime > 0) {
          setIsAmrapResting(true);
          setAmrapRestTime(0);
        }
        setAmrapRounds(prev => prev + 1);
        setCurrentExerciseIndex(0);
      } else {
        setCurrentExerciseIndex(prev => prev + 1);
      }
      return;
    }

    if (currentSection?.type === 'emom') {
      const remainingTime =
        (currentSection.intervalTime || 60) - emomIntervalTime;
      if (remainingTime > 0) {
        setShowRestTimer(true);
        setIsTimerRunning(false);
      } else {
        handleNextSet();
      }
      return;
    }

    setShowRestTimer(true);
    setIsTimerRunning(false);
  };

  const handleNextSet = () => {
    if (currentSet < currentExercise?.sets) {
      setCurrentSet(prev => prev + 1);
      setExerciseTime(0);
      if (currentSection?.type === 'emom') {
        setEmomIntervalTime(0);
      }
    } else if (currentExerciseIndex < currentSection?.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setExerciseTime(0);
      if (currentSection?.type === 'emom') {
        setEmomIntervalTime(0);
      }
    } else {
      handleSectionComplete();
    }
    setCurrentSide('both');
    setUnilateralSetComplete(false);
  };

  const handleRestComplete = (setData: CompletedSet) => {
    const updatedCompletedSets = [...completedSets, setData];
    setCompletedSets(updatedCompletedSets);
    setShowRestTimer(false);
    setIsTimerRunning(true);

    if (
      currentExercise?.isUnilateral &&
      currentExercise.unilateralMode === 'rest-between' &&
      currentSide === 'left'
    ) {
      setCurrentSide('right');
    } else {
      handleNextSet();
    }
  };

  const getSectionIcon = (type: SectionType) => {
    switch (type) {
      case 'warm-up':
      case 'cooldown':
        return TrendingUp;
      case 'emom':
        return Timer;
      case 'amrap':
        return Repeat;
      default:
        return Play;
    }
  };

  const handlePauseResume = () => {
    if (currentSection?.type === 'emom') return;
    setIsTimerRunning(prev => !prev);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getUnilateralText = () => {
    if (!currentExercise?.isUnilateral) return '';
    if (currentSide === 'left') return ' (Left Side)';
    if (currentSide === 'right') return ' (Right Side)';
    return '';
  };

  useEffect(() => {
    if (
      currentExercise?.isUnilateral &&
      currentExercise.unilateralMode === 'alternating' &&
      currentSide === 'both'
    ) {
      setCurrentSide('left');
    }
  }, [
    currentExercise?.isUnilateral,
    currentExercise?.unilateralMode,
    currentSide,
  ]);

  const getNextExercise = () => {
    // If there's another set of the current exercise
    if (currentSet < currentExercise?.sets) {
      return currentExercise;
    }
    // If there's another exercise in the current section
    if (currentExerciseIndex < currentSection?.exercises.length - 1) {
      return currentSection.exercises[currentExerciseIndex + 1];
    }
    // If there's another section
    if (currentSectionIndex < routine.sections.length - 1) {
      return routine.sections[currentSectionIndex + 1].exercises[0];
    }
    // No next exercise (workout complete)
    return null;
  };

  if (workoutComplete) {
    return (
      <WorkoutReview
        routine={routine}
        completedSets={completedSets}
        totalTime={workoutTime}
        startTime={workoutStartTime}
      />
    );
  }

  if (showSectionTransition) {
    const nextSection = routine.sections[currentSectionIndex + 1];
    return (
      <SectionTransition
        section={nextSection}
        onContinue={handleSectionTransitionContinue}
        sectionNumber={currentSectionIndex + 2}
        totalSections={routine.sections.length}
        lastExercise={currentExercise}
        lastSetNumber={currentSet}
        restTime={currentExercise?.restTime || 0}
        onSetComplete={handleRestComplete}
        workoutTimer={workoutTime}
        onWorkoutTimerUpdate={setWorkoutTime}
        nextExercise={nextSection?.exercises[0]}
      />
    );
  }

  if (showRestTimer) {
    const restTime =
      currentSection?.type === 'emom'
        ? (currentSection.intervalTime || 60) - emomIntervalTime
        : currentExercise?.restTime;

    return (
      <RestTimer
        exercise={currentExercise}
        setNumber={currentSet}
        restTime={restTime}
        onComplete={handleRestComplete}
        onSkip={() => {
          const defaultSetData: CompletedSet = {
            exerciseId: currentExercise?.id,
            setNumber: currentSet,
            actualReps:
              Number.parseInt(currentExercise?.reps.split('-')[0]) || 0,
            actualWeight: currentExercise?.weight,
            actualRpe: currentExercise?.rpe,
            notes: '',
            completedAt: new Date(),
            setType: currentExercise?.setTypes[0],
            mediaUrls: [],
          };
          handleRestComplete(defaultSetData);
        }}
        workoutTimer={workoutTime}
        onWorkoutTimerUpdate={setWorkoutTime}
        sectionType={currentSection?.type}
        allowTimeModification={currentSection?.type !== 'emom'}
        nextExercise={getNextExercise()}
      />
    );
  }

  const SectionIcon = getSectionIcon(currentSection?.type || 'basic');

  return (
    <div className="container mx-auto px-4 py-4 max-w-md min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={handleGoBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Workout Time</p>
          <p className="text-lg font-bold text-foreground">
            {formatTime(workoutTime)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePauseResume}
          disabled={currentSection?.type === 'emom'}
          className={currentSection?.type === 'emom' ? 'opacity-50' : ''}
        >
          {isTimerRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>

      <Card className="mb-4">
        <CardContent className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SectionIcon className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">
                {currentSection?.name}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {currentSection?.type.toUpperCase()}
            </Badge>
          </div>

          {currentSection?.type === 'emom' && (
            <div className="mt-2 text-center">
              <p className="text-xs text-muted-foreground">
                Interval {currentSet} of {currentExercise?.sets}
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatTime(
                  (currentSection.intervalTime || 60) - emomIntervalTime
                )}
              </p>
            </div>
          )}

          {currentSection?.type === 'amrap' && (
            <div className="mt-2 text-center">
              <p className="text-xs text-muted-foreground">
                Rounds: {amrapRounds}{' '}
                {isAmrapResting &&
                  `• Rest: ${formatTime((currentSection.amrapRestTime || 0) - amrapRestTime)}`}
              </p>
              <p className="text-lg font-bold text-foreground">
                {isAmrapResting
                  ? 'Resting'
                  : formatTime((currentSection.duration || 300) - sectionTime)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6 flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-foreground">
              {currentExercise?.name}
              {getUnilateralText()}
            </CardTitle>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                <Target className="w-3 h-3 mr-1" />
                RPE {currentExercise?.rpe}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {currentExercise?.muscleGroups?.map(muscle => (
              <Badge key={muscle} variant="outline" className="text-xs">
                {muscle}
              </Badge>
            ))}
            {currentExercise?.isUnilateral && (
              <Badge
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700"
              >
                {currentExercise.unilateralMode === 'sequential'
                  ? 'Sequential'
                  : currentExercise.unilateralMode === 'alternating'
                    ? 'Alternating'
                    : 'Rest Between Sides'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentExercise?.lastWorkoutData &&
            currentExercise.lastWorkoutData.sets && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <History className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Last Workout ({currentExercise.lastWorkoutData.date}) - Set{' '}
                    {currentSet}
                  </span>
                </div>
                {currentExercise.lastWorkoutData.sets?.[currentSet - 1] && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-blue-600">Weight</p>
                      <p className="text-sm font-semibold text-blue-800">
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .weight
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">Reps</p>
                      <p className="text-sm font-semibold text-blue-800">
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .reps
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">RPE</p>
                      <p className="text-sm font-semibold text-blue-800">
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .rpe
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          <ProgressionMethodInfo
            method={currentExercise?.progressionMethod}
            currentSet={currentSet}
            totalSets={currentExercise?.sets}
            reps={currentExercise?.reps}
            weight={currentExercise?.weight}
          />

          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <img
              src={`/abstract-geometric-shapes.png?height=200&width=300&query=${encodeURIComponent(`${currentExercise?.name} exercise demonstration`)}`}
              alt={`${currentExercise?.name} demonstration`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="text-center mb-4">
              {currentSection?.type === 'amrap' ? (
                <p className="text-2xl font-bold text-foreground">
                  Exercise {currentExerciseIndex + 1} of{' '}
                  {currentSection.exercises.length}
                </p>
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  Set {currentSet} of {currentExercise?.sets}
                </p>
              )}

              {currentSection?.type !== 'emom' &&
                currentSection?.type !== 'amrap' && (
                  <p className="text-muted-foreground">
                    Exercise Time: {formatTime(exerciseTime)}
                  </p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Reps</p>
                <p className="text-lg font-semibold text-foreground">
                  {currentExercise?.reps}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="text-lg font-semibold text-foreground">
                  {currentExercise?.weight}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {currentSection?.type === 'emom' ? 'Interval' : 'Rest'}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {currentSection?.type === 'emom'
                    ? `${currentSection.intervalTime}s`
                    : `${currentExercise?.restTime}s`}
                </p>
              </div>
            </div>
          </div>

          {currentExercise?.detailedInstructions && (
            <ExerciseInstructions
              instructions={currentExercise.detailedInstructions}
              exerciseName={currentExercise.name}
            />
          )}

          {currentExercise?.instructions &&
            !currentExercise.detailedInstructions && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Instructions
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentExercise.instructions}
                </p>
              </div>
            )}
        </CardContent>
      </Card>

      <div className="pb-6">
        <Button
          onClick={handleSetComplete}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
          disabled={isAmrapResting}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {isAmrapResting
            ? 'Resting...'
            : currentSection?.type === 'amrap'
              ? 'Complete Exercise'
              : currentExercise?.isUnilateral &&
                  currentExercise.unilateralMode === 'alternating'
                ? `Complete ${currentSide === 'both' ? 'Left' : currentSide} Side`
                : currentExercise?.isUnilateral && currentSide !== 'both'
                  ? `Complete ${currentSide} Side`
                  : 'Complete Set'}
        </Button>
      </div>
    </div>
  );
};
