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
import { groupAddUserUiActions } from 'uf/modules/groups/add-user/data-access/state';
import { groupCreateUiActions } from 'uf/modules/groups/create/data-access/state';
import {
  groupDetails,
  groupDetailsActions,
  subgroups,
} from 'uf/modules/groups/details';
import { groupUserListUiActions } from 'uf/modules/groups/user-list/data-access';
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
  readonly subgroups = this.#store.selectSignal(subgroups);
  readonly userDetails = this.#store.selectSignal(user);

  readonly routeGroupList = ['/', 'groups'];

  navigateToGroupList(): void {
    const parentGroupId = this.groupDetails()?.parentGroupId;
    if (parentGroupId) {
      this.#store.dispatch([
        new groupDetailsActions.GetGroupDetails(parentGroupId),
        new feedbackListActions.GetFeedbackList(parentGroupId),
      ]);
      this.#router.navigate([...this.routeGroupList, parentGroupId]);
    } else {
      this.#router.navigate(this.routeGroupList);
    }
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

  onClickGroup(groupId: number): void {
    this.#store.dispatch([
      new groupDetailsActions.GetGroupDetails(groupId),
      new feedbackListActions.GetFeedbackList(groupId),
    ]);
    this.#router.navigate(['/', 'groups', groupId]);
  }

  addSubgroup(): void {
    this.#store.dispatch(
      new groupCreateUiActions.OpenCreateGroupDialog(this.groupDetails()?.id),
    );
  }

  openUserList(): void {
    const details = this.groupDetails();

    if (details) {
      this.#store.dispatch(
        new groupUserListUiActions.OpenUserListGroupDialog(
          details,
          details.name,
        ),
      );
    }
  }

  addMember(): void {
    const groupIdValue = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(
      new groupAddUserUiActions.OpenAddUserDialog(groupIdValue),
    );
  }
}
