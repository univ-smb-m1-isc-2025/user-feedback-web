import { ApiStatus } from 'uf/shared/models';

export interface GroupCreateStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: GroupCreateApiResult | undefined;
}

export interface GroupCreateApiResult {
  id: number;
  name: string;
  description: string;
}

export interface GroupCreateBody {
  name: string;
  description: string;
}
