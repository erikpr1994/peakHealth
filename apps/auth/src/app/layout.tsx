import type { Metadata } from 'next';
import React from 'react';

import './globals.css';
import '@peakhealth/ui/design-system';
import '@peakhealth/ui/components';

export const metadata: Metadata = {
  title: 'PeakHealth Auth',
  description: 'Centralized authentication for PeakHealth platform',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return <>{children}</>;
};

export default RootLayout;
