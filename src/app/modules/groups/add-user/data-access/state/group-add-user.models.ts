import { User } from 'uf/core/services/auth/state';

export type ApiStatus = 'loading' | 'success' | 'error';

export interface GroupAddUserStateModel {
  apiStatus: ApiStatus | undefined;
  searchResults: User[];
  addUserStatus: ApiStatus | undefined;
}

export interface AddUserToGroupResponse {
  message: string;
  success: boolean;
}