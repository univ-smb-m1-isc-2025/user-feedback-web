import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { catchError, Observable, switchMap } from 'rxjs';

import * as feedbackListActions from './feedback-list.actions';
import {
  Comment,
  Feedback,
  FeedbackListStateModel,
} from './feedback-list.models';
import { FeedbackListService } from './feedback-list.service';
import { feedbackUpdateActions } from '../../../update/data-access/state';

export const initialState: FeedbackListStateModel = {
  apiStatus: undefined,
  apiResult: {
    data: [],
  },
};

@State<FeedbackListStateModel>({
  name: 'feedbackList',
  defaults: initialState,
})
@Injectable()
export class FeedbackListState {
  readonly #feedbackListService = inject(FeedbackListService);

  @Action(feedbackListActions.GetFeedbackList)
  getFeedbackList(
    context: StateContext<FeedbackListStateModel>,
    { groupId }: feedbackListActions.GetFeedbackList,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#feedbackListService.getList(groupId).pipe(
      switchMap((apiResult: Feedback[]) => {
        return context.dispatch(
          new feedbackListActions.GetFeedbackListSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new feedbackListActions.GetFeedbackListFailed(error),
        );
      }),
    );
  }

  @Action(feedbackListActions.GetFeedbackListSuccess)
  getFeedbackListSuccess(
    context: StateContext<FeedbackListStateModel>,
    { apiResult }: feedbackListActions.GetFeedbackListSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult: patch({
          data: apiResult.map((feedback: Feedback) => ({
            ...feedback,
            comment: [],
          })),
        }),
      }),
    );
  }

  @Action(feedbackListActions.GetFeedbackListFailed)
  getFeedbackListFailed(context: StateContext<FeedbackListStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }

  @Action(feedbackListActions.GetCommentList)
  getCommentList(
    context: StateContext<FeedbackListStateModel>,
    { feedbackId }: feedbackListActions.GetCommentList,
  ): Observable<void> {
    context.setState(
      patch({
        apiResult: patch({
          data: updateItem(
            (feedback) => feedback.id === feedbackId,
            patch({ getCommentStatus: 'loading' }),
          ),
        }),
      }),
    );

    return this.#feedbackListService.getComments(feedbackId).pipe(
      switchMap((apiResult: Comment[]) => {
        return context.dispatch(
          new feedbackListActions.GetCommentListSuccess(apiResult, feedbackId),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new feedbackListActions.GetCommentListFailed(error, feedbackId),
        );
      }),
    );
  }

  @Action(feedbackListActions.GetCommentListSuccess)
  getCommentListSuccess(
    context: StateContext<FeedbackListStateModel>,
    { apiResult, feedbackId }: feedbackListActions.GetCommentListSuccess,
  ): void {
    context.setState(
      patch({
        apiResult: patch({
          data: updateItem(
            (feedback) => feedback.id === feedbackId,
            patch({
              comment: apiResult,
              getCommentStatus: 'success',
            }),
          ),
        }),
      }),
    );
  }

  @Action(feedbackListActions.GetCommentListFailed)
  getCommentListFailed(
    context: StateContext<FeedbackListStateModel>,
    { feedbackId }: feedbackListActions.GetCommentListFailed,
  ): void {
    context.setState(
      patch({
        apiResult: patch({
          data: updateItem(
            (feedback) => feedback.id === feedbackId,
            patch({ getCommentStatus: 'failure' }),
          ),
        }),
      }),
    );
  }

  @Action(feedbackUpdateActions.UpdateFeedbackSuccess)
  updateFeedbackSuccess(
    context: StateContext<FeedbackListStateModel>,
    { feedbackId, apiResult }: feedbackUpdateActions.UpdateFeedbackSuccess,
  ): void {
    context.setState(
      patch({
        apiResult: patch({
          data: updateItem(
            (feedback) => feedback.id === feedbackId,
            patch({
              ...apiResult,
            }),
          ),
        }),
      }),
    );
  }
}
