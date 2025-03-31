import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';

import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';

import * as feedbackCreateActions from './feedback-create.actions';
import {
  FeedbackCreateApiResult,
  FeedbackCreateStateModel,
} from './feedback-create.models';
import { FeedbackCreateService } from './feedback-create.service';
import { feedbackListActions } from '../../../list/data-access/state';

export const initialState: FeedbackCreateStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<FeedbackCreateStateModel>({
  name: 'feedbackCreate',
  defaults: initialState,
})
@Injectable()
export class FeedbackCreateState {
  readonly #groupCreateService = inject(FeedbackCreateService);

  @Action(feedbackCreateActions.CreateFeedback)
  createFeedback(
    context: StateContext<FeedbackCreateStateModel>,
    { body, groupId }: feedbackCreateActions.CreateFeedback,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupCreateService.create(body, groupId).pipe(
      mergeMap((apiResult: FeedbackCreateApiResult) => {
        return context.dispatch(
          new feedbackCreateActions.CreateFeedbackSuccess(apiResult, groupId),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new feedbackCreateActions.CreateFeedbackFailed(error),
        );
      }),
    );
  }

  @Action(feedbackCreateActions.CreateFeedbackSuccess)
  createFeedbackSuccess(
    context: StateContext<FeedbackCreateStateModel>,
    { apiResult, groupId }: feedbackCreateActions.CreateFeedbackSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult,
      }),
    );

    context.dispatch([
      new NotifySuccess('Feedback ajouté avec succès'),
      new feedbackListActions.GetFeedbackList(groupId),
    ]);
  }

  @Action(feedbackCreateActions.CreateFeedbackFailed)
  createFeedbackFailed(context: StateContext<FeedbackCreateStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le feedback n'a pas pu être ajouté"));
  }
}
