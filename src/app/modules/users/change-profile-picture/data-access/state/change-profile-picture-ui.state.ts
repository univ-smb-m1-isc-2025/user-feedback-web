import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';

import * as changeProfilePictureUiActions from './change-profile-picture-ui.actions';
import * as changeProfilePictureActions from './change-profile-picture.actions';
import { ChangeProfilePictureDialogComponent } from '../../containers';

@State<never>({
  name: 'changeProfilePictureUi',
})
@Injectable()
export class ChangeProfilePictureUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<ChangeProfilePictureDialogComponent>;

  @Action(changeProfilePictureUiActions.OpenChangeProfilePictureDialog)
  openChangeProfilePictureDialog(): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(ChangeProfilePictureDialogComponent);
    });
  }

  @Action([
    changeProfilePictureUiActions.CloseChangeProfilePictureDialog,
    changeProfilePictureActions.ChangeProfilePictureSuccess,
  ])
  closeChangeProfilePictureDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
