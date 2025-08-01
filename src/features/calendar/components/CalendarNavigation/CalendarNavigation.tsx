import { ChevronLeft, ChevronRight } from 'lucide-react';

import { months } from '../../config/workoutTypes';
import { ViewMode } from '../../types';

import styles from './CalendarNavigation.module.css';

import { Button } from '@/components/ui/button';

interface CalendarNavigationProps {
  currentDate: Date;
  viewMode: ViewMode;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onNavigateToToday: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const CalendarNavigation = ({
  currentDate,
  viewMode,
  onNavigateMonth,
  onNavigateToToday,
  onViewModeChange,
}: CalendarNavigationProps) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    <div className={styles.navigation}>
      <div className={styles.leftSection}>
        <h2 className={styles.title}>
          {months[currentMonth]} {currentYear}
        </h2>
        <div className={styles.controls}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateMonth('prev')}
            className={styles.navButton}
          >
            <ChevronLeft className={styles.icon} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateMonth('next')}
            className={styles.navButton}
          >
            <ChevronRight className={styles.icon} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToToday}
            className={styles.todayButton}
          >
            Today
          </Button>
        </div>
      </div>

      <div className={styles.viewModeSelector}>
        {(['Month', 'Week', 'Day'] as ViewMode[]).map(mode => (
          <Button
            key={mode}
            variant={viewMode === mode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange(mode)}
            className={`${styles.viewModeButton} ${
              viewMode === mode ? styles.active : ''
            }`}
          >
            {mode}
          </Button>
        ))}
      </div>
    </div>
  );
};
