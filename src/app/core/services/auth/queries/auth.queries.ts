import { createPropertySelectors, createSelector } from '@ngxs/store';

import { AuthState, AuthStateModel } from '../state';

export const authSlice = createPropertySelectors<AuthStateModel>(AuthState);

export const token = createSelector([authSlice.apiResult], (apiResult) =>
  apiResult ? apiResult.token : '',
);

export const user = createSelector(
  [authSlice.apiResult],
  (apiResult) => apiResult?.user,
);
