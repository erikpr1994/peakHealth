import React from 'react';
import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

const NotFound = (): React.JSX.Element => {
  redirect(`/${routing.defaultLocale}/login`);
  // This is unreachable, but needed for TypeScript
  return <></>;
};

export default NotFound;
