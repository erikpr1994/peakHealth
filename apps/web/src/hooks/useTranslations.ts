import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslations(namespace?: string): ReturnType<typeof useNextIntlTranslations> {
  return useNextIntlTranslations(namespace);
}
