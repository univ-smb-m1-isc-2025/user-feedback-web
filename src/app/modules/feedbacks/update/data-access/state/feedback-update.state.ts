import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';

import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';

import * as feedbackUpdateActions from './feedback-update.actions';
import {
  FeedbackCreateApiResult,
  FeedbackUpdateStateModel,
} from './feedback-update.models';
import { FeedbackUpdateService } from './feedback-update.service';

export const initialState: FeedbackUpdateStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<FeedbackUpdateStateModel>({
  name: 'feedbackUpdate',
  defaults: initialState,
})
@Injectable()
export class FeedbackUpdateState {
  readonly #feedbackUpdateService = inject(FeedbackUpdateService);

  @Action(feedbackUpdateActions.UpdateFeedback)
  createFeedback(
    context: StateContext<FeedbackUpdateStateModel>,
    { feedback, body }: feedbackUpdateActions.UpdateFeedback,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#feedbackUpdateService.update(body, feedback.id).pipe(
      mergeMap((apiResult: FeedbackCreateApiResult) => {
        return context.dispatch(
          new feedbackUpdateActions.UpdateFeedbackSuccess(
            feedback.id,
            apiResult,
          ),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new feedbackUpdateActions.UpdateFeedbackFailed(error),
        );
      }),
    );
  }

  @Action(feedbackUpdateActions.UpdateFeedbackSuccess)
  createFeedbackSuccess(context: StateContext<FeedbackUpdateStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'success',
      }),
    );

    context.dispatch([new NotifySuccess('Feedback modifié avec succès')]);
  }

  @Action(feedbackUpdateActions.UpdateFeedbackFailed)
  createFeedbackFailed(context: StateContext<FeedbackUpdateStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le feedback n'a pas pu être modifié"));
  }
}
