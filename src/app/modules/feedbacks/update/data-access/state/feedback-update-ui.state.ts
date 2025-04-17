import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';

import * as feedbackCreateUiActions from './feedback-update-ui.actions';
import * as feedbackCreateActions from './feedback-update.actions';
import { FeedbackUpdateDialogComponent } from '../../containers';

@State<never>({
  name: 'feedbackUpdateUi',
})
@Injectable()
export class FeedbackUpdateUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<FeedbackUpdateDialogComponent>;

  @Action(feedbackCreateUiActions.OpenUpdateFeedbackDialog)
  openCreateGroupDialog(
    _context: StateContext<FeedbackUpdateDialogComponent>,
    { feedback }: feedbackCreateUiActions.OpenUpdateFeedbackDialog,
  ): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(FeedbackUpdateDialogComponent, {
        data: { feedback },
      });
    });
  }

  @Action([
    feedbackCreateUiActions.CloseUpdateFeedbackDialog,
    feedbackCreateActions.UpdateFeedbackSuccess,
  ])
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
