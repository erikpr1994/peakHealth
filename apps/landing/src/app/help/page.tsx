import React from 'react';

const HelpPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-xl text-gray-600">
          Find answers to your questions and get support
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Our comprehensive help center is being built. Soon you'll have
            access to guides, tutorials, FAQs, and direct support.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>What you'll find here:</strong> User guides, tutorials,
              frequently asked questions, troubleshooting, and support contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
