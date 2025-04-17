import { createPropertySelectors, createSelector } from '@ngxs/store';

import {
  GroupNotJoinedListState,
  GroupNotJoinedListStateModel,
} from '../state';

export const groupNotJoinedListSlice =
  createPropertySelectors<GroupNotJoinedListStateModel>(
    GroupNotJoinedListState,
  );

export const groupNotJoinedLoading = createSelector(
  [groupNotJoinedListSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);

export const groupNotJoined = createSelector(
  [groupNotJoinedListSlice.apiResult],
  (apiResult) => apiResult.data,
);
