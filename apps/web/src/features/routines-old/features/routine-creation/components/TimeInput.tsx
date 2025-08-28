'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatTimeDisplay, parseTimeDisplay } from '../../../utils/timeUtils';

interface TimeInputProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TimeInput = ({
  label,
  value,
  onChange,
  placeholder = 'e.g., 90s or 2:30',
  className = '',
}: TimeInputProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const isUserInputRef = useRef(false);

  // Initialize input value from the stored value
  useEffect(() => {
    // Only update from external value if it's not from user input
    if (!isUserInputRef.current) {
      if (value && value !== null) {
        const seconds = parseTimeDisplay(value);
        setInputValue(seconds.toString());
      } else {
        setInputValue('');
      }
    }
    // Reset the flag after handling the external change
    isUserInputRef.current = false;
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;

    // Remove any non-numeric characters except colon
    const cleanValue = newValue.replace(/[^0-9:]/g, '');

    // Handle different input formats
    if (cleanValue.includes(':')) {
      // Format: MM:SS
      const [minutes, seconds] = cleanValue.split(':').map(Number);
      const totalSeconds = (minutes || 0) * 60 + (seconds || 0);
      setInputValue(totalSeconds.toString());
      setIsValid(true);
      isUserInputRef.current = true;
      onChange(formatTimeDisplay(totalSeconds));
    } else {
      // Format: just seconds
      const seconds = parseInt(cleanValue) || 0;
      setInputValue(seconds.toString());
      setIsValid(seconds >= 0);
      if (seconds >= 0) {
        isUserInputRef.current = true;
        onChange(formatTimeDisplay(seconds));
      }
    }
  };

  const handleBlur = (): void => {
    // Ensure the display is properly formatted when user leaves the field
    if (inputValue && isValid) {
      const seconds = parseInt(inputValue) || 0;
      isUserInputRef.current = true;
      onChange(formatTimeDisplay(seconds));
    }
  };

  const getDisplayValue = (): string => {
    if (!inputValue) return '';

    const seconds = parseInt(inputValue) || 0;
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${inputValue}s`;
  };

  return (
    <div className={className}>
      <Label className="block mb-2">{label}</Label>
      <div className="relative">
        <Input
          type="text"
          value={getDisplayValue()}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`pr-12 ${!isValid ? 'border-red-500' : ''}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
          {inputValue && parseInt(inputValue) >= 60 ? 'min' : 'sec'}
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
