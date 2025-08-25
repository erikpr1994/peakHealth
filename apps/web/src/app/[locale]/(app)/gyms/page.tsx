'use client';

import { useRouter } from 'next/navigation';

export default function GymsPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gyms</h1>
      <p>Gym finder feature coming soon!</p>
    </div>
  );
}
