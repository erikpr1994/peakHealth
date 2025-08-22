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
  Play,
  Pause,
  Plus,
  Minus,
  CheckCircle,
  Timer,
  Clock,
  AlertCircle,
} from 'lucide-react';
import type {
  Exercise,
  CompletedSet,
  SectionType,
} from '@/features/workout-tracking/workout';
import { ExerciseInstructions } from '@/features/workout-tracking/exercise-instructions';

interface RestTimerProps {
  exercise: Exercise;
  setNumber: number;
  restTime: number;
  sectionType?: SectionType;
  allowTimeModification?: boolean;
  onComplete: (setData: CompletedSet) => void;
  onSkip: () => void;
  workoutTimer: number;
  onWorkoutTimerUpdate: (time: number) => void;
  nextExercise?: Exercise | null;
}

export const RestTimer = ({
  exercise,
  setNumber,
  restTime,
  sectionType = 'basic',
  allowTimeModification = true,
  onComplete,
  onSkip,
  workoutTimer,
  onWorkoutTimerUpdate,
  nextExercise,
}: RestTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(restTime);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isGetReady, setIsGetReady] = useState(false);
  const [actualReps, setActualReps] = useState(
    Number.parseInt(exercise.reps.split('-')[0]) || 0
  );
  const [actualWeight, setActualWeight] = useState(exercise.weight);
  const [actualRpe, setActualRpe] = useState(exercise.rpe);
  const [notes, setNotes] = useState('');
  const [isSetCompleted, setIsSetCompleted] = useState(false);
  const [leftReps, setLeftReps] = useState(0);
  const [leftWeight, setLeftWeight] = useState('');
  const [leftRpe, setLeftRpe] = useState(0);
  const [rightReps, setRightReps] = useState(0);
  const [rightWeight, setRightWeight] = useState('');
  const [rightRpe, setRightRpe] = useState(0);

  useEffect(() => {
    setTimeRemaining(restTime);
  }, [restTime]);

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
          if (newTime === 0 && isSetCompleted) {
            // Auto-advance when timer finishes and set is completed
            setTimeout(() => onSkip(), 1000);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      setIsGetReady(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, isGetReady, isSetCompleted, onSkip]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitSetData = () => {
    // Only mark set as completed to show next exercise preview
    // Don't call onComplete yet - that happens when user clicks continue
    setIsSetCompleted(true);
  };

  const handleComplete = () => {
    const setData: CompletedSet = {
      exerciseId: exercise.id,
      setNumber,
      actualReps: exercise.isUnilateral ? undefined : actualReps,
      actualWeight: exercise.isUnilateral ? undefined : actualWeight,
      actualRpe: exercise.isUnilateral ? undefined : actualRpe,
      leftSide: exercise.isUnilateral
        ? {
            reps: leftReps,
            weight: leftWeight,
            rpe: leftRpe,
          }
        : undefined,
      rightSide: exercise.isUnilateral
        ? {
            reps: rightReps,
            weight: rightWeight,
            rpe: rightRpe,
          }
        : undefined,
      notes: notes.trim() || '',
      completedAt: new Date(),
      setType: exercise.setTypes[0],
      mediaUrls: [],
    };
    onComplete(setData);
  };

  const handlePauseResume = () => {
    setIsTimerRunning(prev => !prev);
  };

  const addTime = (seconds: number) => {
    if (allowTimeModification) {
      setTimeRemaining(prev => prev + seconds);
    }
  };

  const removeTime = (seconds: number) => {
    if (allowTimeModification) {
      setTimeRemaining(prev => Math.max(0, prev - seconds));
    }
  };

  const progressPercentage =
    restTime > 0 ? ((restTime - timeRemaining) / restTime) * 100 : 100;

  const getSectionInfo = () => {
    switch (sectionType) {
      case 'emom':
        return {
          title: 'EMOM Rest',
          subtitle: 'Waiting for next minute',
          icon: Timer,
          color: 'text-orange-500',
        };
      case 'warm-up':
        return {
          title: 'Warm-up Rest',
          subtitle: 'Light recovery time',
          icon: Clock,
          color: 'text-green-500',
        };
      case 'amrap':
        return {
          title: 'AMRAP Transition',
          subtitle: 'Move to next exercise',
          icon: Timer,
          color: 'text-purple-500',
        };
      default:
        return {
          title: 'Rest Time',
          subtitle: 'Recovery between sets',
          icon: Clock,
          color: 'text-primary',
        };
    }
  };

  const sectionInfo = getSectionInfo();
  const SectionIcon = sectionInfo.icon;

  const canModifyWeight = exercise.equipmentType !== 'bodyweight';
  const isWeightInput = canModifyWeight && exercise.equipmentType !== 'band';

  const handleSkipWithDefaults = () => {
    // Create default set data based on target values
    const defaultSetData: CompletedSet = {
      exerciseId: exercise.id,
      setNumber,
      actualReps: exercise.isUnilateral
        ? undefined
        : Number.parseInt(exercise.reps.split('-')[0]) || 0,
      actualWeight: exercise.isUnilateral ? undefined : exercise.weight,
      actualRpe: exercise.isUnilateral ? undefined : exercise.rpe,
      leftSide: exercise.isUnilateral
        ? {
            reps: Number.parseInt(exercise.reps.split('-')[0]) || 0,
            weight: exercise.weight,
            rpe: exercise.rpe,
          }
        : undefined,
      rightSide: exercise.isUnilateral
        ? {
            reps: Number.parseInt(exercise.reps.split('-')[0]) || 0,
            weight: exercise.weight,
            rpe: exercise.rpe,
          }
        : undefined,
      notes: '',
      completedAt: new Date(),
      setType: exercise.setTypes[0],
      mediaUrls: [],
    };
    onComplete(defaultSetData);
  };

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
                {nextExercise
                  ? `Next: ${nextExercise.name}`
                  : 'Next set starting soon'}
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
                Prepare yourself for the next exercise
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
              Skip to Next Exercise
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-md min-h-screen flex flex-col">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <SectionIcon className={`w-6 h-6 ${sectionInfo.color}`} />
          <h1 className="text-2xl font-bold text-foreground">
            {sectionInfo.title}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {exercise.name} - Set {setNumber} Complete
        </p>
        <p className="text-sm text-muted-foreground">{sectionInfo.subtitle}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Workout Time: {formatTime(workoutTimer)}
        </p>

        <div className="flex justify-center mt-2">
          <Badge variant="outline" className="text-xs">
            {sectionType.toUpperCase()}
          </Badge>
        </div>
      </div>

      {restTime > 0 ? (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-primary mb-2">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={progressPercentage} className="h-3 mb-4" />

              {restTime > 0 && allowTimeModification && (
                <div className="flex justify-center gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTime(30)}
                  >
                    <Minus className="w-4 h-4" />
                    30s
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTime(30)}
                  >
                    <Plus className="w-4 h-4" />
                    30s
                  </Button>
                </div>
              )}

              {!allowTimeModification && (
                <p className="text-xs text-muted-foreground mb-3">
                  Time cannot be adjusted during EMOM intervals
                </p>
              )}

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
      ) : (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Ready!</div>
              <p className="text-muted-foreground">
                No rest time - continue when ready
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isSetCompleted && (
        <Card className="mb-6 flex-1">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              How did that set go?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercise.isUnilateral ? (
              <div className="space-y-6">
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
                        {exercise.equipmentType === 'band'
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
                        {exercise.equipmentType === 'band'
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
                    Target: {exercise.reps}
                  </p>
                </div>

                {canModifyWeight && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="actual-weight"
                      className="text-sm font-medium text-foreground"
                    >
                      {exercise.equipmentType === 'band'
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
                      Target: {exercise.weight}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="actual-rpe"
                    className="text-sm font-medium text-foreground"
                  >
                    Actual RPE (Rate of Perceived Exertion)
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
                    Target: {exercise.rpe}
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

      <div className="space-y-3 pb-6">
        {isSetCompleted && nextExercise && (
          <Card className="mb-4">
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
                      <Badge
                        key={muscle}
                        variant="secondary"
                        className="text-xs"
                      >
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <span className="font-medium">
                      {nextExercise.reps} reps
                    </span>
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

        <Button
          onClick={isSetCompleted ? handleComplete : handleSkipWithDefaults}
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {timeRemaining > 0
            ? 'Skip Rest & Continue'
            : 'Continue to Next Exercise'}
        </Button>
      </div>
    </div>
  );
};
