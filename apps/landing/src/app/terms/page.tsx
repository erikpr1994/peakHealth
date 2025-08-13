import React from 'react';

const TermsPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600">
          Our terms and conditions for using PeakHealth
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Our terms of service are being finalized. We're working to ensure
            clear and fair terms for all users.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>What we're working on:</strong> Clear terms of use, user
              rights and responsibilities, service limitations, and dispute
              resolution processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
