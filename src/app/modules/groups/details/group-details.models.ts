import { ApiStatus } from 'uf/shared/models';

import { Group } from '../list/data-access/state';

export interface GroupDetailsStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: Group | undefined;
}
