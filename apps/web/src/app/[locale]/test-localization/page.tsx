'use client';

import { useTranslations } from 'next-intl';

export default function TestLocalizationPage(): React.JSX.Element {
  const t = useTranslations('common');
  const tNav = useTranslations('navigation');

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Localization Test Page</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Common Translations</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Loading:</strong> {t('loading')}
            </div>
            <div>
              <strong>Error:</strong> {t('error')}
            </div>
            <div>
              <strong>Success:</strong> {t('success')}
            </div>
            <div>
              <strong>Save:</strong> {t('save')}
            </div>
            <div>
              <strong>Cancel:</strong> {t('cancel')}
            </div>
            <div>
              <strong>Delete:</strong> {t('delete')}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Navigation Translations
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Dashboard:</strong> {tNav('dashboard')}
            </div>
            <div>
              <strong>Routines:</strong> {tNav('routines')}
            </div>
            <div>
              <strong>Exercises:</strong> {tNav('exercises')}
            </div>
            <div>
              <strong>Profile:</strong> {tNav('profile')}
            </div>
            <div>
              <strong>Settings:</strong> {tNav('settings')}
            </div>
            <div>
              <strong>Sign Out:</strong> {tNav('signOut')}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Dashboard Translations</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Welcome:</strong>{' '}
              {useTranslations('dashboard')('welcome')}
            </div>
            <div>
              <strong>Today's Workout:</strong>{' '}
              {useTranslations('dashboard')('todayWorkout')}
            </div>
            <div>
              <strong>Start Workout:</strong>{' '}
              {useTranslations('dashboard')('startWorkout')}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
