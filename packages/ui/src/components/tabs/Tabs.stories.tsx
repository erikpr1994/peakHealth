import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: args => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Account Settings</h3>
          <p>
            Manage your account settings and preferences. You can update your
            profile information, email address, and notification preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Password Settings</h3>
          <p>
            Change your password and manage your security settings. We recommend
            using a strong, unique password for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">General Settings</h3>
          <p>
            Configure your application settings and preferences. You can adjust
            your theme, language, and other display options.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: args => (
    <Tabs defaultValue="tab1" orientation="vertical" {...args}>
      <div className="flex">
        <TabsList>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="tab1">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">Account Settings</h3>
              <p>
                Manage your account settings and preferences. You can update
                your profile information, email address, and notification
                preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">Password Settings</h3>
              <p>
                Change your password and manage your security settings. We
                recommend using a strong, unique password for your account.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">General Settings</h3>
              <p>
                Configure your application settings and preferences. You can
                adjust your theme, language, and other display options.
              </p>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: args => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Password
        </TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Account Settings</h3>
          <p>
            Manage your account settings and preferences. You can update your
            profile information, email address, and notification preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Password Settings</h3>
          <p>
            Change your password and manage your security settings. We recommend
            using a strong, unique password for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">General Settings</h3>
          <p>
            Configure your application settings and preferences. You can adjust
            your theme, language, and other display options.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('tab1');

    return (
      <div>
        <div className="mb-4">
          <p>Current tab: {value}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setValue('tab1')}
              className="px-3 py-1 border rounded"
            >
              Go to Account
            </button>
            <button
              onClick={() => setValue('tab2')}
              className="px-3 py-1 border rounded"
            >
              Go to Password
            </button>
            <button
              onClick={() => setValue('tab3')}
              className="px-3 py-1 border rounded"
            >
              Go to Settings
            </button>
          </div>
        </div>

        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">Account Settings</h3>
              <p>
                Manage your account settings and preferences. You can update
                your profile information, email address, and notification
                preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">Password Settings</h3>
              <p>
                Change your password and manage your security settings. We
                recommend using a strong, unique password for your account.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">General Settings</h3>
              <p>
                Configure your application settings and preferences. You can
                adjust your theme, language, and other display options.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};
