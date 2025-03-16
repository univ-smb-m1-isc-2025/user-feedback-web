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

import { groupCreateLoading } from '../data-access/queries';
import { groupCreateActions, groupCreateUiActions } from '../data-access/state';

@Component({
  selector: 'uf-create-group-dialog',
  standalone: true,
  templateUrl: './group-create-dialog.component.html',
  styleUrl: './group-create-dialog.component.scss',
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
export class GroupCreateDialogComponent {
  readonly #store = inject(Store);

  readonly loading = this.#store.selectSignal(groupCreateLoading);

  descriptionControl = new FormControl<string>('', { nonNullable: true });
  nameControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
  });

  onCancel(): void {
    this.#store.dispatch(new groupCreateUiActions.CloseCreateGroupDialog());
  }

  onSubmit(): void {
    this.#store.dispatch(
      new groupCreateActions.CreateGroup(this.formGroup.getRawValue(), 1),
    );
  }
}
