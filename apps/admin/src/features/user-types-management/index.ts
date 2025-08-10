export { UserTypesManagement } from './components/UserTypesManagement';
export { UserTypesTable } from './components/UserTypesTable';
export { UserGroupsSection } from './components/UserGroupsSection';
export { PermissionsDialog } from './components/PermissionsDialog';
export { AddUserTypeDialog } from './components/AddUserTypeDialog';

export { useUserTypes } from './hooks/useUserTypes';
export { useUserGroups } from './hooks/useUserGroups';

export { UserTypesService } from './services/userTypesService';

export type {
  UserType,
  UserGroup,
  CreateUserTypeRequest,
  UpdateUserTypeRequest,
  CreateUserGroupRequest,
  UpdateUserGroupRequest,
  UserTypesManagementProps,
} from './types';
