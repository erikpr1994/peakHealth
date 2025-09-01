import { useExercise } from '../../hooks/useExercise';
import { SetRow } from '../SetRow';
import type { SetsTableProps } from './SetsTable.types';
import styles from './SetsTable.module.css';

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
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => handleAddSet('warmup')}
        >
          + Add Warmup Set
        </button>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => handleAddSet('working')}
        >
          + Add Working Set
        </button>
      </div>

      <div className={styles.table}>
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
