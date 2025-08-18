import React from 'react';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const FeedbackPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Feedback & Suggestions</h1>
        <p className="text-xl text-gray-600">
          Help shape the future of PeakHealth with your ideas
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Our feedback system is being built. Soon you'll be able to submit
            feature requests, report bugs, and vote on community suggestions.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800">
              <strong>What you'll be able to do:</strong> Submit feature
              requests, vote on ideas, report issues, and track your
              suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
