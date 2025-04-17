import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';

import { groupUserListUiActions } from 'uf/modules/groups/user-list/data-access';

import * as groupAddUserUiActions from './group-add-user-ui.actions';
import * as groupAddUserActions from './group-add-user.actions';
import { GroupAddUserDialogComponent } from '../../containers';

@State<never>({
  name: 'groupAddUserUi',
})
@Injectable()
export class GroupAddUserUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<GroupAddUserDialogComponent>;

  @Action(groupAddUserUiActions.OpenAddUserDialog)
  openAddUserDialog({}, action: groupAddUserUiActions.OpenAddUserDialog): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(GroupAddUserDialogComponent, {
        width: '500px',
        data: { groupId: action.groupId },
      });
    });
  }

  @Action([
    groupUserListUiActions.CloseUserListGroupDialog,
    groupAddUserActions.AddUserToGroupSuccess,
  ])
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
