import { User } from 'uf/core/services/auth/state';
import { ApiStatus } from 'uf/shared/models';

export interface GroupListStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: {
    data: Group[];
  };
}

export interface Group {
  id: number;
  name: string;
  description: string;
  owner: User;
}
