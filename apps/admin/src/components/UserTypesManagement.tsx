'use client';

import React from 'react';
import { UserTypesManagement as UserTypesManagementFeature } from '../features/user-types-management';

interface UserTypesManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const UserTypesManagement = ({
  scopeInfo,
}: UserTypesManagementProps): React.JSX.Element => {
  return <UserTypesManagementFeature scopeInfo={scopeInfo} />;
};
