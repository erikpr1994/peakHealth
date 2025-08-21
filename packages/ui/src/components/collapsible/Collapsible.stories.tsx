import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';
import { Button } from '../button';
import './stories.css';

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
    <Collapsible {...args} className="collapsible-demo">
      <div className="collapsible-header">
        <h4 className="collapsible-title">@peakhealth/ui collapsible</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="collapsible-container">
        <div className="collapsible-item">
          Main content that is always visible
        </div>
        <CollapsibleContent className="collapsible-content-demo">
          <div className="collapsible-item collapsible-item-hidden">
            Hidden collapsible content
          </div>
          <div className="collapsible-item">More hidden content</div>
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
      <div className="collapsible-story-container">
        <div className="collapsible-controls">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'}
          </Button>
          <div className="collapsible-state">
            Current state: {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="collapsible-demo"
        >
          <div className="collapsible-header">
            <h4 className="collapsible-title">Controlled Collapsible</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                Toggle
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="collapsible-container">
            <div className="collapsible-item">
              This collapsible is controlled externally
            </div>
            <CollapsibleContent className="collapsible-content-demo">
              <div className="collapsible-item collapsible-item-hidden">
                This content can be controlled with the button above
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
};
