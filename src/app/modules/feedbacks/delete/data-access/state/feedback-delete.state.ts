import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';
import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';
import { feedbackListActions } from 'uf/modules/feedbacks/list/data-access/state';
import { groupId } from 'uf/shared/data-access/router';

import * as feedbackDeleteActions from './feedback-delete.actions';
import { FeedbackDeleteStateModel } from './feedback-delete.models';
import { FeedbackDeleteService } from './feedback-delete.service';

export const initialState: FeedbackDeleteStateModel = {
  apiStatus: undefined,
};

@State<FeedbackDeleteStateModel>({
  name: 'feedbackDelete',
  defaults: initialState,
})
@Injectable()
export class FeedbackDeleteState {
  readonly #feedbackDeleteService = inject(FeedbackDeleteService);
  readonly #store = inject(Store);

  @Action(feedbackDeleteActions.DeleteFeedback)
  deleteFeedback(
    context: StateContext<FeedbackDeleteStateModel>,
    { feedbackId }: feedbackDeleteActions.DeleteFeedback,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#feedbackDeleteService.delete(feedbackId).pipe(
      mergeMap(() => {
        return context.dispatch(
          new feedbackDeleteActions.DeleteFeedbackSuccess(),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new feedbackDeleteActions.DeleteFeedbackFailed(error),
        );
      }),
    );
  }

  @Action(feedbackDeleteActions.DeleteFeedbackSuccess)
  deleteFeedbackSuccess(context: StateContext<FeedbackDeleteStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'success',
      }),
    );

    context.dispatch([
      new NotifySuccess('Feedback supprimé avec succès'),
      new feedbackListActions.GetFeedbackList(
        this.#store.selectSnapshot(groupId),
      ),
    ]);
  }

  @Action(feedbackDeleteActions.DeleteFeedbackFailed)
  deleteFeedbackFailed(context: StateContext<FeedbackDeleteStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le feedback n'a pas pu être supprimé"));
  }
}
