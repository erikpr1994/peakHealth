import { CTASection } from '@/components/landing/CTASection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { TestimonialSection } from '@/components/landing/TestimonialSection';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
