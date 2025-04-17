import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';

import * as feedbackCreateUiActions from './feedback-delete-ui.actions';
import * as feedbackCreateActions from './feedback-delete.actions';
import { FeedbackDeleteDialogComponent } from '../../containers';

@State<never>({
  name: 'feedbackDeleteUi',
})
@Injectable()
export class FeedbackDeleteUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<FeedbackDeleteDialogComponent>;

  @Action(feedbackCreateUiActions.OpenDeleteFeedbackDialog)
  openCreateGroupDialog(
    _context: StateContext<unknown>,
    { feedbackId }: feedbackCreateUiActions.OpenDeleteFeedbackDialog,
  ): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(FeedbackDeleteDialogComponent, {
        data: { feedbackId },
      });
    });
  }

  @Action([
    feedbackCreateUiActions.CloseDeleteFeedbackDialog,
    feedbackCreateActions.DeleteFeedbackSuccess,
  ])
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
