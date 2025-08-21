import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from '../button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithoutFooter: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card doesn't have a footer.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ContentOnly: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Card {...args}>
        <CardContent>
          <p>This card only has content without header or footer.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

