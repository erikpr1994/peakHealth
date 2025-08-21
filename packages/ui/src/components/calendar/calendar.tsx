import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import type { DayPickerProps } from 'react-day-picker';
import './calendar.css';

import { cn } from '../../utils';

export interface CalendarProps {
  /**
   * Show days from the previous and next months
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Additional class name for the calendar
   */
  className?: string;
  /**
   * The mode of the calendar
   */
  mode?: 'single' | 'range' | 'multiple';
  /**
   * The selected date(s)
   */
  selected?: unknown;
  /**
   * Callback when a date is selected
   */
  onSelect?: unknown;
  /**
   * Other props to pass to the DayPicker component
   */
  [key: string]: unknown;
}

const Calendar = ({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('peakhealth-calendar', className)}
      classNames={{
        root: 'peakhealth-calendar',
        months: 'peakhealth-calendar__months',
        month: 'peakhealth-calendar__month',
        caption: 'peakhealth-calendar__caption',
        caption_label: 'peakhealth-calendar__caption-label',
        nav: 'peakhealth-calendar__nav',
        nav_button: 'peakhealth-calendar__nav-button',
        nav_button_previous: 'peakhealth-calendar__nav-button--previous',
        nav_button_next: 'peakhealth-calendar__nav-button--next',
        table: 'peakhealth-calendar__table',
        head_row: 'peakhealth-calendar__head-row',
        head_cell: 'peakhealth-calendar__head-cell',
        row: 'peakhealth-calendar__row',
        cell: cn(
          'peakhealth-calendar__cell',
          props.mode === 'range'
            ? 'peakhealth-calendar__cell--range'
            : 'peakhealth-calendar__cell--single'
        ),
        day: 'peakhealth-calendar__day',
        day_range_start: 'peakhealth-calendar__day--range-start',
        day_range_end: 'peakhealth-calendar__day--range-end',
        day_selected: 'peakhealth-calendar__day--selected',
        day_today: 'peakhealth-calendar__day--today',
        day_outside: 'peakhealth-calendar__day--outside',
        day_disabled: 'peakhealth-calendar__day--disabled',
        day_range_middle: 'peakhealth-calendar__day--range-middle',
        day_hidden: 'peakhealth-calendar__day--hidden',
      }}
      {...(props as any)}
    />
  );
};

Calendar.displayName = 'Calendar';

export { Calendar };
