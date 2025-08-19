'use client';

import { useHypertune } from '../../generated/hypertune.react';

export function HypertuneTest(): React.JSX.Element {
  const hypertune = useHypertune();
  const roadmapEnabled = hypertune.roadmap({ fallback: false });

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Hypertune Test</h2>
      <p>
        Roadmap feature flag is:{' '}
        <span className={roadmapEnabled ? 'text-green-600' : 'text-red-600'}>
          {roadmapEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </p>
    </div>
  );
}
