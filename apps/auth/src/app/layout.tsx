import type { Metadata } from 'next';
import React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'PeakHealth Auth',
  description: 'Centralized authentication for PeakHealth platform',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <html lang="en">
      <body>
        <div className="auth-container">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

