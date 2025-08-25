'use client';

import { useRouter } from 'next/navigation';

export default function SuggestionsPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Suggestions</h1>
      <p>Workout suggestions feature coming soon!</p>
    </div>
  );
}
