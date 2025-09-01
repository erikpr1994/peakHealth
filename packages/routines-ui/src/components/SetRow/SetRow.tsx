import { useSet } from '../../hooks/useSet';
import { useExercise } from '../../hooks/useExercise';
import type { WorkoutSet } from '@peakhealth/routines-types';
import './SetRow.css';
import type { SetRowProps } from './SetRow.types';
import {
  hasDuration,
  hasReps,
  hasRpe,
  hasWeight,
  isDualProgression,
} from './SetRow.utils';
import {
  buildHandleDurationChange,
  buildHandleRepsChange,
  buildHandleRepsMaxChange,
  buildHandleRepsMinChange,
  buildHandleRpeChange,
  buildHandleSetTypeChange,
  buildHandleWeightChange,
} from './SetRow.handlers';

export const SetRow = ({
  workoutId,
  sectionId,
  exerciseId,
  setId,
}: SetRowProps) => {
  const { set, updateSet } = useSet(workoutId, sectionId, exerciseId, setId);
  const { exercise } = useExercise(workoutId, sectionId, exerciseId);

  if (!set || !exercise) {
    return null;
  }

  const dualProgression = isDualProgression(exercise);

  const handleSetTypeChange = buildHandleSetTypeChange(updateSet);
  const handleRepsChange = buildHandleRepsChange(set, updateSet);
  const handleRepsMinChange = buildHandleRepsMinChange(set, updateSet);
  const handleRepsMaxChange = buildHandleRepsMaxChange(set, updateSet);
  const handleWeightChange = buildHandleWeightChange(set, updateSet);
  const handleRpeChange = buildHandleRpeChange(set, updateSet);
  const handleDurationChange = buildHandleDurationChange(set, updateSet);

  return (
    <div className="set-row">
      <div className="set-number">
        {set.setNumber}
        {exercise.unilateralMode === 'sequential' &&
          'unilateralSide' in set &&
          set.unilateralSide && (
            <span className="unilateral-side">
              {set.unilateralSide === 'left' ? 'L' : 'R'}
            </span>
          )}
      </div>

      {/* Set Type Dropdown */}
      <select
        value={set.setType}
        onChange={e =>
          handleSetTypeChange(e.target.value as WorkoutSet['setType'])
        }
        className="set-type-select"
      >
        <option value="working">Working</option>
        <option value="warmup">Warmup</option>
        <option value="drop">Drop</option>
        <option value="failure">Failure</option>
      </select>

      {/* Conditional Inputs based on Set Type */}
      {set.setType === 'working' && (
        <>
          {(hasReps(set) || hasDuration(set)) && (
            <>
              {exercise.unilateralMode === 'alternating' ? (
                <>
                  <div className="unilateral-input-group">
                    <label className="unilateral-label">Left</label>
                    {set.repType === 'time' ? (
                      <input
                        type="number"
                        value={set.duration || ''}
                        onChange={e =>
                          handleDurationChange(Number(e.target.value))
                        }
                        placeholder="Time"
                        className="input"
                      />
                    ) : (
                      <>
                        {dualProgression ? (
                          <>
                            <input
                              type="number"
                              value={
                                ('repsMin' in set ? set.repsMin : '') || ''
                              }
                              onChange={e =>
                                handleRepsMinChange(Number(e.target.value))
                              }
                              placeholder="Min Reps"
                              className="input"
                            />
                            <input
                              type="number"
                              value={
                                ('repsMax' in set ? set.repsMax : '') || ''
                              }
                              onChange={e =>
                                handleRepsMaxChange(Number(e.target.value))
                              }
                              placeholder="Max Reps"
                              className="input"
                            />
                          </>
                        ) : (
                          <input
                            type="number"
                            value={set.reps || ''}
                            onChange={e =>
                              handleRepsChange(Number(e.target.value))
                            }
                            placeholder="Reps"
                            className="input"
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div className="unilateral-input-group">
                    <label className="unilateral-label">Right</label>
                    {set.repType === 'time' ? (
                      <input
                        type="number"
                        value={set.duration || ''}
                        onChange={e =>
                          handleDurationChange(Number(e.target.value))
                        }
                        placeholder="Time"
                        className="input"
                      />
                    ) : (
                      <>
                        {dualProgression ? (
                          <>
                            <input
                              type="number"
                              value={
                                ('repsMin' in set ? set.repsMin : '') || ''
                              }
                              onChange={e =>
                                handleRepsMinChange(Number(e.target.value))
                              }
                              placeholder="Min Reps"
                              className="input"
                            />
                            <input
                              type="number"
                              value={
                                ('repsMax' in set ? set.repsMax : '') || ''
                              }
                              onChange={e =>
                                handleRepsMaxChange(Number(e.target.value))
                              }
                              placeholder="Max Reps"
                              className="input"
                            />
                          </>
                        ) : (
                          <input
                            type="number"
                            value={set.reps || ''}
                            onChange={e =>
                              handleRepsChange(Number(e.target.value))
                            }
                            placeholder="Reps"
                            className="input"
                          />
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {set.repType === 'time' ? (
                    <input
                      type="number"
                      value={set.duration || ''}
                      onChange={e =>
                        handleDurationChange(Number(e.target.value))
                      }
                      placeholder="Time"
                      className="input"
                    />
                  ) : (
                    <>
                      {dualProgression ? (
                        <>
                          <input
                            type="number"
                            value={('repsMin' in set ? set.repsMin : '') || ''}
                            onChange={e =>
                              handleRepsMinChange(Number(e.target.value))
                            }
                            placeholder="Min Reps"
                            className="input"
                          />
                          <input
                            type="number"
                            value={('repsMax' in set ? set.repsMax : '') || ''}
                            onChange={e =>
                              handleRepsMaxChange(Number(e.target.value))
                            }
                            placeholder="Max Reps"
                            className="input"
                          />
                        </>
                      ) : (
                        <input
                          type="number"
                          value={set.reps || ''}
                          onChange={e =>
                            handleRepsChange(Number(e.target.value))
                          }
                          placeholder="Reps"
                          className="input"
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {hasWeight(set) && (
            <input
              type="number"
              value={set.weight || ''}
              onChange={e => handleWeightChange(Number(e.target.value))}
              placeholder="Weight"
              className="input"
            />
          )}
          {hasRpe(set) && (
            <input
              type="number"
              value={set.rpe || ''}
              onChange={e => handleRpeChange(Number(e.target.value))}
              placeholder="RPE"
              min="1"
              max="10"
              className="input"
            />
          )}
          {hasDuration(set) && (
            <input
              type="number"
              value={set.duration || ''}
              onChange={e => handleDurationChange(Number(e.target.value))}
              placeholder="Duration"
              className="input"
            />
          )}
        </>
      )}

      {set.setType === 'warmup' && (
        <>
          {hasReps(set) && (
            <input
              type="number"
              value={set.reps || ''}
              onChange={e => handleRepsChange(Number(e.target.value))}
              placeholder="Reps"
              className="input"
            />
          )}
          {hasWeight(set) && (
            <input
              type="number"
              value={set.weight || ''}
              onChange={e => handleWeightChange(Number(e.target.value))}
              placeholder="Weight"
              className="input"
            />
          )}
        </>
      )}

      {set.setType === 'drop' && (
        <>
          {hasReps(set) && (
            <input
              type="number"
              value={set.reps || ''}
              onChange={e => handleRepsChange(Number(e.target.value))}
              placeholder="Reps"
              className="input"
            />
          )}
          {hasWeight(set) && (
            <input
              type="number"
              value={set.weight || ''}
              onChange={e => handleWeightChange(Number(e.target.value))}
              placeholder="Weight"
              className="input"
            />
          )}
        </>
      )}

      {set.setType === 'failure' && (
        <>
          {hasWeight(set) && (
            <input
              type="number"
              value={set.weight || ''}
              onChange={e => handleWeightChange(Number(e.target.value))}
              placeholder="Weight"
              className="input"
            />
          )}
          {hasRpe(set) && (
            <input
              type="number"
              value={set.rpe || ''}
              onChange={e => handleRpeChange(Number(e.target.value))}
              placeholder="RPE"
              min="1"
              max="10"
              className="input"
            />
          )}
        </>
      )}
    </div>
  );
};
