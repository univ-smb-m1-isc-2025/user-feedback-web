import { ApiStatus } from 'uf/shared/models';

import { Group } from '../list/data-access/state';

export interface GroupDetailsStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: GroupDetails | undefined;
}

export interface GroupDetails extends Group {
  subgroups: Group[];
  subgroupsLoading: ApiStatus | undefined;
}
