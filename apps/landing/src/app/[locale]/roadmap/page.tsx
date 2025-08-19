import React from 'react';
import { useTranslations } from 'next-intl';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const RoadmapPage = (): React.JSX.Element => {
  const t = useTranslations('pages.roadmap');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{t('comingSoon')}</h2>
          <p className="text-gray-600 mb-6">{t('description')}</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>{t('whatToExpect')}</strong> {t('featuresList')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
