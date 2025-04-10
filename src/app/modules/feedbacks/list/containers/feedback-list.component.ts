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
import { Store } from '@ngxs/store';
import { LoaderComponent } from 'uf/shared/components/loader';
import { groupId } from 'uf/shared/data-access/router';

import { commentActions } from '../../comment/state';
import { feedbackCreateUiActions } from '../../create/data-access/state';
import { likeActions } from '../../like';
import { feedbackList, feedbackListLoading } from '../data-access/queries';
import { feedbackListActions } from '../data-access/state';
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

  readonly feedbackListSignal = this.#store.selectSignal(feedbackList);
  readonly loading = this.#store.selectSignal(feedbackListLoading);

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
}
