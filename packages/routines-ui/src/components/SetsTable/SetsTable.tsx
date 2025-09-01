import { useExercise } from '../../hooks/useExercise';
import { SetRow } from '../SetRow';
import type { SetsTableProps } from './SetsTable.types';
import './SetsTable.css';

export const SetsTable = ({
  workoutId,
  sectionId,
  exerciseId,
}: SetsTableProps) => {
  const { setIds, addSet, exercise } = useExercise(
    workoutId,
    sectionId,
    exerciseId
  );

  if (!exercise) {
    return null;
  }

  const handleAddSet = (setType: 'warmup' | 'working') => {
    const newSetId = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Minimal canonical set; reducer assigns setNumber
    addSet({
      _id: newSetId,
      setNumber: 0,
      setType,
      repType: 'fixed',
    });
  };

  return (
    <div className="sets-table-container">
      <div className="sets-table-header">
        <button
          type="button"
          className="sets-table-add-button"
          onClick={() => handleAddSet('warmup')}
        >
          + Add Warmup Set
        </button>
        <button
          type="button"
          className="sets-table-add-button"
          onClick={() => handleAddSet('working')}
        >
          + Add Working Set
        </button>
      </div>

      <div className="sets-table">
        {setIds?.map(setId => (
          <SetRow
            key={setId}
            workoutId={workoutId}
            sectionId={sectionId}
            exerciseId={exerciseId}
            setId={setId}
          />
        ))}
      </div>
    </div>
  );
};
