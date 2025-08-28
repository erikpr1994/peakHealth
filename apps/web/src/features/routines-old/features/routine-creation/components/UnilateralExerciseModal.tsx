'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnilateralMode } from '@/features/routines-old/types/exercise';
import styles from './UnilateralExerciseModal.module.css';

interface UnilateralExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mode: UnilateralMode) => void;
  exerciseName: string;
}

const UnilateralExerciseModal = ({
  isOpen,
  onClose,
  onConfirm,
  exerciseName,
}: UnilateralExerciseModalProps): React.ReactElement => {
  const [selectedMode, setSelectedMode] = useState<UnilateralMode | null>(null);

  const handleConfirm = (): void => {
    if (selectedMode) {
      onConfirm(selectedMode);
      setSelectedMode(null); // Reset the selection
    }
  };

  const handleModeSelect = (mode: UnilateralMode): void => {
    setSelectedMode(mode);
  };

  const handleClose = (): void => {
    setSelectedMode(null);
    onClose();
  };

  const modes = [
    {
      id: 'alternating' as const,
      title: 'Alternating',
      description: 'Each set performed on both sides (left + right)',
      icon: ArrowLeft,
      benefits: [
        'Balanced workload per set',
        'Efficient time usage',
        'Good for coordination',
      ],
      example: 'Set 1: 12 reps left + 12 reps right = 24 total',
    },
    {
      id: 'sequential' as const,
      title: 'Sequential',
      description: 'Sets alternate between left and right sides',
      icon: ArrowRight,
      benefits: [
        'Focus on one side per set',
        'Clear side progression',
        'Easier to track',
      ],
      example: 'Set 1: Left, Set 2: Right, Set 3: Left, Set 4: Right',
    },
    {
      id: 'simultaneous' as const,
      title: 'Simultaneous',
      description: 'Perform both sides at the same time',
      icon: Zap,
      benefits: [
        'Faster completion',
        'Good for compound movements',
        'Balanced effort',
      ],
      example: 'Both arms curl together (like hammer curls)',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={styles.modalContent}>
        <DialogHeader className={styles.header}>
          <DialogTitle className={styles.title}>
            Unilateral Exercise Setup
          </DialogTitle>
          <DialogDescription className={styles.description}>
            Choose how you want to perform{' '}
            <strong className={styles.exerciseName}>{exerciseName}</strong>.
            This exercise can be performed on each side separately.
          </DialogDescription>
        </DialogHeader>

        <div className={styles.container}>
          <div className={styles.grid}>
            {modes.map(mode => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <Card
                  key={mode.id}
                  className={`${styles.card} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className={styles.cardContent}>
                    {/* Header with icon and title */}
                    <div className={styles.cardHeader}>
                      <div
                        className={`${styles.iconContainer} ${isSelected ? styles.selected : ''}`}
                      >
                        <Icon
                          className={`${styles.icon} ${isSelected ? styles.selected : ''}`}
                        />
                      </div>
                      <div className={styles.cardTitle}>
                        <h3 className={styles.titleText}>{mode.title}</h3>
                        {isSelected && (
                          <Badge variant="secondary" className={styles.badge}>
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className={styles.description}>{mode.description}</p>

                    {/* Benefits section */}
                    <div className={styles.section}>
                      <p className={styles.sectionTitle}>Benefits:</p>
                      <ul className={styles.benefitsList}>
                        {mode.benefits.map((benefit, index) => (
                          <li key={index} className={styles.benefitItem}>
                            <span className={styles.bullet}></span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Example section */}
                    <div className={styles.exampleSection}>
                      <p className={styles.exampleTitle}>Example:</p>
                      <p className={styles.exampleText}>{mode.example}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className={styles.actions}>
            <Button
              variant="outline"
              onClick={handleClose}
              className={styles.button}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedMode}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnilateralExerciseModal;
