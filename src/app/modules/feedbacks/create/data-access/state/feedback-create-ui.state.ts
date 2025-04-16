import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';

import * as feedbackCreateUiActions from './feedback-create-ui.actions';
import * as feedbackCreateActions from './feedback-create.actions';
import { FeedbackCreateDialogComponent } from '../../containers';

@State<never>({
  name: 'feedbackCreateUi',
})
@Injectable()
export class FeedbackCreateUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<FeedbackCreateDialogComponent>;

  @Action(feedbackCreateUiActions.OpenCreateFeedbackDialog)
  openCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(FeedbackCreateDialogComponent);
    });
  }

  @Action([
    feedbackCreateUiActions.CloseCreateFeedbackDialog,
    feedbackCreateActions.CreateFeedbackSuccess,
  ])
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
