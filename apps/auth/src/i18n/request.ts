import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Define a safe function to load messages
const loadMessages = async (localeToLoad: string): Promise<Record<string, unknown>> => {
  // Use a static require to avoid dynamic import security issues
  if (localeToLoad === 'en') {
    return (await import('../../locales/en/index.json')).default;
  } else if (localeToLoad === 'es') {
    return (await import('../../locales/es/index.json')).default;
  }
  // Default fallback
  return (await import('../../locales/en/index.json')).default;
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  let validatedLocale = locale;
  if (!routing.locales.includes(validatedLocale)) {
    // If not supported, fall back to the default locale
    validatedLocale = routing.defaultLocale;
  }

  // Use a safe approach to import messages
  let messages;
  try {
    messages = await loadMessages(validatedLocale);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not load messages for locale "${validatedLocale}"`);
    // Fall back to default locale if messages can't be loaded
    if (validatedLocale !== routing.defaultLocale) {
      messages = await loadMessages(routing.defaultLocale);
    }
  }

  return { messages };
});
