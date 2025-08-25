'use client';

import { useRouter } from 'next/navigation';

export default function HealthPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Health</h1>
      <p>Health tracking feature coming soon!</p>
    </div>
  );
}
