import { createPropertySelectors, createSelector } from '@ngxs/store';

import { GroupDetailsStateModel } from './group-details.models';
import { GroupDetailsState } from './group-details.state';

export const groupDetailsSlice =
  createPropertySelectors<GroupDetailsStateModel>(GroupDetailsState);

export const groupDetailsLoading = createSelector(
  [groupDetailsSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);

export const groupDetails = createSelector(
  [groupDetailsSlice.apiResult],
  (apiResult) => apiResult,
);

export const subgroups = createSelector(
  [groupDetails],
  (groupDetails) => groupDetails?.subgroups ?? [],
);
