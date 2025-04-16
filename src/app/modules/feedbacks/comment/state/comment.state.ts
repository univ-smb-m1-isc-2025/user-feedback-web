import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';
import {
  CreateCommentApiResult,
  CreateCommentStateModel,
} from 'uf/modules/feedbacks/comment/state/comment.models';
import { CommentService } from 'uf/modules/feedbacks/comment/state/comment.service';
import * as feedbackListActions from 'uf/modules/feedbacks/list/data-access/state/feedback-list.actions';
import { groupId } from 'uf/shared/data-access/router';

import * as commentActions from './comment.actions';

export const initialState: CreateCommentStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<CreateCommentStateModel>({
  name: 'comment',
  defaults: initialState,
})
@Injectable()
export class CommentState {
  readonly #commentService = inject(CommentService);
  readonly #store = inject(Store);

  @Action(commentActions.PostComment)
  postComment(
    context: StateContext<CreateCommentStateModel>,
    { feedbackId, description }: commentActions.PostComment,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#commentService.createComment(feedbackId, description).pipe(
      mergeMap((apiResult: CreateCommentApiResult) => {
        return context.dispatch(
          new commentActions.PostCommentSuccess(apiResult, feedbackId),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(new commentActions.PostCommentFailed(error));
      }),
    );
  }

  @Action(commentActions.PostCommentSuccess)
  postCommentSuccess(
    context: StateContext<CreateCommentStateModel>,
    { apiResult, feedbackId }: commentActions.PostCommentSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult,
      }),
    );

    const group = this.#store.selectSnapshot(groupId);

    context.dispatch([
      new feedbackListActions.GetFeedbackList(group),
      new feedbackListActions.GetCommentList(feedbackId),
    ]);
  }

  @Action(commentActions.PostCommentFailed)
  postCommentFailed(context: StateContext<CreateCommentStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }
}
