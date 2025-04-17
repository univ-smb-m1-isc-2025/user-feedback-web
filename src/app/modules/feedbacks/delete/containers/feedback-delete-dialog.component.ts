import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngxs/store';

import { feedbackDeleteLoading } from '../data-access/queries';
import {
  feedbackDeleteActions,
  feedbackDeleteUiActions,
} from '../data-access/state';

@Component({
  selector: 'uf-create-feedback-dialog',
  standalone: true,
  templateUrl: './feedback-delete-dialog.component.html',
  styleUrl: './feedback-delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogActions,
    MatIcon,
  ],
})
export class FeedbackDeleteDialogComponent {
  readonly #store = inject(Store);

  readonly data = inject<{ feedbackId: number }>(MAT_DIALOG_DATA);

  readonly loading = this.#store.selectSignal(feedbackDeleteLoading);

  onCancel(): void {
    this.#store.dispatch(
      new feedbackDeleteUiActions.CloseDeleteFeedbackDialog(),
    );
  }

  onSubmit(): void {
    this.#store.dispatch(
      new feedbackDeleteActions.DeleteFeedback(this.data.feedbackId),
    );
  }
}
