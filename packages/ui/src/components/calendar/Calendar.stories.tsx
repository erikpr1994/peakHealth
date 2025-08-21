import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { addDays } from 'date-fns';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from the previous and next months',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Selection mode',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    mode: 'single',
    showOutsideDays: false,
  },
};

export const WithSelectedDay: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
  args: {
    mode: 'single',
  },
};

export const WithRangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return <Calendar mode="range" selected={range} onSelect={setRange} />;
  },
  args: {
    mode: 'range',
  },
};

export const WithMultipleSelection: Story = {
  render: () => {
    const [days, setDays] = useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ]);

    return <Calendar mode="multiple" selected={days} onSelect={setDays} />;
  },
  args: {
    mode: 'multiple',
  },
};

export const WithFooter: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="text-center">
          <p>Selected date: {date?.toDateString()}</p>
        </div>
      </div>
    );
  },
  args: {
    mode: 'single',
  },
};
