import { inject, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, State, StateContext } from '@ngxs/store';

import * as notificationActions from './notification.actions';

@State<unknown>({
  name: 'notification',
})
@Injectable()
export class NotificationState {
  readonly #snackBar = inject(MatSnackBar);
  readonly #ngZone = inject(NgZone);

  readonly notificationDurations = 5000;

  @Action([notificationActions.NotifySuccess])
  displaySuccessNotification(
    _context: StateContext<unknown>,
    { message }: notificationActions.NotifySuccess,
  ): void {
    this.#ngZone.run(() => {
      this.#snackBar.open(`✔️ ${message}`, undefined, {
        duration: this.notificationDurations,
      });
    });
  }

  @Action([notificationActions.NotifyError])
  displayErrorNotification(
    _context: StateContext<unknown>,
    { message }: notificationActions.NotifyError,
  ): void {
    this.#ngZone.run(() => {
      this.#snackBar.open(`❌ ${message}`, undefined, {
        duration: this.notificationDurations,
      });
    });
  }
}
