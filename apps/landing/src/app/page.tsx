import { CTASection } from '@/components/landing/CTASection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

const HomePage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
