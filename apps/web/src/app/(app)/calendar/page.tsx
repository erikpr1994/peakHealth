'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import Calendar from '@/features/calendar/Calendar';
import { FEATURE_FLAGS } from '@/features/feature-flags';

const CalendarPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.CALENDAR_FEATURE}>
      <Calendar />
    </FeatureFlagProtected>
  );
};

export default CalendarPage;
