import { createPropertySelectors, createSelector } from '@ngxs/store';

import { GroupCreateState, GroupCreateStateModel } from '../state';

export const groupCreateSlice =
  createPropertySelectors<GroupCreateStateModel>(GroupCreateState);

export const groupCreateLoading = createSelector(
  [groupCreateSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);
