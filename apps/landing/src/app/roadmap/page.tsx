import React from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

const RoadmapPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Product Roadmap</h1>
            <p className="text-xl text-gray-600">
              See what we're building and vote on upcoming features
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                Our interactive roadmap is under development. Soon you'll be
                able to see our development timeline, vote on features, and
                track our progress.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  <strong>What to expect:</strong> Feature voting, development
                  timeline, progress tracking, and community feedback
                  integration.
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

export default RoadmapPage;
