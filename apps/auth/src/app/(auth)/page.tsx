import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

export default function AuthRootPage() {
  redirect(`/${routing.defaultLocale}/login`);
}

