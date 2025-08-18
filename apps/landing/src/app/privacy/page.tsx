import React from 'react';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const PrivacyPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          How we protect and handle your data
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Our comprehensive privacy policy is being developed. We're committed
            to transparency and protecting your personal information.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              <strong>Our commitment:</strong> We value your privacy and will
              provide clear information about how we collect, use, and protect
              your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
