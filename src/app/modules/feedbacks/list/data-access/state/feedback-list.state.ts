import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, Observable, switchMap } from 'rxjs';

import * as feedbackListActions from './feedback-list.actions';
import { Feedback, FeedbackListStateModel } from './feedback-list.models';
import { FeedbackListService } from './feedback-list.service';

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
          data: apiResult,
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
}
