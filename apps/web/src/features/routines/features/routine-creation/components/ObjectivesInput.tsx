'use client';

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ObjectivesInputProps {
  label: string;
  objectives: string[];
  onChange: (objectives: string[]) => void;
  placeholder?: string;
  className?: string;
}

const ObjectivesInput = ({
  label,
  objectives,
  onChange,
  placeholder = 'Type an objective and press Enter...',
  className = '',
}: ObjectivesInputProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newObjective = inputValue.trim();

      // Check if objective already exists
      if (!objectives.includes(newObjective)) {
        onChange([...objectives, newObjective]);
      }

      setInputValue('');
    }
  };

  const removeObjective = (objectiveToRemove: string): void => {
    onChange(objectives.filter(obj => obj !== objectiveToRemove));
  };

  return (
    <div className={className}>
      <Label className="block mb-2">{label}</Label>

      {/* Input field */}
      <Input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mb-3"
      />

      {/* Objectives chips */}
      {objectives.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {objectives.map((objective, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1 text-sm"
            >
              <span>{objective}</span>
              <button
                type="button"
                onClick={() => removeObjective(objective)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Help text */}
      <p className="text-sm text-gray-500 mt-2">
        Press Enter to add each objective. Click the X to remove.
      </p>
    </div>
  );
};

export default ObjectivesInput;
