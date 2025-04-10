import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngxs/store';

import { changeProfilePictureLoading } from '../data-access/queries';
import {
  changeProfilePictureActions,
  changeProfilePictureUiActions,
} from '../data-access/state';

@Component({
  selector: 'uf-change-profile-picture-dialog',
  standalone: true,
  templateUrl: './change-profile-picture-dialog.component.html',
  styleUrl: './change-profile-picture-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    FormsModule,
  ],
})
export class ChangeProfilePictureDialogComponent {
  readonly #store = inject(Store);

  readonly loading = this.#store.selectSignal(changeProfilePictureLoading);

  file: File | undefined;

  onCancel(): void {
    this.#store.dispatch(
      new changeProfilePictureUiActions.CloseChangeProfilePictureDialog(),
    );
  }

  onConfirm(): void {
    if (this.file) {
      this.#store.dispatch(
        new changeProfilePictureActions.ChangeProfilePicture(this.file),
      );
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.file = inputElement.files[0] as File;
    }
  }
}
