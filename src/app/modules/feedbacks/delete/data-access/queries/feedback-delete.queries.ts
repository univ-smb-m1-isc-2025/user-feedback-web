import { createPropertySelectors, createSelector } from '@ngxs/store';

import { FeedbackDeleteState, FeedbackDeleteStateModel } from '../state';

export const feedbackDeleteSlice =
  createPropertySelectors<FeedbackDeleteStateModel>(FeedbackDeleteState);

export const feedbackDeleteLoading = createSelector(
  [feedbackDeleteSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);
