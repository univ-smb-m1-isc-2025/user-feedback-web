import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';

import * as groupAddUserUiActions from './group-add-user-ui.actions';
import * as groupAddUserActions from './group-add-user.actions';
import { GroupAddUserDialogComponent } from '../../containers/group-add-user-dialog.component';

@State<never>({
  name: 'groupAddUserUi',
})
@Injectable()
export class GroupAddUserUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  @Action(groupAddUserUiActions.OpenAddUserDialog)
  openAddUserDialog({}, action: groupAddUserUiActions.OpenAddUserDialog): void {
    this.#ngZone.run(() => {
      const dialogRef = this.#dialog.open(GroupAddUserDialogComponent, {
        width: '500px',
        data: { groupId: action.groupId },
      });

      // Removed code that reopens an empty dialog after closing
    });
  }

  @Action(groupAddUserUiActions.CloseAddUserDialog)
  closeAddUserDialog(): void {
    this.#ngZone.run(() => {
      this.#dialog.closeAll();
    });
  }

  @Action(groupAddUserActions.AddUserToGroupSuccess)
  closeDialogOnSuccess(): void {
    this.#ngZone.run(() => {
      this.#dialog.closeAll();
    });
  }
}