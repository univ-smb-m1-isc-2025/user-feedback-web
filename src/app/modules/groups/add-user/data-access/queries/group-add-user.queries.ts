import { createPropertySelectors, createSelector } from '@ngxs/store';

import { GroupAddUserStateModel } from '../state/group-add-user.models';
import { GroupAddUserState } from '../state/group-add-user.state';


export const groupAddUserSlice = 
  createPropertySelectors<GroupAddUserStateModel>(GroupAddUserState);

export const searchUsersLoading = createSelector(
  [groupAddUserSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);

export const searchUsersResults = createSelector(
  [groupAddUserSlice.searchResults],
  (searchResults) => searchResults,
);

export const addUserLoading = createSelector(
  [groupAddUserSlice.addUserStatus],
  (addUserStatus) => addUserStatus === 'loading',
);