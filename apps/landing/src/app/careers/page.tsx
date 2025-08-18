import React from 'react';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const CareersPage = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600">
          Help us build the future of fitness technology
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
          <p className="text-gray-600 mb-6">
            We're currently not actively searching for new employees, but we're
            always interested in connecting with talented individuals who share
            our passion for fitness and technology.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Open CV Policy:</strong> We welcome and review all open
              CVs from passionate developers, designers, and fitness enthusiasts
              who want to make a difference in the fitness industry.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              What We're Looking For
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Passionate developers with React/Next.js experience</li>
              <li>• UI/UX designers who understand fitness workflows</li>
              <li>• Product managers with health/fitness domain knowledge</li>
              <li>• Fitness enthusiasts who understand user needs</li>
              <li>• Team players who value collaboration and innovation</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Our Culture
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Remote-first work environment</li>
              <li>• Flexible working hours</li>
              <li>• Continuous learning and development</li>
              <li>• Health and fitness focused benefits</li>
              <li>• Collaborative and supportive team</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">How to Apply</h3>
          <p className="text-gray-600 mb-4">
            Send your CV and a brief introduction to:
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-semibold">
              📧{' '}
              <a href="mailto:info@peakhealth.es" className="hover:underline">
                info@peakhealth.es
              </a>
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We'll review your application and reach out if there's a potential
            fit for future opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
