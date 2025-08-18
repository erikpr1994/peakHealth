import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { CTASection } from '@/components/landing/CTASection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const HomePage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
};

export default HomePage;
