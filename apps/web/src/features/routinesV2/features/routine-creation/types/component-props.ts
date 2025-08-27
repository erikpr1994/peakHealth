import type { RoutineCreationData } from './routine';

export interface RoutineDetailsProps {
  data: RoutineCreationData;
  onUpdate: (updates: Partial<RoutineCreationData>) => void;
}

export interface RoutineHeaderProps {
  mode: 'create' | 'edit';
  onSave: () => void;
  onCancel: () => void;
}
