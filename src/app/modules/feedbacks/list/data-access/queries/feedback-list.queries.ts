import { createPropertySelectors, createSelector } from '@ngxs/store';

import { FeedbackListState, FeedbackListStateModel } from '../state';

export const feedbackListSlice =
  createPropertySelectors<FeedbackListStateModel>(FeedbackListState);

export const feedbackListLoading = createSelector(
  [feedbackListSlice.apiStatus],
  (apiStatus) => apiStatus === 'loading',
);

export const feedbackList = createSelector(
  [feedbackListSlice.apiResult],
  (apiResult) => apiResult.data,
);
