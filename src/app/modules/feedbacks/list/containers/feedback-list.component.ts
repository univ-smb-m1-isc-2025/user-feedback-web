import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { user } from 'uf/core/services/auth/queries';
import { groupDetails } from 'uf/modules/groups/details';
import { LoaderComponent } from 'uf/shared/components/loader';
import { groupId } from 'uf/shared/data-access/router';

import { commentActions } from '../../comment/state';
import { feedbackCreateUiActions } from '../../create/data-access/state';
import { feedbackDeleteActions } from '../../delete/data-access/state';
import { likeActions } from '../../like';
import { feedbackUpdateUiActions } from '../../update/data-access/state';
import { feedbackList, feedbackListLoading } from '../data-access/queries';
import { Feedback, feedbackListActions } from '../data-access/state';
import { FeedbackListItemComponent } from '../ui/feedback-list-item';

@Component({
  selector: 'uf-feedback-list',
  standalone: true,
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoaderComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon,
    MatButton,
    FeedbackListItemComponent,
  ],
})
export class FeedbackListComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly feedbackListSignal = this.#store.selectSignal(feedbackList);
  readonly loading = this.#store.selectSignal(feedbackListLoading);
  readonly groupDetails = this.#store.selectSignal(groupDetails);
  readonly userDetails = this.#store.selectSignal(user);

  readonly routeGroupList = ['/', 'groups'];

  navigateToGroupList(): void {
    this.#router.navigate(this.routeGroupList);
  }

  ngOnInit(): void {
    const group = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(new feedbackListActions.GetFeedbackList(group));
  }

  getComments(feedbackId: number): void {
    this.#store.dispatch(new feedbackListActions.GetCommentList(feedbackId));
  }

  addFeedback(): void {
    this.#store.dispatch(
      new feedbackCreateUiActions.OpenCreateFeedbackDialog(),
    );
  }

  postComment(comment: string, id: number): void {
    this.#store.dispatch(new commentActions.PostComment(id, comment));
  }

  upVoteFeedback(feedbackId: number): void {
    const group = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(new likeActions.LikeFeedback(feedbackId, group, true));
  }

  downVoteFeedback(feedbackId: number): void {
    const group = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(
      new likeActions.LikeFeedback(feedbackId, group, false),
    );
  }

  upVoteComment(commentId: number, feedbackId: number): void {
    this.#store.dispatch(
      new likeActions.LikeComment(commentId, feedbackId, true),
    );
  }

  downVoteComment(commentId: number, feedbackId: number): void {
    this.#store.dispatch(
      new likeActions.LikeComment(commentId, feedbackId, false),
    );
  }

  updateFeedback(feedback: Feedback): void {
    this.#store.dispatch(
      new feedbackUpdateUiActions.OpenUpdateFeedbackDialog(feedback),
    );
  }

  deleteFeedback(feedbackId: number): void {
    this.#store.dispatch(new feedbackDeleteActions.DeleteFeedback(feedbackId));
  }
}
