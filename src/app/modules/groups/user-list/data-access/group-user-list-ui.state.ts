import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';

import * as groupUserListUiActions from './group-user-list-ui.actions';
import { GroupUserListDialogComponent } from '../container';

@State<never>({
  name: 'groupUserListUi',
})
@Injectable()
export class GroupUserListUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<GroupUserListDialogComponent>;

  @Action(groupUserListUiActions.OpenUserListGroupDialog)
  openCreateGroupDialog(
    _context: StateContext<unknown>,
    { group, name }: groupUserListUiActions.OpenUserListGroupDialog,
  ): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(GroupUserListDialogComponent, {
        data: { group, name },
      });
    });
  }

  @Action(groupUserListUiActions.CloseUserListGroupDialog)
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
