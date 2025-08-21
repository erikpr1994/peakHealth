'use client';

import { useRouter } from 'next/navigation';

export default function HelpSupportPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <p>Help and support feature coming soon!</p>
    </div>
  );
}
