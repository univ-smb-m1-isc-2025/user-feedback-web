import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngxs/store';
import { groupId } from 'uf/shared/data-access/router';

import { feedbackCreateLoading } from '../data-access/queries';
import {
  feedbackCreateActions,
  feedbackCreateUiActions,
} from '../data-access/state';

@Component({
  selector: 'uf-create-feedback-dialog',
  standalone: true,
  templateUrl: './feedback-create-dialog.component.html',
  styleUrl: './feedback-create-dialog.component.scss',
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
  ],
})
export class FeedbackCreateDialogComponent {
  readonly #store = inject(Store);

  readonly loading = this.#store.selectSignal(feedbackCreateLoading);

  descriptionControl = new FormControl<string>('', { nonNullable: true });
  titleControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
  });

  onCancel(): void {
    this.#store.dispatch(
      new feedbackCreateUiActions.CloseCreateFeedbackDialog(),
    );
  }

  onSubmit(): void {
    this.#store.dispatch(
      new feedbackCreateActions.CreateFeedback(
        this.formGroup.getRawValue(),
        this.#store.selectSnapshot(groupId),
      ),
    );
  }
}
