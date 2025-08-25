'use client';

import { useRouter } from 'next/navigation';

export default function AccountSettingsPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <p>Account settings feature coming soon!</p>
    </div>
  );
}
