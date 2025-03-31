import { createPropertySelectors, createSelector } from '@ngxs/store';

import { FeedbackCreateState, FeedbackCreateStateModel } from '../state';

export const feedbackCreateSlice =
  createPropertySelectors<FeedbackCreateStateModel>(FeedbackCreateState);

export const feedbackCreateLoading = createSelector(
  [feedbackCreateSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);
