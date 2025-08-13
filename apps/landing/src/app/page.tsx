import { CTASection } from '@/components/landing/CTASection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';

const HomePage = (): React.JSX.Element => {
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
