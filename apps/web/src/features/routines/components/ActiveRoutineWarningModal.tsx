import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

import { Button } from '@peakhealth/ui';

interface ActiveRoutineWarningModalProps {
  isOpen: boolean;
  currentActiveRoutineName: string;
  newRoutineName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ActiveRoutineWarningModal = ({
  isOpen,
  currentActiveRoutineName,
  newRoutineName,
  onConfirm,
  onCancel,
}: ActiveRoutineWarningModalProps): React.ReactElement | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
        data-testid="modal-backdrop"
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Active Routine Warning
            </h3>
            <p className="text-sm text-gray-600">
              You already have an active routine
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            You currently have <strong>{currentActiveRoutineName}</strong> set
            as your active routine.
          </p>
          <p className="text-gray-700 mb-4">
            If you activate <strong>{newRoutineName}</strong>, it will:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Deactivate your current routine</li>
            <li>Clear all scheduled workouts for the current routine</li>
            <li>Generate new scheduled workouts for the selected routine</li>
          </ul>
          <p className="text-gray-700">Are you sure you want to proceed?</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700"
          >
            <Check className="w-4 h-4" />
            Activate New Routine
          </Button>
        </div>
      </div>
    </div>
  );
};
