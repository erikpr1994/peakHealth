import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

// Import the English translations
import enMessages from '../locales/en/common.json';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: Record<string, unknown>;
}

const AllTheProviders = ({
  children,
  locale = 'en',
  messages = enMessages,
}: {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
}): React.JSX.Element => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): ReturnType<typeof render> => {
  const { locale, messages, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders locale={locale} messages={messages}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
