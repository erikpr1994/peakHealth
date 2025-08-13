import React from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

const FeaturesPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Features</h1>
            <p className="text-xl text-gray-600">
              Discover what makes PeakHealth the ultimate workout tracking
              platform
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you detailed information about all
                our features. Check back soon for a comprehensive overview of
                what PeakHealth has to offer.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Core Features:</strong> Workout logging, progress
                  tracking, personal records, exercise library, and
                  community-driven development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
