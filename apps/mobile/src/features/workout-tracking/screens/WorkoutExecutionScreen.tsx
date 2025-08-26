import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useWorkout} from '@/context/WorkoutContext';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import RestTimer from '@/features/workout-tracking/components/RestTimer';
import ProgressionMethodInfo from '@/features/workout-tracking/components/ProgressionMethodInfo';
import ExerciseInstructions from '@/features/workout-tracking/components/ExerciseInstructions';
import {Exercise, WorkoutSection} from '@/types/workout';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const WorkoutExecutionScreen: React.FC = () => {
  const {currentWorkout} = useWorkout();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [currentSide, setCurrentSide] = useState<'left' | 'right' | 'both'>(
    'both',
  );
  const [emomIntervalTime, setEmomIntervalTime] = useState(0);
  const [sectionTime, setSectionTime] = useState(0);
  const [amrapRounds, setAmrapRounds] = useState(0);
  const [amrapRestTime, setAmrapRestTime] = useState(0);
  const [isAmrapResting, setIsAmrapResting] = useState(false);

  const currentSection: WorkoutSection =
    currentWorkout?.sections[currentSectionIndex];
  const currentExercise: Exercise | undefined =
    currentSection?.exercises[currentExerciseIndex];

  useEffect(() => {
    // Timer for workout duration
    const workoutTimer = setInterval(() => {
      setWorkoutTime(prev => prev + 1);
    }, 1000);

    // Timer for exercise duration (when not resting)
    const exerciseTimer = setInterval(() => {
      if (!isResting && !isAmrapResting) {
        setExerciseTime(prev => prev + 1);
      }
    }, 1000);

    // EMOM timer
    const emomTimer =
      currentSection?.type === 'emom'
        ? setInterval(() => {
            setEmomIntervalTime(prev => {
              if (prev >= (currentSection.intervalTime || 60) - 1) {
                // Reset to 0 when interval completes
                return 0;
              }
              return prev + 1;
            });
          }, 1000)
        : null;

    // AMRAP timer
    const amrapTimer =
      currentSection?.type === 'amrap'
        ? setInterval(() => {
            if (isAmrapResting) {
              setAmrapRestTime(prev => {
                if (prev >= (currentSection.amrapRestTime || 20) - 1) {
                  setIsAmrapResting(false);
                  return 0;
                }
                return prev + 1;
              });
            } else {
              setSectionTime(prev => {
                if (prev >= (currentSection.duration || 300) - 1) {
                  // AMRAP completed
                  Alert.alert('AMRAP Completed', 'Great job!');
                  return 0;
                }
                return prev + 1;
              });
            }
          }, 1000)
        : null;

    return () => {
      clearInterval(workoutTimer);
      clearInterval(exerciseTimer);
      if (emomTimer) clearInterval(emomTimer);
      if (amrapTimer) clearInterval(amrapTimer);
    };
  }, [
    isResting,
    isAmrapResting,
    currentSection?.type,
    currentSection?.intervalTime,
    currentSection?.duration,
    currentSection?.amrapRestTime,
  ]);

  useEffect(() => {
    // Calculate overall workout progress
    if (!currentWorkout) return;

    let totalSets = 0;
    let completedSets = 0;

    currentWorkout.sections.forEach((section, sectionIdx) => {
      section.exercises.forEach((exercise, exerciseIdx) => {
        const sets = exercise.sets;
        totalSets += sets;

        if (sectionIdx < currentSectionIndex) {
          // Previous sections are complete
          completedSets += sets;
        } else if (sectionIdx === currentSectionIndex) {
          if (exerciseIdx < currentExerciseIndex) {
            // Previous exercises in current section are complete
            completedSets += sets;
          } else if (exerciseIdx === currentExerciseIndex) {
            // Current exercise
            completedSets += currentSet - 1;
          }
        }
      });
    });

    const calculatedProgress = (completedSets / totalSets) * 100;
    setProgress(calculatedProgress);
  }, [
    currentWorkout,
    currentSectionIndex,
    currentExerciseIndex,
    currentSet,
  ]);

  const handleSetComplete = () => {
    if (!currentWorkout || !currentSection || !currentExercise) return;

    // Handle unilateral exercises
    if (
      currentExercise.isUnilateral &&
      currentExercise.unilateralMode === 'alternating'
    ) {
      if (currentSide === 'both') {
        setCurrentSide('left');
        return;
      } else if (currentSide === 'left') {
        setCurrentSide('right');
        return;
      } else {
        // Right side completed, move to next set or exercise
        setCurrentSide('both');
      }
    } else if (
      currentExercise.isUnilateral &&
      currentExercise.unilateralMode === 'sequential'
    ) {
      if (currentSide === 'both') {
        setCurrentSide('left');
        return;
      } else if (currentSide === 'left') {
        // Left side completed, rest before right side
        setIsResting(true);
        setCurrentSide('right');
        return;
      } else {
        // Right side completed, move to next set or exercise
        setCurrentSide('both');
      }
    }

    // Handle AMRAP
    if (currentSection.type === 'amrap') {
      if (currentExerciseIndex < currentSection.exercises.length - 1) {
        // Move to next exercise in AMRAP
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      } else {
        // Completed one round of AMRAP
        setAmrapRounds(prev => prev + 1);
        setCurrentExerciseIndex(0);
        if (currentSection.amrapRestTime && currentSection.amrapRestTime > 0) {
          setIsAmrapResting(true);
        }
      }
      return;
    }

    // Handle EMOM
    if (currentSection.type === 'emom') {
      if (currentSet < currentExercise.sets) {
        // Move to next interval
        setCurrentSet(currentSet + 1);
      } else {
        // EMOM completed
        moveToNextExercise();
      }
      return;
    }

    // Standard progression
    if (currentSet < currentExercise.sets) {
      // Move to next set
      setCurrentSet(currentSet + 1);
      if (currentExercise.restTime > 0) {
        setIsResting(true);
      }
    } else {
      // Move to next exercise
      moveToNextExercise();
    }
  };

  const moveToNextExercise = () => {
    if (!currentWorkout || !currentSection) return;

    setCurrentSet(1);
    setExerciseTime(0);
    setCurrentSide('both');

    if (currentExerciseIndex < currentSection.exercises.length - 1) {
      // Move to next exercise in current section
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (currentSectionIndex < currentWorkout.sections.length - 1) {
      // Move to next section
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentExerciseIndex(0);
      setSectionTime(0);
      setAmrapRounds(0);
    } else {
      // Workout completed
      Alert.alert('Workout Completed', 'Great job!');
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
  };

  const getUnilateralText = () => {
    if (
      !currentExercise?.isUnilateral ||
      currentSide === 'both' ||
      currentSection?.type === 'amrap'
    ) {
      return '';
    }
    return ` (${currentSide} side)`;
  };

  if (!currentWorkout || !currentSection || !currentExercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.noWorkoutText}>No workout in progress</Text>
          <Button onPress={() => {}} style={styles.startButton}>
            Start a Workout
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
          <Text style={styles.workoutTime}>
            Workout Time: {formatTime(workoutTime)}
          </Text>
        </View>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{currentSection.name}</Text>
          <View style={styles.sectionInfo}>
            <Badge variant="primary">
              {currentSection.type === 'warm-up'
                ? 'Warm-up'
                : currentSection.type === 'emom'
                ? 'EMOM'
                : currentSection.type === 'amrap'
                ? 'AMRAP'
                : 'Working Sets'}
            </Badge>
            <Text style={styles.exerciseProgress}>
              Exercise {currentExerciseIndex + 1} of{' '}
              {currentSection.exercises.length}
            </Text>
          </View>

          {isResting && (
            <RestTimer
              duration={currentExercise.restTime}
              onComplete={handleRestComplete}
            />
          )}

          {currentSection.type === 'emom' && (
            <View style={styles.timerInfo}>
              <Text style={styles.timerLabel}>
                Interval {currentSet} of {currentExercise.sets}
              </Text>
              <Text style={styles.timerValue}>
                {formatTime(
                  (currentSection.intervalTime || 60) - emomIntervalTime,
                )}
              </Text>
            </View>
          )}

          {currentSection.type === 'amrap' && (
            <View style={styles.timerInfo}>
              <Text style={styles.timerLabel}>
                Rounds: {amrapRounds}{' '}
                {isAmrapResting &&
                  `• Rest: ${formatTime(
                    (currentSection.amrapRestTime || 0) - amrapRestTime,
                  )}`}
              </Text>
              <Text style={styles.timerValue}>
                {isAmrapResting
                  ? 'Resting'
                  : formatTime((currentSection.duration || 300) - sectionTime)}
              </Text>
            </View>
          )}
        </Card>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, {width: `${progress}%`}]}
            />
          </View>
        </View>

        <Card style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>
              {currentExercise.name}
              {getUnilateralText()}
            </Text>
            <View style={styles.badgeContainer}>
              <Badge variant="secondary">RPE {currentExercise.rpe}</Badge>
            </View>
          </View>

          <View style={styles.muscleGroups}>
            {currentExercise.muscleGroups?.map(muscle => (
              <Badge key={muscle} variant="outline">
                {muscle}
              </Badge>
            ))}
            {currentExercise.isUnilateral && (
              <Badge variant="primary">
                {currentExercise.unilateralMode === 'sequential'
                  ? 'Sequential'
                  : currentExercise.unilateralMode === 'alternating'
                  ? 'Alternating'
                  : 'Rest Between Sides'}
              </Badge>
            )}
          </View>

          {currentExercise.lastWorkoutData &&
            currentExercise.lastWorkoutData.sets && (
              <View style={styles.lastWorkout}>
                <Text style={styles.lastWorkoutTitle}>
                  Last Workout ({currentExercise.lastWorkoutData.date}) - Set{' '}
                  {currentSet}
                </Text>
                {currentExercise.lastWorkoutData.sets[currentSet - 1] && (
                  <View style={styles.lastWorkoutData}>
                    <View style={styles.dataItem}>
                      <Text style={styles.dataLabel}>Weight</Text>
                      <Text style={styles.dataValue}>
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .weight
                        }
                      </Text>
                    </View>
                    <View style={styles.dataItem}>
                      <Text style={styles.dataLabel}>Reps</Text>
                      <Text style={styles.dataValue}>
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .reps
                        }
                      </Text>
                    </View>
                    <View style={styles.dataItem}>
                      <Text style={styles.dataLabel}>RPE</Text>
                      <Text style={styles.dataValue}>
                        {
                          currentExercise.lastWorkoutData.sets[currentSet - 1]
                            .rpe
                        }
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}

          <ProgressionMethodInfo
            method={currentExercise.progressionMethod}
            currentSet={currentSet}
            totalSets={currentExercise.sets}
            reps={currentExercise.reps}
            weight={currentExercise.weight}
          />

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/300x200?text=Exercise+Demonstration',
              }}
              style={styles.exerciseImage}
            />
          </View>

          <View style={styles.setInfo}>
            <View style={styles.setInfoHeader}>
              {currentSection.type === 'amrap' ? (
                <Text style={styles.setInfoTitle}>
                  Exercise {currentExerciseIndex + 1} of{' '}
                  {currentSection.exercises.length}
                </Text>
              ) : (
                <Text style={styles.setInfoTitle}>
                  Set {currentSet} of {currentExercise.sets}
                </Text>
              )}

              {currentSection.type !== 'emom' &&
                currentSection.type !== 'amrap' && (
                  <Text style={styles.setInfoSubtitle}>
                    Exercise Time: {formatTime(exerciseTime)}
                  </Text>
                )}
            </View>

            <View style={styles.setDetails}>
              <View style={styles.setDetailItem}>
                <Text style={styles.setDetailLabel}>Reps</Text>
                <Text style={styles.setDetailValue}>
                  {currentExercise.reps}
                </Text>
              </View>
              <View style={styles.setDetailItem}>
                <Text style={styles.setDetailLabel}>Weight</Text>
                <Text style={styles.setDetailValue}>
                  {currentExercise.weight}
                </Text>
              </View>
              <View style={styles.setDetailItem}>
                <Text style={styles.setDetailLabel}>
                  {currentSection.type === 'emom' ? 'Interval' : 'Rest'}
                </Text>
                <Text style={styles.setDetailValue}>
                  {currentSection.type === 'emom'
                    ? `${currentSection.intervalTime}s`
                    : `${currentExercise.restTime}s`}
                </Text>
              </View>
            </View>
          </View>

          {currentExercise.detailedInstructions && (
            <ExerciseInstructions
              instructions={currentExercise.detailedInstructions}
              exerciseName={currentExercise.name}
            />
          )}

          {currentExercise.instructions &&
            !currentExercise.detailedInstructions && (
              <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Instructions</Text>
                <Text style={styles.instructionsText}>
                  {currentExercise.instructions}
                </Text>
              </View>
            )}
        </Card>

        <Button
          onPress={handleSetComplete}
          style={styles.completeButton}
          disabled={isAmrapResting}>
          {isAmrapResting
            ? 'Resting...'
            : currentSection.type === 'amrap'
            ? 'Complete Exercise'
            : currentExercise.isUnilateral &&
              currentExercise.unilateralMode === 'alternating'
            ? `Complete ${currentSide === 'both' ? 'Left' : currentSide} Side`
            : currentExercise.isUnilateral && currentSide !== 'both'
            ? `Complete ${currentSide} Side`
            : 'Complete Set'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noWorkoutText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  startButton: {
    width: 200,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  workoutTime: {
    fontSize: 14,
    color: '#666',
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseProgress: {
    fontSize: 14,
    color: '#666',
  },
  timerInfo: {
    marginTop: 12,
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timerValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0070f3',
  },
  exerciseCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  lastWorkout: {
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  lastWorkoutTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0070f3',
    marginBottom: 8,
  },
  lastWorkoutData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    flex: 1,
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 12,
    color: '#0070f3',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  imageContainer: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  setInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginBottom: 16,
  },
  setInfoHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  setInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  setInfoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  setDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setDetailItem: {
    flex: 1,
    alignItems: 'center',
  },
  setDetailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  setDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  instructions: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  completeButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    height: 56,
  },
});

export default WorkoutExecutionScreen;

