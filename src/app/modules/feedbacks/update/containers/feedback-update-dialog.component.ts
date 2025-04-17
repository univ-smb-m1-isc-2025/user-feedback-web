import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Feedback } from 'uf/modules/feedbacks/list/data-access/state';

import { feedbackUpdateLoading } from '../data-access/queries';
import {
  feedbackUpdateActions,
  feedbackUpdateUiActions,
} from '../data-access/state';

@Component({
  selector: 'uf-create-feedback-dialog',
  standalone: true,
  templateUrl: './feedback-update-dialog.component.html',
  styleUrl: './feedback-update-dialog.component.scss',
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
export class FeedbackUpdateDialogComponent {
  readonly #store = inject(Store);

  readonly data = inject<{ feedback: Feedback }>(MAT_DIALOG_DATA);

  readonly loading = this.#store.selectSignal(feedbackUpdateLoading);

  descriptionControl = new FormControl<string>(this.data.feedback.description, {
    nonNullable: true,
  });
  titleControl = new FormControl<string>(this.data.feedback.title, {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
  });

  onCancel(): void {
    this.#store.dispatch(
      new feedbackUpdateUiActions.CloseUpdateFeedbackDialog(),
    );
  }

  onSubmit(): void {
    this.#store.dispatch(
      new feedbackUpdateActions.UpdateFeedback(
        this.data.feedback,
        this.formGroup.getRawValue(),
      ),
    );
  }
}
