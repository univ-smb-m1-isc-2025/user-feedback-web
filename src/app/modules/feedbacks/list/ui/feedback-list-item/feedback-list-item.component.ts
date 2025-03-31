import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
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
    MatCardTitle,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
  ],
})
export class FeedbackListItemComponent {
  readonly feedback = input.required<Feedback>();

  readonly getComments = output<number>();
  readonly postComment = output<string>();

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
    this.getComments.emit(feedbackId);
  }
}
