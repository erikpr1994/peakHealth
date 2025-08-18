import React from 'react';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const ContactPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Get in touch with the PeakHealth team
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            We'd Love to Hear from You
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you have questions about our platform, want to provide
            feedback, or are interested in partnerships, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              For general inquiries, support, or feedback:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-semibold">
                📧{' '}
                <a href="mailto:info@peakhealth.es" className="hover:underline">
                  info@peakhealth.es
                </a>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Response Time
            </h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24-48 hours during
              business days. For urgent matters, please include "URGENT" in your
              subject line.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 text-xl">💬</span>
            </div>
            <h4 className="font-semibold mb-2">General Support</h4>
            <p className="text-sm text-gray-600">
              Questions about features, account issues, or general help
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">💡</span>
            </div>
            <h4 className="font-semibold mb-2">Feature Requests</h4>
            <p className="text-sm text-gray-600">
              Suggestions for new features or improvements
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">🤝</span>
            </div>
            <h4 className="font-semibold mb-2">Partnerships</h4>
            <p className="text-sm text-gray-600">
              Business opportunities and collaboration inquiries
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Note:</strong> Our contact form is currently being
              developed. For now, please use the email address above to reach us
              directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
