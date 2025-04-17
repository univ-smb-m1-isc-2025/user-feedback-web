import { createPropertySelectors, createSelector } from '@ngxs/store';

import { FeedbackUpdateState, FeedbackUpdateStateModel } from '../state';

export const feedbackUpdateSlice =
  createPropertySelectors<FeedbackUpdateStateModel>(FeedbackUpdateState);

export const feedbackUpdateLoading = createSelector(
  [feedbackUpdateSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);
