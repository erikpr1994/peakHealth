'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from './AuthCard';

interface BackButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const BackButton: React.FC<BackButtonProps> = ({
  className,
  variant = 'secondary',
  size = 'md',
}): React.JSX.Element => {
  const t = useTranslations('common');
  const locale = useLocale();

  const handleGoBack = (): void => {
    // Redirect to the landing page with the current locale
    // In production, this will be the root domain
    // In development, this will be the landing app URL
    const landingUrl =
      process.env.NODE_ENV === 'production'
        ? `https://peakhealth.es/${locale}`
        : `http://localhost:3024/${locale}`;

    window.location.href = landingUrl;
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleGoBack}
    >
      {t('back')}
    </Button>
  );
};
