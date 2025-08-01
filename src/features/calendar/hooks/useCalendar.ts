import { useState } from 'react';

import { ViewMode } from '../types';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 22)); // July 22, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 22)); // July 22, 2025
  const [viewMode, setViewMode] = useState<ViewMode>('Month');

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    const today = new Date(2025, 6, 22); // July 22, 2025
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return {
    currentDate,
    selectedDate,
    viewMode,
    setCurrentDate,
    setSelectedDate,
    setViewMode,
    navigateMonth,
    navigateToToday,
  };
};
