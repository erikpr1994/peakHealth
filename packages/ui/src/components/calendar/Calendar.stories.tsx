import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { addDays } from 'date-fns';
import { useState } from 'react';

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
      options: ['default', 'range', 'multiple'],
      description: 'Selection mode',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showOutsideDays: true,
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
};

export const WithSelectedDay: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    );
  },
  args: {},
};

export const WithRangeSelection: Story = {
  render: (args) => {
    const [range, setRange] = useState<{
      from: Date;
      to?: Date;
    }>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <Calendar
        {...args}
        mode="range"
        selected={range}
        onSelect={setRange}
      />
    );
  },
  args: {},
};

export const WithMultipleSelection: Story = {
  render: (args) => {
    const [days, setDays] = useState<Date[]>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ]);
    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={days}
        onSelect={setDays}
      />
    );
  },
  args: {},
};

export const WithFooter: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="space-y-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
        />
        <div className="text-center">
          <p>Selected date: {date?.toDateString()}</p>
        </div>
      </div>
    );
  },
  args: {},
};

