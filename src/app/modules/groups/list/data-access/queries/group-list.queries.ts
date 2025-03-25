import { createPropertySelectors, createSelector } from '@ngxs/store';

import { GroupListState, GroupListStateModel } from '../state';

export const groupListSlice =
  createPropertySelectors<GroupListStateModel>(GroupListState);

export const groupListLoading = createSelector(
  [groupListSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);

export const groupList = createSelector(
  [groupListSlice.apiResult],
  (apiResult) => apiResult.data,
);
