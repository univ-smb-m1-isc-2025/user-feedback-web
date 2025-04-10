import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { mergeMap, Observable } from 'rxjs';
import { LikeService } from 'uf/modules/feedbacks/like/like.service';

import * as likeActions from './like.actions';
import { feedbackListActions } from '../list/data-access/state';

@State<unknown>({
  name: 'like',
})
@Injectable()
export class LikeState {
  readonly #likeService = inject(LikeService);

  @Action(likeActions.LikeFeedback)
  likeFeedback(
    context: StateContext<unknown>,
    { feedbackId, groupId, likeOrDislike }: likeActions.LikeFeedback,
  ): Observable<void> {
    return this.#likeService.likeFeedback(feedbackId, likeOrDislike).pipe(
      mergeMap(() => {
        return context.dispatch(
          new feedbackListActions.GetFeedbackList(groupId),
        );
      }),
    );
  }

  @Action(likeActions.LikeComment)
  likeComment(
    context: StateContext<unknown>,
    { commentId, feedbackId, likeOrDislike }: likeActions.LikeComment,
  ): Observable<void> {
    return this.#likeService.likeComment(commentId, likeOrDislike).pipe(
      mergeMap(() => {
        return context.dispatch(
          new feedbackListActions.GetCommentList(feedbackId),
        );
      }),
    );
  }
}
