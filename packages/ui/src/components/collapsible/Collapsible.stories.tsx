import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';
import { Button } from '../button';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state when initially rendered',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Event handler called when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the collapsible',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: args => (
    <Collapsible {...args} className="max-w-[350px]">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@peakhealth/ui collapsible</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="px-4 py-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          Main content that is always visible
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm mt-2">
            Hidden collapsible content
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            More hidden content
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'}
          </Button>
          <div>Current state: {isOpen ? 'Open' : 'Closed'}</div>
        </div>

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="max-w-[350px]"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Controlled Collapsible</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                Toggle
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="px-4 py-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              This collapsible is controlled externally
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm mt-2">
                This content can be controlled with the button above
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
};
