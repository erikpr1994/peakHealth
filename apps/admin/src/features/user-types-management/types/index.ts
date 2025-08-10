export interface UserType {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  userCount: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserTypeRequest {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive?: boolean;
  isDefault?: boolean;
}

export interface UpdateUserTypeRequest {
  displayName?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
  isDefault?: boolean;
}

export interface CreateUserGroupRequest {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive?: boolean;
}

export interface UpdateUserGroupRequest {
  displayName?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
}

export interface UserTypesManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}
