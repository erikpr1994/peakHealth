import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage(): Promise<never> {
  // Get the headers to detect the browser language
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Parse Accept-Language header to find the preferred language
  const parseAcceptLanguage = (acceptLanguage: string): string => {
    if (!acceptLanguage) return 'en';

    // Split by comma and parse each language tag
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [language, quality = 'q=1.0'] = lang.trim().split(';');
        const q = parseFloat(quality.replace('q=', ''));
        return { language: language.toLowerCase().split('-')[0], q };
      })
      .sort((a, b) => b.q - a.q); // Sort by quality (highest first)

    // Find the first supported language
    for (const { language } of languages) {
      if (language === 'es') return 'es';
      if (language === 'en') return 'en';
    }

    return 'en'; // Default fallback
  };

  const preferredLocale = parseAcceptLanguage(acceptLanguage);

  // Redirect to the detected locale
  redirect(`/${preferredLocale}/login`);
}
