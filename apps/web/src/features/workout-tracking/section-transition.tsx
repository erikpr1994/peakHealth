'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Timer,
  Repeat,
  TrendingUp,
  Play,
  Clock,
  Target,
  CheckCircle,
  Plus,
  Minus,
  Pause,
  AlertCircle,
} from 'lucide-react';
import type {
  WorkoutSection,
  SectionType,
  Exercise,
  CompletedSet,
} from '@/features/workout-tracking/workout';
import { ExerciseInstructions } from '@/features/workout-tracking/exercise-instructions';

interface SectionTransitionProps {
  section: WorkoutSection;
  onContinue: () => void;
  sectionNumber: number;
  totalSections: number;
  lastExercise?: Exercise;
  lastSetNumber?: number;
  restTime?: number;
  onSetComplete?: (setData: CompletedSet) => void;
  workoutTimer: number;
  onWorkoutTimerUpdate: (time: number) => void;
  nextExercise?: Exercise | null;
}

export const SectionTransition = ({
  section,
  onContinue,
  sectionNumber,
  totalSections,
  lastExercise,
  lastSetNumber,
  restTime = 0,
  onSetComplete,
  workoutTimer,
  onWorkoutTimerUpdate,
  nextExercise,
}: SectionTransitionProps) => {
  const [timeRemaining, setTimeRemaining] = useState(restTime);
  const [isTimerRunning, setIsTimerRunning] = useState(restTime > 0);
  const [isGetReady, setIsGetReady] = useState(false);
  const [isSetCompleted, setIsSetCompleted] = useState(false);
  const [actualReps, setActualReps] = useState(0);
  const [actualWeight, setActualWeight] = useState('');
  const [actualRpe, setActualRpe] = useState(0);
  const [notes, setNotes] = useState('');
  const [leftReps, setLeftReps] = useState(0);
  const [leftWeight, setLeftWeight] = useState('');
  const [leftRpe, setLeftRpe] = useState(0);
  const [rightReps, setRightReps] = useState(0);
  const [rightWeight, setRightWeight] = useState('');
  const [rightRpe, setRightRpe] = useState(0);

  useEffect(() => {
    if (lastExercise) {
      setActualReps(Number.parseInt(lastExercise.reps.split('-')[0]) || 0);
      setActualWeight(lastExercise.weight);
      setActualRpe(lastExercise.rpe);
      setLeftReps(Number.parseInt(lastExercise.reps.split('-')[0]) || 0);
      setLeftWeight(lastExercise.weight);
      setLeftRpe(lastExercise.rpe);
      setRightReps(Number.parseInt(lastExercise.reps.split('-')[0]) || 0);
      setRightWeight(lastExercise.weight);
      setRightRpe(lastExercise.rpe);
    }
  }, [lastExercise]);

  useEffect(() => {
    const workoutInterval = setInterval(() => {
      onWorkoutTimerUpdate(workoutTimer + 1);
    }, 1000);
    return () => clearInterval(workoutInterval);
  }, [workoutTimer, onWorkoutTimerUpdate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 15 && newTime > 0 && !isGetReady) {
            setIsGetReady(true);
          }
          if (newTime === 0) {
            // Auto-advance when timer finishes
            setTimeout(() => onContinue(), 1000);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      setIsGetReady(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isGetReady, onContinue]);

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

  const getSectionDescription = (type: SectionType) => {
    switch (type) {
      case 'warm-up':
        return 'Prepare your body for the workout ahead with dynamic movements and activation exercises.';
      case 'basic':
        return 'Focus on strength and technique with controlled movements and adequate rest between sets.';
      case 'emom':
        return 'Every Minute On the Minute - Complete the prescribed reps at the start of each minute.';
      case 'amrap':
        return 'As Many Rounds As Possible - Complete as many rounds of the circuit as you can in the time limit.';
      case 'tabata':
        return 'High-intensity intervals with 20 seconds work and 10 seconds rest for maximum effort.';
      case 'cooldown':
        return 'Wind down with gentle movements and stretches to help your body recover.';
      default:
        return 'Complete the exercises with focus on proper form and technique.';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitSetData = () => {
    setIsSetCompleted(true);
  };

  const handleCompleteSet = () => {
    if (lastExercise && lastSetNumber && onSetComplete) {
      const setData: CompletedSet = {
        exerciseId: lastExercise.id,
        setNumber: lastSetNumber,
        actualReps: lastExercise.isUnilateral ? undefined : actualReps,
        actualWeight: lastExercise.isUnilateral ? undefined : actualWeight,
        actualRpe: lastExercise.isUnilateral ? undefined : actualRpe,
        leftSide: lastExercise.isUnilateral
          ? {
              reps: leftReps,
              weight: leftWeight,
              rpe: leftRpe,
            }
          : undefined,
        rightSide: lastExercise.isUnilateral
          ? {
              reps: rightReps,
              weight: rightWeight,
              rpe: rightRpe,
            }
          : undefined,
        notes: notes.trim() || '',
        completedAt: new Date(),
        setType: lastExercise.setTypes[0],
        mediaUrls: [],
      };
      onSetComplete(setData);
    }
    onContinue();
  };

  const handleSkipWithDefaults = () => {
    if (lastExercise && lastSetNumber && onSetComplete) {
      const defaultSetData: CompletedSet = {
        exerciseId: lastExercise.id,
        setNumber: lastSetNumber,
        actualReps: lastExercise.isUnilateral
          ? undefined
          : Number.parseInt(lastExercise.reps.split('-')[0]) || 0,
        actualWeight: lastExercise.isUnilateral
          ? undefined
          : lastExercise.weight,
        actualRpe: lastExercise.isUnilateral ? undefined : lastExercise.rpe,
        leftSide: lastExercise.isUnilateral
          ? {
              reps: Number.parseInt(lastExercise.reps.split('-')[0]) || 0,
              weight: lastExercise.weight,
              rpe: lastExercise.rpe,
            }
          : undefined,
        rightSide: lastExercise.isUnilateral
          ? {
              reps: Number.parseInt(lastExercise.reps.split('-')[0]) || 0,
              weight: lastExercise.weight,
              rpe: lastExercise.rpe,
            }
          : undefined,
        notes: '',
        completedAt: new Date(),
        setType: lastExercise.setTypes[0],
        mediaUrls: [],
      };
      onSetComplete(defaultSetData);
    }
    onContinue();
  };

  const addTime = (seconds: number) => {
    setTimeRemaining(prev => prev + seconds);
  };

  const removeTime = (seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev - seconds));
  };

  const handlePauseResume = () => {
    setIsTimerRunning(prev => !prev);
  };

  const SectionIcon = getSectionIcon(section.type);
  const totalExercises = section.exercises.length;
  const estimatedTime = section.exercises.reduce((acc, exercise) => {
    const setTime = exercise.sets * (30 + (exercise.restTime || 0));
    return acc + setTime;
  }, 0);

  const canModifyWeight = lastExercise?.equipmentType !== 'bodyweight';
  const isWeightInput =
    canModifyWeight && lastExercise?.equipmentType !== 'band';
  const progressPercentage =
    restTime > 0 ? ((restTime - timeRemaining) / restTime) * 100 : 100;

  if (isGetReady && timeRemaining > 0 && timeRemaining <= 15) {
    return (
      <div className="container mx-auto px-4 py-4 max-w-md min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
        <Card className="w-full max-w-sm border-primary/20 shadow-lg">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mb-6">
              <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Get Ready!
              </h1>
              <p className="text-lg text-muted-foreground">
                Next Section: {section.name}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-8xl font-bold text-primary mb-4 animate-pulse">
                {timeRemaining}
              </div>
              <Progress
                value={((15 - timeRemaining) / 15) * 100}
                className="h-4 mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Prepare for the next section
              </p>
            </div>

            <Button
              onClick={() => {
                setTimeRemaining(0);
                setIsGetReady(false);
                setIsTimerRunning(false);
              }}
              variant="outline"
              className="w-full"
            >
              Skip to Next Section
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md min-h-screen flex flex-col">
      <div className="text-center mb-6">
        <Badge variant="outline" className="mb-4">
          Section {sectionNumber} of {totalSections}
        </Badge>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <SectionIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {section.name}
        </h1>
        <Badge variant="secondary" className="text-sm">
          {section.type.toUpperCase()}
        </Badge>
        <p className="text-sm text-muted-foreground mt-2">
          Workout Time: {formatTime(workoutTimer)}
        </p>
      </div>

      {lastExercise && restTime > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {lastExercise.name} - Set {lastSetNumber} Complete
              </p>
              <div className="text-6xl font-bold text-primary mb-2">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={progressPercentage} className="h-3 mb-4" />

              <div className="flex justify-center gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTime(30)}
                >
                  <Minus className="w-4 h-4" />
                  30s
                </Button>
                <Button variant="outline" size="sm" onClick={() => addTime(30)}>
                  <Plus className="w-4 h-4" />
                  30s
                </Button>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePauseResume}>
                  {isTimerRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {isTimerRunning ? 'Pause' : 'Resume'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {lastExercise && !isSetCompleted && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              How did that set go?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastExercise.isUnilateral ? (
              <div className="space-y-6">
                {/* Left Side */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      Left Side
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="left-reps"
                      className="text-sm font-medium text-foreground"
                    >
                      Reps
                    </Label>
                    <Input
                      id="left-reps"
                      type="number"
                      value={leftReps}
                      onChange={e =>
                        setLeftReps(Number.parseInt(e.target.value) || 0)
                      }
                      className="text-center text-lg font-semibold"
                    />
                  </div>
                  {canModifyWeight && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="left-weight"
                        className="text-sm font-medium text-foreground"
                      >
                        {lastExercise.equipmentType === 'band'
                          ? 'Band Type'
                          : 'Weight'}
                      </Label>
                      {isWeightInput ? (
                        <Input
                          id="left-weight"
                          value={leftWeight}
                          onChange={e => setLeftWeight(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      ) : (
                        <div className="flex gap-2 justify-center">
                          {['Light', 'Medium', 'Heavy'].map(bandType => (
                            <Button
                              key={bandType}
                              variant={
                                leftWeight
                                  .toLowerCase()
                                  .includes(bandType.toLowerCase())
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => setLeftWeight(`${bandType} band`)}
                            >
                              {bandType}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label
                      htmlFor="left-rpe"
                      className="text-sm font-medium text-foreground"
                    >
                      RPE
                    </Label>
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rpe => (
                        <Button
                          key={rpe}
                          variant={leftRpe === rpe ? 'default' : 'outline'}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setLeftRpe(rpe)}
                        >
                          {rpe}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      Right Side
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="right-reps"
                      className="text-sm font-medium text-foreground"
                    >
                      Reps
                    </Label>
                    <Input
                      id="right-reps"
                      type="number"
                      value={rightReps}
                      onChange={e =>
                        setRightReps(Number.parseInt(e.target.value) || 0)
                      }
                      className="text-center text-lg font-semibold"
                    />
                  </div>
                  {canModifyWeight && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="right-weight"
                        className="text-sm font-medium text-foreground"
                      >
                        {lastExercise.equipmentType === 'band'
                          ? 'Band Type'
                          : 'Weight'}
                      </Label>
                      {isWeightInput ? (
                        <Input
                          id="right-weight"
                          value={rightWeight}
                          onChange={e => setRightWeight(e.target.value)}
                          className="text-center text-lg font-semibold"
                        />
                      ) : (
                        <div className="flex gap-2 justify-center">
                          {['Light', 'Medium', 'Heavy'].map(bandType => (
                            <Button
                              key={bandType}
                              variant={
                                rightWeight
                                  .toLowerCase()
                                  .includes(bandType.toLowerCase())
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => setRightWeight(`${bandType} band`)}
                            >
                              {bandType}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label
                      htmlFor="right-rpe"
                      className="text-sm font-medium text-foreground"
                    >
                      RPE
                    </Label>
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rpe => (
                        <Button
                          key={rpe}
                          variant={rightRpe === rpe ? 'default' : 'outline'}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setRightRpe(rpe)}
                        >
                          {rpe}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="actual-reps"
                    className="text-sm font-medium text-foreground"
                  >
                    Actual Reps
                  </Label>
                  <Input
                    id="actual-reps"
                    type="number"
                    value={actualReps}
                    onChange={e =>
                      setActualReps(Number.parseInt(e.target.value) || 0)
                    }
                    className="text-center text-lg font-semibold"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Target: {lastExercise.reps}
                  </p>
                </div>

                {canModifyWeight && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="actual-weight"
                      className="text-sm font-medium text-foreground"
                    >
                      {lastExercise.equipmentType === 'band'
                        ? 'Band Type'
                        : 'Actual Weight'}
                    </Label>
                    {isWeightInput ? (
                      <Input
                        id="actual-weight"
                        value={actualWeight}
                        onChange={e => setActualWeight(e.target.value)}
                        className="text-center text-lg font-semibold"
                      />
                    ) : (
                      <div className="flex gap-2 justify-center">
                        {['Light', 'Medium', 'Heavy'].map(bandType => (
                          <Button
                            key={bandType}
                            variant={
                              actualWeight
                                .toLowerCase()
                                .includes(bandType.toLowerCase())
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setActualWeight(`${bandType} band`)}
                          >
                            {bandType}
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground text-center">
                      Target: {lastExercise.weight}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="actual-rpe"
                    className="text-sm font-medium text-foreground"
                  >
                    Actual RPE
                  </Label>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rpe => (
                      <Button
                        key={rpe}
                        variant={actualRpe === rpe ? 'default' : 'outline'}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setActualRpe(rpe)}
                      >
                        {rpe}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Target: {lastExercise.rpe}
                  </p>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-foreground"
              >
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="How did this set feel? Any observations?"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <Button
              onClick={handleSubmitSetData}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit Set Data
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-center">What to Expect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center leading-relaxed">
            {getSectionDescription(section.type)}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Exercises</p>
              <p className="text-lg font-semibold text-foreground">
                {totalExercises}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Est. Time</p>
              <p className="text-lg font-semibold text-foreground">
                {Math.ceil(estimatedTime / 60)}min
              </p>
            </div>
          </div>

          {(section.type === 'emom' || section.type === 'amrap') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              {section.type === 'emom' && (
                <div className="text-center">
                  <p className="text-sm text-blue-600 mb-1">
                    Interval Duration
                  </p>
                  <p className="text-lg font-semibold text-blue-800">
                    {section.intervalTime}s
                  </p>
                </div>
              )}
              {section.type === 'amrap' && (
                <div className="text-center">
                  <p className="text-sm text-blue-600 mb-1">Total Duration</p>
                  <p className="text-lg font-semibold text-blue-800">
                    {Math.floor((section.duration || 0) / 60)}:
                    {((section.duration || 0) % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {isSetCompleted && nextExercise && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Timer className="w-5 h-5 text-primary" />
              Next Exercise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  nextExercise.imageUrl ||
                  `/placeholder.svg?height=80&width=80&query=${nextExercise.name}`
                }
                alt={nextExercise.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {nextExercise.name}
                </h3>
                <div className="flex gap-2 mt-1">
                  {nextExercise.muscleGroups.map(muscle => (
                    <Badge key={muscle} variant="secondary" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="font-medium">{nextExercise.reps} reps</span>
                  {nextExercise.equipmentType !== 'bodyweight' && (
                    <span> • {nextExercise.weight}</span>
                  )}
                  <span> • RPE {nextExercise.rpe}</span>
                </div>
              </div>
            </div>

            {nextExercise.instructions && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="font-medium mb-1">Instructions:</p>
                <p>{nextExercise.instructions}</p>
              </div>
            )}

            {nextExercise.detailedInstructions && (
              <ExerciseInstructions
                instructions={nextExercise.detailedInstructions}
                exerciseName={nextExercise.name}
              />
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">
          Exercises in this section:
        </h3>
        {section.exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
          >
            <div>
              <p className="font-medium text-foreground">{exercise.name}</p>
              <p className="text-sm text-muted-foreground">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {index + 1}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6">
        <Button
          onClick={isSetCompleted ? handleCompleteSet : handleSkipWithDefaults}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          {timeRemaining > 0
            ? 'Skip Rest & Start Section'
            : `Start ${section.name}`}
        </Button>
      </div>
    </div>
  );
};
