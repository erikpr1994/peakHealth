import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { DynamicWeightInput, getWeightInputType } from '../DynamicWeightInput';

// Mock the Tooltip component
vi.mock('@peakhealth/ui', () => ({
  Tooltip: ({
    children,
    content,
  }: {
    children: React.ReactNode;
    content: string;
  }): React.ReactElement => (
    <div data-testid="tooltip" title={content}>
      {children}
    </div>
  ),
}));

describe('DynamicWeightInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('getWeightInputType', () => {
    it('should return bodyweight for pure bodyweight exercises', () => {
      expect(getWeightInputType(['Bodyweight'])).toBe('bodyweight');
    });

    it('should return bodyweight-plus for bodyweight + equipment exercises', () => {
      expect(getWeightInputType(['Bodyweight', 'Pull-up Bar'])).toBe(
        'bodyweight-plus'
      );
      expect(getWeightInputType(['Bodyweight', 'Dip Station'])).toBe(
        'bodyweight-plus'
      );
    });

    it('should return free-weight for barbell exercises', () => {
      expect(getWeightInputType(['Barbell'])).toBe('free-weight');
    });

    it('should return free-weight for dumbbell exercises', () => {
      expect(getWeightInputType(['Dumbbell'])).toBe('free-weight');
    });

    it('should return machine for machine exercises', () => {
      expect(getWeightInputType(['Machine'])).toBe('machine');
    });

    it('should return cable for cable exercises', () => {
      expect(getWeightInputType(['Cable'])).toBe('cable');
    });

    it('should return resistance-band for resistance band exercises', () => {
      expect(getWeightInputType(['Resistance Band'])).toBe('resistance-band');
    });

    it('should return bodyweight as default for empty equipment', () => {
      expect(getWeightInputType([])).toBe('bodyweight');
    });
  });

  describe('Bodyweight exercises', () => {
    it('should render disabled input with "Bodyweight" text', () => {
      render(
        <DynamicWeightInput
          value={null}
          onChange={mockOnChange}
          exerciseEquipment={['Bodyweight']}
          exerciseName="Push-ups"
        />
      );

      const input = screen.getByDisplayValue('Bodyweight');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('bg-gray-50', 'text-gray-600');
    });

    it('should show tooltip for bodyweight exercises', () => {
      render(
        <DynamicWeightInput
          value={null}
          onChange={mockOnChange}
          exerciseEquipment={['Bodyweight']}
          exerciseName="Push-ups"
        />
      );

      const tooltip = screen.getByTestId('tooltip');
      expect(tooltip).toHaveAttribute(
        'title',
        'Push-ups uses only your body weight. No additional weight needed.'
      );
    });
  });

  describe('Bodyweight + added weight exercises', () => {
    it('should render bodyweight display initially', () => {
      render(
        <DynamicWeightInput
          value={null}
          onChange={mockOnChange}
          exerciseEquipment={['Bodyweight', 'Pull-up Bar']}
          exerciseName="Pull-ups"
        />
      );

      const input = screen.getByDisplayValue('Bodyweight');
      expect(input).toBeDisabled();
    });

    it('should show "Bodyweight + X lbs" when weight is added', () => {
      render(
        <DynamicWeightInput
          value={25}
          onChange={mockOnChange}
          exerciseEquipment={['Bodyweight', 'Pull-up Bar']}
          exerciseName="Pull-ups"
        />
      );

      const input = screen.getByDisplayValue('Bodyweight + 25 lbs');
      expect(input).toBeDisabled();
    });

    it('should allow adding weight when + button is clicked', () => {
      render(
        <DynamicWeightInput
          value={null}
          onChange={mockOnChange}
          exerciseEquipment={['Bodyweight', 'Pull-up Bar']}
          exerciseName="Pull-ups"
        />
      );

      const addButton = screen.getByText('+');
      fireEvent.click(addButton);

      const weightInput = screen.getByPlaceholderText('0');
      expect(weightInput).toBeInTheDocument();
      expect(weightInput).not.toBeDisabled();
    });
  });

  describe('Free weight exercises', () => {
    it('should render standard number input', () => {
      render(
        <DynamicWeightInput
          value={135}
          onChange={mockOnChange}
          exerciseEquipment={['Barbell', 'Bench']}
          exerciseName="Bench Press"
        />
      );

      const input = screen.getByDisplayValue('135');
      expect(input).toHaveAttribute('type', 'number');
      expect(input).not.toBeDisabled();
    });

    it('should call onChange when value changes', () => {
      render(
        <DynamicWeightInput
          value={135}
          onChange={mockOnChange}
          exerciseEquipment={['Barbell', 'Bench']}
          exerciseName="Bench Press"
        />
      );

      const input = screen.getByDisplayValue('135');
      fireEvent.change(input, { target: { value: '155' } });

      expect(mockOnChange).toHaveBeenCalledWith(155);
    });
  });

  describe('Resistance band exercises', () => {
    it('should render band selection input', () => {
      render(
        <DynamicWeightInput
          value={3}
          onChange={mockOnChange}
          exerciseEquipment={['Resistance Band']}
          exerciseName="Band Rows"
        />
      );

      const input = screen.getByDisplayValue('Band 3');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Select band');
    });
  });
});
