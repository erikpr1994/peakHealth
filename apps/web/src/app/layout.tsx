import type { Metadata } from 'next';

import '@peakhealth/ui/design-system';
import '@peakhealth/ui/components';
import { Providers } from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'Peak Health',
  description:
    'Your ultimate companion for tracking workouts, monitoring progress, and achieving your fitness goals.',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
