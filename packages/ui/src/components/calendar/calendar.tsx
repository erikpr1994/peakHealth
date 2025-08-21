import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import './calendar.css';

import { cn } from '../../utils';

export interface CalendarProps extends React.ComponentProps<typeof DayPicker> {
  /**
   * Show days from the previous and next months
   * @default true
   */
  showOutsideDays?: boolean;
}

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('peakhealth-calendar', className)}
      classNames={{
        months: 'peakhealth-calendar__months',
        month: 'peakhealth-calendar__month',
        caption: 'peakhealth-calendar__caption',
        caption_label: 'peakhealth-calendar__caption-label',
        nav: 'peakhealth-calendar__nav',
        nav_button: cn('peakhealth-calendar__nav-button'),
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
        day: cn('peakhealth-calendar__day'),
        day_range_start: 'peakhealth-calendar__day--range-start',
        day_range_end: 'peakhealth-calendar__day--range-end',
        day_selected: 'peakhealth-calendar__day--selected',
        day_today: 'peakhealth-calendar__day--today',
        day_outside: 'peakhealth-calendar__day--outside',
        day_disabled: 'peakhealth-calendar__day--disabled',
        day_range_middle: 'peakhealth-calendar__day--range-middle',
        day_hidden: 'peakhealth-calendar__day--hidden',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <span className="peakhealth-calendar__icon peakhealth-calendar__icon--left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
        ),
        IconRight: () => (
          <span className="peakhealth-calendar__icon peakhealth-calendar__icon--right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        ),
      }}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';

export { Calendar };

