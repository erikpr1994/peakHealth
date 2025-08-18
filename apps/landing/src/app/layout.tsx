import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peak Health - Your Ultimate Fitness Companion',
  description:
    'Track workouts, monitor progress, and achieve your fitness goals with Peak Health. Join thousands of users transforming their fitness journey.',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return <>{children}</>;
};

export default RootLayout;
