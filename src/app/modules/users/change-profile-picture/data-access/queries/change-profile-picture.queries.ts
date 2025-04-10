import { createPropertySelectors, createSelector } from '@ngxs/store';

import {
  ChangeProfilePictureState,
  ChangeProfilePictureStateModel,
} from '../state';

export const changeProfilePictureSlice =
  createPropertySelectors<ChangeProfilePictureStateModel>(
    ChangeProfilePictureState,
  );

export const changeProfilePictureLoading = createSelector(
  [changeProfilePictureSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);
