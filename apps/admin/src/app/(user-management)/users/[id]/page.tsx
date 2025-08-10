import React from 'react';

import { UserDetailPage } from '../../../../features/client-management/components/UserDetailPage';

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const UserDetailPageRoute = async ({
  params,
}: UserDetailPageProps): Promise<React.JSX.Element> => {
  const { id } = await params;
  return <UserDetailPage userId={id} />;
};

export default UserDetailPageRoute;
