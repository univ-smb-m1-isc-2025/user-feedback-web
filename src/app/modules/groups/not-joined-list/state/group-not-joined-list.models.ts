import { ApiStatus } from 'uf/shared/models';

import { Group } from '../../list/data-access/state';

export interface GroupNotJoinedListStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: {
    data: Group[];
  };
}
