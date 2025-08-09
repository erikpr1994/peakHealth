'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Calendar from '@/features/calendar/Calendar';
import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';

const CalendarPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([FEATURE_FLAGS.CALENDAR_FEATURE]);
  const isEnabled = flags[FEATURE_FLAGS.CALENDAR_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <Calendar />;
};

export default CalendarPage;
