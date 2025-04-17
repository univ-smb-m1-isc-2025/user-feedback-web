import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { User } from 'uf/core/services/auth/state';
import { AvatarComponent } from 'uf/shared/components/avatar';
import { LoaderComponent } from 'uf/shared/components/loader';

import { Feedback } from '../../data-access/state';

@Component({
  selector: 'uf-feedback-list-item',
  standalone: true,
  templateUrl: './feedback-list-item.component.html',
  styleUrl: './feedback-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoaderComponent,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    AvatarComponent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class FeedbackListItemComponent {
  readonly feedback = input.required<Feedback>();
  readonly user = input.required<User | undefined>();

  readonly getComments = output<number>();
  readonly postComment = output<string>();
  readonly upVoteFeedback = output<number>();
  readonly downVoteFeedback = output<number>();
  readonly upVoteComment = output<number>();
  readonly downVoteComment = output<number>();
  readonly update = output<Feedback>();
  readonly delete = output<number>();

  isCommentAreaOpen = false;
  comment = '';

  sendComment(): void {
    this.postComment.emit(this.comment);
    this.comment = '';
  }

  getFeedbackComments(feedbackId: number): void {
    if (!this.isCommentAreaOpen) {
      this.getComments.emit(feedbackId);
    }

    this.isCommentAreaOpen = !this.isCommentAreaOpen;
  }

  likeFeedback(feedbackId: number): void {
    this.upVoteFeedback.emit(feedbackId);
  }

  dislikeFeedback(feedbackId: number): void {
    this.downVoteFeedback.emit(feedbackId);
  }

  likeComment(commentId: number): void {
    this.upVoteComment.emit(commentId);
  }

  dislikeComment(commentId: number): void {
    this.downVoteComment.emit(commentId);
  }

  updateFeedback(feedback: Feedback): void {
    this.update.emit(feedback);
  }

  deleteFeedback(feedbackId: number): void {
    this.delete.emit(feedbackId);
  }
}
