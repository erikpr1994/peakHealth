import type { Preview } from '@storybook/react-vite';
import * as React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a202c',
        },
        {
          name: 'gray',
          value: '#f7fafc',
        },
      ],
    },
  },
  decorators: [
    Story => {
      return React.createElement(
        'div',
        {
          style: {
            '--primary': '220 14% 96%',
            '--primary-foreground': '220 9% 46%',
            '--secondary': '220 14% 96%',
            '--secondary-foreground': '220 9% 46%',
            '--muted': '220 14% 96%',
            '--muted-foreground': '220 8% 46%',
            '--accent': '220 14% 96%',
            '--accent-foreground': '220 9% 46%',
            '--destructive': '0 84% 60%',
            '--destructive-foreground': '0 0% 98%',
            '--border': '220 13% 91%',
            '--input': '220 13% 91%',
            '--ring': '220 9% 46%',
            '--background': '0 0% 100%',
            '--foreground': '220 9% 46%',
          } as React.CSSProperties,
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
