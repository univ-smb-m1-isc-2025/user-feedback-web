import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
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
  ],
})
export class FeedbackListItemComponent {
  readonly feedback = input.required<Feedback>();

  readonly getComments = output<number>();
  readonly postComment = output<string>();

  isCommentAreaOpen = false;
  isCommentFormOpen = false;
  comment = '';

  toggleCommentForm(): void {
    this.isCommentFormOpen = !this.isCommentFormOpen;
  }

  sendComment(): void {
    this.postComment.emit(this.comment);
    this.isCommentFormOpen = false;
    this.comment = '';
  }

  getFeedbackComments(feedbackId: number): void {
    if (!this.isCommentAreaOpen) {
      this.getComments.emit(feedbackId);
    }

    this.isCommentAreaOpen = !this.isCommentAreaOpen;
  }
}
